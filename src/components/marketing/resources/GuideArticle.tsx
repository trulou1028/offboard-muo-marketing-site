import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { ReactNode } from "react";

import { MarketingShell } from "@/components/marketing/homepage/MarketingSite";
import type { ResourceCategory } from "@/content/resources/registry";

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function GuideArticle({
  category,
  title,
  readingTime,
  date,
  author,
  children,
}: {
  category: ResourceCategory;
  title: string;
  readingTime: string;
  date?: string;
  author?: { name: string; role: string };
  children: ReactNode;
}) {
  const formattedDate = formatDate(date);

  return (
    <MarketingShell current="resources">
      <main id="main-content">
        <article className="mh-article mh-section">
          <div className="mh-article-header">
            <Link href="/resources" className="mh-article-back">
              <ArrowLeft aria-hidden="true" /> All guides
            </Link>
            <span className="mh-kicker is-lime">{category}</span>
            <h1>{title}</h1>
            <div className="mh-article-meta">
              <span className="mh-article-meta-reading">
                <Clock aria-hidden="true" /> {readingTime}
              </span>
              {author && <span>{author.name} · {author.role}</span>}
              {formattedDate && <span>{formattedDate}</span>}
            </div>
          </div>
          <div className="mh-article-body" data-guide-article>
            {children}
          </div>
          <div className="mh-article-footer">
            <Link href="/resources" className="mh-section-link">
              More guides <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      </main>
    </MarketingShell>
  );
}

// --------------------------------------------------------------- Prose primitives
//
// Signatures mirror the legacy repo's src/components/guide-article.tsx so
// ported article bodies only need an import-path change.

export function GuideH2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mh-article-h2">
      {children}
    </h2>
  );
}

export function GuideH3({ children }: { children: ReactNode }) {
  return <h3 className="mh-article-h3">{children}</h3>;
}

export function GuideP({ children }: { children: ReactNode }) {
  return <p className="mh-article-p">{children}</p>;
}

export function GuideList({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  if (ordered) {
    return (
      <ol className="mh-article-list is-ordered">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="mh-article-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function GuideCallout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mh-article-callout">
      <div className="mh-article-callout-title">{title}</div>
      <p>{children}</p>
    </div>
  );
}

export function GuideBlockquote({ children }: { children: ReactNode }) {
  return <blockquote className="mh-article-blockquote">{children}</blockquote>;
}

export function GuideDivider() {
  return <hr className="mh-article-divider" />;
}

export function GuideLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className="mh-article-link" {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}
