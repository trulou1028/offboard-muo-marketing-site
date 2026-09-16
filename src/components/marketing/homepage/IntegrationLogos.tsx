/* Real partner marks, self-hosted under public/marketing/logos. Sources are
   recorded in COPY.md. Plain <img>: an SVG through next/image would need the
   optimizer told to allow SVG for no gain. */
function ClaudeMark() {
  return <img src="/marketing/logos/claude.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function ChatGptMark() {
  return <img src="/marketing/logos/chatgpt.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function GoogleCalendarMark() {
  return <img src="/marketing/logos/google-calendar.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function GoogleDriveMark() {
  return <img src="/marketing/logos/google-drive.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function GmailMark() {
  return <img src="/marketing/logos/gmail.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function CalendlyMark() {
  return <img src="/marketing/logos/calendly.svg" alt="" width={34} height={34} loading="lazy" decoding="async" />;
}

function NotionMark() {
  return <img src="/marketing/logos/notion.png" alt="" width={34} height={34} loading="lazy" decoding="async" />;
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
