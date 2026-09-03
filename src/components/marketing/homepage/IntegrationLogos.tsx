/* Integration brand marks (plan 033).

   ChatGPT and Claude are the partners' real files (see below). The five
   Google, Calendly and Notion marks are still hand-authored SVG, and the
   owner's 2026-09-02 rule says they should become real files too - that is
   tracked, not done here. The original reasoning for drawing them: the site self-hosts every asset (no font
   or icon CDNs, DESIGN.md), and an icon dependency would ship several hundred
   marks to render seven. Each mark is a simplified, recognizable rendering of
   the partner's logo in the partner's own colors, sized for a 40px tile and
   read together with the product name printed under it. They are the one
   place in the site allowed to use colors outside the Civic Modern palette,
   because they are not ours to restyle. Swap any of these for an official
   asset by replacing the component body; nothing else needs to change. */

const BOX = { viewBox: "0 0 48 48", "aria-hidden": true, focusable: "false" } as const;

/* ChatGPT and Claude are the real marks, not drawings (owner rule
   2026-09-02: "any time a real logo is needed, find the real logo").
   Sources are recorded in COPY.md § 1; the files live in
   public/marketing/logos. Plain <img>: an SVG through next/image would
   need the optimizer told to allow SVG for no gain. */
function ClaudeMark() {
  return <img src="/marketing/logos/claude.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function ChatGptMark() {
  return <img src="/marketing/logos/chatgpt.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

/* Google Calendar: the dated page. */
function GoogleCalendarMark() {
  return (
    <svg {...BOX}>
      <rect x="5.5" y="6.5" width="37" height="35" rx="5" fill="#fff" stroke="#4285f4" strokeWidth="3.4" />
      <text
        x="24"
        y="32.5"
        textAnchor="middle"
        fill="#4285f4"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="18"
        fontWeight="700"
      >
        31
      </text>
    </svg>
  );
}

/* Google Drive: the triangle, cut into three faces from its centroid. */
function GoogleDriveMark() {
  return (
    <svg {...BOX}>
      <polygon points="24,7 24,28.7 5,39" fill="#fbbc04" />
      <polygon points="24,7 24,28.7 43,39" fill="#34a853" />
      <polygon points="5,39 24,28.7 43,39" fill="#4285f4" />
    </svg>
  );
}

/* Gmail: the envelope M. */
function GmailMark() {
  return (
    <svg {...BOX}>
      <rect x="4" y="11" width="40" height="26" rx="4" fill="#fff" stroke="#dadce0" strokeWidth="1.4" />
      <g fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 33 V17" stroke="#4285f4" />
        <path d="M9 17 L24 28" stroke="#ea4335" />
        <path d="M24 28 L39 17" stroke="#fbbc04" />
        <path d="M39 17 V33" stroke="#34a853" />
      </g>
    </svg>
  );
}

/* Calendly: the notched ring. */
function CalendlyMark() {
  return (
    <svg {...BOX}>
      <circle
        cx="24"
        cy="24"
        r="15"
        fill="none"
        stroke="#006bff"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="34 13 34 13"
        transform="rotate(-38 24 24)"
      />
    </svg>
  );
}

/* Notion: the N. */
function NotionMark() {
  return (
    <svg {...BOX}>
      <rect x="5.5" y="5.5" width="37" height="37" rx="6" fill="#fff" stroke="#e3e2de" strokeWidth="2" />
      <path
        d="M16 34 V15 L32 33 V15"
        fill="none"
        stroke="#0d0d0d"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MARKS = {
  chatgpt: ChatGptMark,
  claude: ClaudeMark,
  "google-calendar": GoogleCalendarMark,
  "google-drive": GoogleDriveMark,
  gmail: GmailMark,
  calendly: CalendlyMark,
  notion: NotionMark,
} as const;

export type IntegrationLogoId = keyof typeof MARKS;

export function IntegrationLogo({ id }: { id: IntegrationLogoId }) {
  const Mark = MARKS[id];
  return (
    <span className="mh-int-logo">
      <Mark />
    </span>
  );
}
