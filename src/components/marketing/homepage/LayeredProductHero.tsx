import {
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  CircleCheck,
  FileCheck2,
  FileText,
  HeartPulse,
  SearchCheck,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type HeroVariant = "application-packet" | "first-week";

type Row = readonly [LucideIcon, string];

const CONTENT: Record<HeroVariant, {
  title: string;
  rows: readonly Row[];
  leftCard: readonly [LucideIcon, string];
  rightCard: readonly [LucideIcon, string];
  topChip: readonly [LucideIcon, string];
  bottomChip: readonly [LucideIcon, string];
}> = {
  "application-packet": {
    title: "Your Application Packet",
    rows: [
      [Building2, "Company intel"],
      [UserRound, "Role match"],
      [FileText, "Tailored resume"],
    ],
    leftCard: [SearchCheck, "Ghost check"],
    rightCard: [FileCheck2, "Cover letter"],
    topChip: [BarChart3, "Strong fit"],
    bottomChip: [CircleCheck, "Ready for review"],
  },
  "first-week": {
    title: "Your first-week plan",
    rows: [
      [FileText, "Review separation agreement"],
      [ShieldCheck, "File unemployment claim"],
      [HeartPulse, "Check health coverage"],
      [CalendarDays, "Save key deadlines"],
    ],
    leftCard: [FileCheck2, "Agreement review"],
    rightCard: [CalendarDays, "Key deadlines"],
    topChip: [CalendarDays, "2 deadlines saved"],
    bottomChip: [CircleCheck, "Paperwork reviewed"],
  },
};

function BackCard({ item, side }: { item: readonly [LucideIcon, string]; side: "left" | "right" }) {
  const [Icon, label] = item;
  return (
    <div className={`mh-layered-product-back is-${side}`}>
      <span><Icon aria-hidden="true" /></span>
      <strong>{label}</strong>
      <i /><i /><i />
    </div>
  );
}

function StatusChip({ item, position }: { item: readonly [LucideIcon, string]; position: "top" | "bottom" }) {
  const [Icon, label] = item;
  return (
    <div className={`mh-layered-product-chip is-${position}`}>
      <span><Icon aria-hidden="true" /></span>
      <strong>{label}</strong>
    </div>
  );
}

export function LayeredProductHero({
  variant,
  label,
}: {
  variant: HeroVariant;
  label: string;
}) {
  const content = CONTENT[variant];

  return (
    <figure className={`mh-hero-image-composition is-${variant}`} aria-label={label}>
      <div className={`mh-layered-product is-${variant}`} aria-hidden="true">
        <BackCard item={content.leftCard} side="left" />
        <BackCard item={content.rightCard} side="right" />
        <div className="mh-layered-product-main">
          <strong>{content.title}</strong>
          <ul>
            {content.rows.map(([Icon, row]) => (
              <li key={row}>
                <Check aria-hidden="true" />
                <span><Icon aria-hidden="true" />{row}</span>
              </li>
            ))}
          </ul>
        </div>
        <StatusChip item={content.topChip} position="top" />
        <StatusChip item={content.bottomChip} position="bottom" />
      </div>
    </figure>
  );
}
