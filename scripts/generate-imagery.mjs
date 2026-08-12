#!/usr/bin/env node
/**
 * Generates the homepage's raw-documentary photography, dark product renders,
 * and torn-paper collage assets with OpenAI image generation, then converts
 * everything to webp in public/marketing/homepage/{raw,renders,collage}/.
 *
 * Usage:
 *   node scripts/generate-imagery.mjs --dry-run     # plan + model discovery only
 *   node scripts/generate-imagery.mjs --crops       # cut mockup reference crops (sips)
 *   node scripts/generate-imagery.mjs               # generate everything missing
 *   node scripts/generate-imagery.mjs --only=raw/system-desk,collage/torn-paper-1
 *   node scripts/generate-imagery.mjs --force       # regenerate even if output exists
 *   node scripts/generate-imagery.mjs --model gpt-image-2  # explicit model override
 *
 * Key resolution: $OPENAI_API_KEY, else parsed from the app repo's .env.local
 * (--env-file overrides that path). The key is never printed.
 *
 * Cost: a full ~15-generation run at high quality is roughly $3-5. Photo style
 * iteration typically takes 2-3 rounds on a few ids via --only; budget $10-15.
 */

import { execFile } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileP = promisify(execFile);

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CACHE = path.join(ROOT, ".imagery-cache");
const PUBLIC = path.join(ROOT, "public/marketing/homepage");
const HERO_SOURCE = path.join(homedir(), "Downloads/offboard-hero-real-life-image-1a.png");
const MOCKUP = path.join(homedir(), "Downloads/Offboard marketing homepage · editable.jpg");
const DEFAULT_ENV_FILE = path.join(homedir(), "code/lumo-plan-builder/.env.local");

// ---------------------------------------------------------------------------
// CLI

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => {
  const eq = args.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.split("=").slice(1).join("=");
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : undefined;
};

const DRY_RUN = flag("dry-run");
const CROPS_ONLY = flag("crops");
const FORCE = flag("force");
const ONLY = opt("only")?.split(",").map((s) => s.trim());
const MODEL_OVERRIDE = opt("model");
const ENV_FILE = opt("env-file") ?? DEFAULT_ENV_FILE;

// ---------------------------------------------------------------------------
// Style prefixes

const STYLE_PHOTO =
  "Raw documentary photograph. Muted, overcast natural window light. Unposed, " +
  "candid, photojournalistic. A real, cluttered, lived-in American home — worn " +
  "furniture, books, plants, family photos, imperfect walls. Melancholic but " +
  "dignified mood: quiet resolve, not despair. Natural skin texture, no retouching, " +
  "no studio lighting, no stock-photo smiles. Match the color grade, softness and " +
  "grain of the reference photograph exactly. ";

const STYLE_RENDER =
  "Elegant 3D product illustration on a matte dark forest green (#00352a) " +
  "background, soft diffuse studio light. Warm cream (#fbfaf5) card faces with " +
  "subtle depth and shadows, lime (#e2fb6c) accent details, dark green ink. " +
  "Abstract suggestion of a calm, organized product — clean geometric cards and " +
  "panels. Match the composition and material language of the reference image. " +
  "NO legible UI text: any text areas rendered as abstract soft gray bars only. ";

// ---------------------------------------------------------------------------
// Mockup reference crops: sips --cropOffset <offsetY> <offsetX> BEFORE -c <H> <W>

const CROPS = [
  { id: "crop-path-card", y: 1050, x: 760, h: 560, w: 660 },
  { id: "crop-benefits-stack", y: 1890, x: 730, h: 410, w: 690 },
  { id: "crop-toolkit-scene", y: 2950, x: 675, h: 525, w: 745 },
  { id: "crop-privacy-panel", y: 5710, x: 70, h: 490, w: 1300 },
  { id: "crop-hero-collage", y: 80, x: 685, h: 700, w: 755 },
];

// ---------------------------------------------------------------------------
// Manifest

const cropRef = (id) => path.join(CACHE, `${id}.png`);

const MANIFEST = [
  // Hero: straight conversion of the approved photo, no API call.
  { id: "raw/hero-real-life", kind: "convert", source: HERO_SOURCE, width: 1448, webpQuality: 82 },

  // Section photography (style-locked to the hero photo).
  {
    id: "raw/system-desk", kind: "photo", size: "1536x1024", width: 1400, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A Black man in his 40s at a worn wooden desk in a small home office, writing " +
      "notes in a paper notebook beside an open laptop, surrounded by houseplants and " +
      "shelves of books, seen in profile, absorbed and steady.",
  },
  {
    id: "raw/maya-walking", kind: "photo", size: "1024x1536", width: 1100, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "An East Asian American woman in her 30s in a hallway of her home, carrying a " +
      "closed laptop and a folder of documents, mid-stride toward a bright doorway, " +
      "expression focused and calm.",
  },
  {
    id: "raw/final-cta-portrait", kind: "photo", size: "1024x1536", width: 1100, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A South Asian woman in her 30s stepping out of her front door into soft morning " +
      "light, wearing a work bag, one hand on the door frame, looking ahead down the " +
      "street with quiet determination.",
  },
  {
    id: "raw/strip-kitchen-table", kind: "photo", size: "1536x1024", width: 1200, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A white man in his 50s alone at a kitchen table early in the morning, coffee mug " +
      "and stacked mail and a laptop in front of him, head resting on one hand, gray " +
      "light from the window.",
  },
  {
    id: "raw/strip-school-dropoff", kind: "photo", size: "1536x1024", width: 1200, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A Latina mother in her 30s crouching to zip her young daughter's jacket outside " +
      "an elementary school on an overcast morning, backpacks and other families blurred " +
      "in the background.",
  },
  {
    id: "raw/strip-interview-prep", kind: "photo", size: "1536x1024", width: 1200, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A Black woman in her 30s practicing interview answers out loud in a bedroom " +
      "mirror, wearing a blazer over jeans, notes taped to the mirror's edge, evening " +
      "lamp light.",
  },
  {
    id: "raw/strip-call-outside", kind: "photo", size: "1536x1024", width: 1200, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A middle-aged white man on his small apartment balcony taking a phone call, one " +
      "hand in his pocket, bare trees and gray sky behind him, listening intently.",
  },
  {
    id: "raw/strip-walking-in", kind: "photo", size: "1536x1024", width: 1200, webpQuality: 82,
    prompt: STYLE_PHOTO +
      "A woman in her 40s seen from behind, walking through the glass door of a modest " +
      "office building on her first day at a new job, badge in hand, soft daylight " +
      "reflecting off the glass.",
  },

  // Dark product renders (style-locked to mockup crops).
  {
    id: "renders/path-stage", kind: "render", ref: cropRef("crop-path-card"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "A winding cream path across the dark surface connecting seven small numbered " +
      "stage markers, the first marker highlighted with a lime ring, a small cream " +
      "detail card floating beside it.",
  },
  {
    id: "renders/benefits-stack", kind: "render", ref: cropRef("crop-benefits-stack"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "A fanned stack of three cream benefit cards floating at a slight angle, the top " +
      "card carrying a lime corner tab and a small official-looking seal motif, soft " +
      "shadows beneath each card.",
  },
  {
    id: "renders/toolkit-job-packets", kind: "render", ref: cropRef("crop-toolkit-scene"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "Three connected cream layers stacked with depth like a dossier coming together — " +
      "a folder, a document sheet, and a small profile card — bound by a thin lime thread.",
  },
  {
    id: "renders/toolkit-resumes", kind: "render", ref: cropRef("crop-toolkit-scene"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "One master cream document splitting into two tailored copies to its right, subtle " +
      "lime highlight strips on the tailored copy, gentle paper depth and shadow.",
  },
  {
    id: "renders/toolkit-applications", kind: "render", ref: cropRef("crop-toolkit-scene"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "A cream folder with three small tracked cards emerging in a row, one card lifted " +
      "and tilted forward with a lime edge, suggesting steady pipeline progress.",
  },
  {
    id: "renders/toolkit-interviews", kind: "render", ref: cropRef("crop-toolkit-scene"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "Two cream speech-bubble panels facing each other over a small stage-like platform, " +
      "a lime waveform ribbon flowing between them, calm and rehearsed.",
  },
  {
    id: "renders/privacy-three-panel", kind: "render", ref: cropRef("crop-privacy-panel"), size: "1536x1024", width: 1536, webpQuality: 82,
    prompt: STYLE_RENDER +
      "Three panels side by side: a cream list panel on the left, a dark green vault " +
      "panel in the center with a small lime padlock, and a cream panel of anonymous " +
      "dots on the right, connected by faint lines.",
  },

  // Torn-paper collage accents (transparent background, styled after the
  // mockup hero's labeled scraps — reference crop keeps texture/palette honest).
  {
    id: "collage/scrap-calendar", kind: "collage", model: "gpt-image-1.5", ref: cropRef("crop-hero-collage"),
    size: "1024x1024", width: 800, webpQuality: 90,
    prompt:
      "One single torn scrap of aged cream paper with a hand-drawn monthly calendar " +
      "grid in dark green ink, one date circled in lime (#e2fb6c) highlighter with a " +
      "small lime arrow. Match the paper texture and torn-edge style of the scraps in " +
      "the reference image. Isolated object, fully transparent background, no shadow.",
  },
  {
    id: "collage/scrap-health", kind: "collage", model: "gpt-image-1.5", ref: cropRef("crop-hero-collage"),
    size: "1024x1024", width: 800, webpQuality: 90,
    prompt:
      "One single torn scrap of dark forest green textured paper with a lime (#e2fb6c) " +
      "hand-drawn heart containing a small cross, and the handwritten words \"Health " +
      "Coverage\" in neat cursive dark ink on a cream torn label, underlined in lime. " +
      "Match the reference scraps' texture and torn edges. Isolated object, fully " +
      "transparent background, no shadow.",
  },
  {
    id: "collage/scrap-runway", kind: "collage", model: "gpt-image-1.5", ref: cropRef("crop-hero-collage"),
    size: "1024x1024", width: 800, webpQuality: 90,
    prompt:
      "One single torn scrap of cream paper with a hand-drawn open umbrella and three " +
      "small ascending bars in dark green ink with lime (#e2fb6c) highlights, and the " +
      "handwritten words \"Money Runway\" in neat cursive dark ink, underlined in lime. " +
      "Match the reference scraps' texture and torn edges. Isolated object, fully " +
      "transparent background, no shadow.",
  },
  {
    id: "collage/scrap-path", kind: "collage", model: "gpt-image-1.5", ref: cropRef("crop-hero-collage"),
    size: "1024x1024", width: 800, webpQuality: 90,
    prompt:
      "One single torn scrap of cream paper with the handwritten words \"Path Forward\" " +
      "in neat cursive dark green ink underlined in lime (#e2fb6c), beside a small " +
      "hand-drawn winding path with an arrow. Match the reference scraps' texture and " +
      "torn edges. Isolated object, fully transparent background, no shadow.",
  },
];

// ---------------------------------------------------------------------------
// Key + API helpers

function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  if (existsSync(ENV_FILE)) {
    const line = readFileSync(ENV_FILE, "utf8")
      .split("\n")
      .find((l) => l.trim().startsWith("OPENAI_API_KEY="));
    if (line) {
      const value = line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "");
      if (value) return value;
    }
  }
  fail(`No OPENAI_API_KEY in the environment and none found in ${ENV_FILE} (override with --env-file).`);
}

function fail(message) {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
}

let API_KEY;

async function api(pathname, init = {}) {
  const res = await fetch(`https://api.openai.com${pathname}`, {
    ...init,
    headers: { Authorization: `Bearer ${API_KEY}`, ...(init.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${init.method ?? "GET"} ${pathname} -> ${res.status}: ${body.slice(0, 500)}`);
  }
  return res.json();
}

async function discoverModel() {
  if (MODEL_OVERRIDE) return MODEL_OVERRIDE;
  const { data } = await api("/v1/models");
  const imageModels = data.filter((m) => /^gpt-image/.test(m.id));
  const pick = imageModels
    .filter((m) => /gpt-image-2/.test(m.id))
    .sort((a, b) => (b.created ?? 0) - (a.created ?? 0))[0];
  if (!pick) {
    fail(
      `No gpt-image-2 model available on this key. Image models found: ` +
        `${imageModels.map((m) => m.id).join(", ") || "none"}. ` +
        `Pass --model <id> to use one of those explicitly.`,
    );
  }
  return pick.id;
}

// ---------------------------------------------------------------------------
// Generation

async function withRetry(label, fn, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      return await fn();
    } catch (error) {
      const retriable = /-> 5\d\d|fetch failed|timeout/i.test(String(error));
      if (i >= attempts || !retriable) throw error;
      console.warn(`  retry ${i}/${attempts - 1} for ${label}: ${String(error).slice(0, 120)}`);
      await new Promise((r) => setTimeout(r, 4000 * i));
    }
  }
}

async function generateEntry(entry, model) {
  // Entries may pin a model (e.g. transparency support gpt-image-2 lacks).
  model = entry.model ?? model;
  const pngPath = path.join(CACHE, `${entry.id.replace(/\//g, "__")}.png`);

  if (entry.kind === "convert") {
    if (!existsSync(entry.source)) fail(`Missing source image: ${entry.source}`);
    await convertToWebp(entry, entry.source);
    return;
  }

  let b64;
  if (entry.kind === "collage" && !entry.ref) {
    const body = {
      model,
      prompt: entry.prompt,
      size: entry.size,
      quality: "high",
      background: "transparent",
      output_format: "png",
      n: 1,
    };
    const json = await withRetry(entry.id, () =>
      api("/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    );
    b64 = json.data[0].b64_json;
  } else {
    // photo / render / referenced collage -> edits endpoint with a style reference
    const refPath = entry.kind === "photo" ? HERO_SOURCE : entry.ref;
    if (!existsSync(refPath)) {
      fail(`Missing reference image for ${entry.id}: ${refPath}` +
        (entry.kind === "render" ? " (run with --crops first)" : ""));
    }
    const form = new FormData();
    form.append("model", model);
    form.append("prompt", entry.prompt);
    form.append("size", entry.size);
    form.append("quality", "high");
    form.append("n", "1");
    if (entry.kind === "collage") {
      form.append("background", "transparent");
      form.append("output_format", "png");
    }
    form.append(
      "image[]",
      new Blob([readFileSync(refPath)], { type: refPath.endsWith(".jpg") ? "image/jpeg" : "image/png" }),
      path.basename(refPath),
    );
    const json = await withRetry(entry.id, () =>
      api("/v1/images/edits", { method: "POST", body: form }),
    );
    b64 = json.data[0].b64_json;
  }

  writeFileSync(pngPath, Buffer.from(b64, "base64"));
  await convertToWebp(entry, pngPath);
}

async function convertToWebp(entry, pngPath) {
  const outPath = path.join(PUBLIC, `${entry.id}.webp`);
  mkdirSync(path.dirname(outPath), { recursive: true });
  const alpha = entry.kind === "collage" ? ["-exact", "-alpha_q", "100"] : [];
  await execFileP("cwebp", [
    "-q", String(entry.webpQuality),
    "-resize", String(entry.width), "0",
    ...alpha,
    pngPath,
    "-o", outPath,
  ]).catch((error) => {
    if (/ENOENT/.test(String(error))) {
      fail("cwebp not found. `brew install webp`, or add sharp as a devDependency and swap convertToWebp().");
    }
    throw error;
  });
  const kb = Math.round(readFileSync(outPath).length / 1024);
  console.log(`  wrote ${path.relative(ROOT, outPath)} (${kb} KB)`);
}

// ---------------------------------------------------------------------------
// Crops

async function makeCrops() {
  if (!existsSync(MOCKUP)) fail(`Mockup not found: ${MOCKUP}`);
  mkdirSync(CACHE, { recursive: true });
  for (const c of CROPS) {
    const out = path.join(CACHE, `${c.id}.png`);
    // sips quirk: --cropOffset must come BEFORE -c
    await execFileP("sips", [
      "-s", "format", "png",
      "--cropOffset", String(c.y), String(c.x),
      "-c", String(c.h), String(c.w),
      MOCKUP,
      "--out", out,
    ]);
    console.log(`  cropped ${path.relative(ROOT, out)} (${c.w}x${c.h} @ ${c.x},${c.y})`);
  }
  console.log("\nInspect the crops in .imagery-cache/ before generating renders.");
}

// ---------------------------------------------------------------------------
// Main

async function main() {
  mkdirSync(CACHE, { recursive: true });

  if (CROPS_ONLY) {
    await makeCrops();
    return;
  }

  API_KEY = loadKey();
  const model = await discoverModel();
  console.log(`Using image model: ${model}`);

  let entries = MANIFEST;
  if (ONLY) {
    entries = MANIFEST.filter((e) => ONLY.includes(e.id));
    const missing = ONLY.filter((id) => !MANIFEST.some((e) => e.id === id));
    if (missing.length) fail(`Unknown --only ids: ${missing.join(", ")}`);
  }
  if (!FORCE) {
    entries = entries.filter((e) => !existsSync(path.join(PUBLIC, `${e.id}.webp`)));
  }

  console.log(`${entries.length} of ${MANIFEST.length} entries to produce${DRY_RUN ? " (dry run)" : ""}:`);
  for (const e of entries) console.log(`  [${e.kind}] ${e.id}`);
  if (DRY_RUN || entries.length === 0) return;

  for (const entry of entries) {
    console.log(`\n${entry.id}`);
    await generateEntry(entry, model);
  }
  console.log("\nDone. Review the results as a contact sheet before wiring into the page.");
}

main().catch((error) => fail(String(error?.stack ?? error)));
