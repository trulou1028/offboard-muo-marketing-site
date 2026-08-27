import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Plan 019. The content layer falls back to committed files in two very
// different situations, and until this test existed both were silent:
//
//   not-configured  no credentials. CI and fresh clones build this way on
//                   purpose, so it must stay quiet.
//   fetch-failed    credentials are set and the database refused us. That is
//                   a defect, and it is how plan 016's un-pushed migration
//                   went unnoticed in production for a day.
//
// supabaseSelect is mocked so these cases can be produced without a database.
// posts.ts is a server module; the `server-only` package throws on import
// outside a server component. Vitest runs in jsdom, so it is stubbed. This
// does not weaken the real guard -- service-role-guard.test.ts enforces the
// key-separation contract by scanning source text, independently of imports.
vi.mock("server-only", () => ({}));

vi.mock("./supabase-read", () => ({
  supabaseSelect: vi.fn(),
}));

import { supabaseSelect } from "./supabase-read";
import { __resetContentSourceLatches, getCategories, getPublishedPosts } from "./posts";

const mockedSelect = vi.mocked(supabaseSelect);

const originalPhase = process.env.NEXT_PHASE;

beforeEach(() => {
  __resetContentSourceLatches();
  mockedSelect.mockReset();
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  if (originalPhase === undefined) delete process.env.NEXT_PHASE;
  else process.env.NEXT_PHASE = originalPhase;
});

describe("no credentials configured", () => {
  beforeEach(() => {
    mockedSelect.mockResolvedValue({ ok: false, reason: "not-configured" });
  });

  it("serves committed content without complaining", async () => {
    const posts = await getPublishedPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("stays quiet even during a production build", async () => {
    process.env.NEXT_PHASE = "phase-production-build";
    await expect(getCategories()).resolves.toBeDefined();
    expect(console.error).not.toHaveBeenCalled();
  });
});

describe("configured but the database refuses", () => {
  beforeEach(() => {
    mockedSelect.mockResolvedValue({ ok: false, reason: "fetch-failed" });
  });

  it("says so loudly at request time, and still serves content", async () => {
    delete process.env.NEXT_PHASE;
    const posts = await getPublishedPosts();

    // A reader gets a page, not a 500.
    expect(posts.length).toBeGreaterThan(0);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("CONFIGURED BUT UNREACHABLE"),
    );
  });

  it("fails a production build instead of baking in fallback content", async () => {
    process.env.NEXT_PHASE = "phase-production-build";
    await expect(getPublishedPosts()).rejects.toThrow(/Refusing to prerender/);
  });

  it("reports once per process, not once per prerendered route", async () => {
    delete process.env.NEXT_PHASE;
    await getPublishedPosts();
    await getCategories();
    await getPublishedPosts();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});

describe("the database answers", () => {
  it("uses database rows, not the committed files", async () => {
    mockedSelect.mockImplementation(async (table: string) => {
      if (table === "categories") {
        return {
          ok: true as const,
          data: [{ slug: "money", name: "Money", description: "d", sort_order: 1 }],
        };
      }
      return {
        ok: true as const,
        data: [
          {
            slug: "db-only-slug",
            title: "A title that exists only in the database",
            category_slug: "money",
            excerpt: "e",
            reading_time: "3 min",
            date: null,
            author_name: null,
            author_role: null,
            guest_author: null,
            related: null,
            status: "published",
          },
        ],
      };
    });

    const posts = await getPublishedPosts();

    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("A title that exists only in the database");
    expect(console.error).not.toHaveBeenCalled();
  });
});
