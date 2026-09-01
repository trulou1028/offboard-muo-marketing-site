/* Integration brand marks (plan 033).

   Hand-authored SVG, deliberately: the site self-hosts every asset (no font
   or icon CDNs, DESIGN.md), and an icon dependency would ship several hundred
   marks to render seven. Each mark is a simplified, recognizable rendering of
   the partner's logo in the partner's own colors, sized for a 40px tile and
   read together with the product name printed under it. They are the one
   place in the site allowed to use colors outside the Civic Modern palette,
   because they are not ours to restyle. Swap any of these for an official
   asset by replacing the component body; nothing else needs to change. */

const BOX = { viewBox: "0 0 48 48", "aria-hidden": true, focusable: "false" } as const;

/* Anthropic's burst. Twelve tapered rays, alternating length. */
function ClaudeMark() {
  return (
    <svg {...BOX}>
      {Array.from({ length: 12 }, (_, i) => (
        <rect
          key={i}
          x="22.55"
          y={i % 2 === 0 ? 4.5 : 8.5}
          width="2.9"
          height={i % 2 === 0 ? 16 : 12}
          rx="1.45"
          fill="#d97757"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
    </svg>
  );
}

/* OpenAI's knot: a rounded hexagonal ring with three ends tucked toward the
   middle. Drawn as a ring plus three spokes rather than three interlocking
   hooks, which at 34px collapses into a solid blob. */
function ChatGptMark() {
  const ring =
    "M36.5 18.8 Q39.5 24 36.5 29.2 L34.75 32.22 Q31.75 37.42 25.75 37.42 " +
    "L22.25 37.42 Q16.25 37.42 13.25 32.22 L11.5 29.2 Q8.5 24 11.5 18.8 " +
    "L13.25 15.78 Q16.25 10.58 22.25 10.58 L25.75 10.58 Q31.75 10.58 34.75 15.78 Z";
  return (
    <svg {...BOX}>
      <path d={ring} fill="none" stroke="#0d0d0d" strokeWidth="3.4" strokeLinejoin="round" />
      {[0, 120, 240].map((deg) => (
        <path
          key={deg}
          d="M30.75 35.69 L27.6 30.24"
          fill="none"
          stroke="#0d0d0d"
          strokeWidth="3.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
    </svg>
  );
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
