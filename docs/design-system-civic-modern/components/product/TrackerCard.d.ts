/**
 * A role in the member's tracker. White on Paper, 1px Line border, 16px radius.
 * @startingPoint section="Product" subtitle="Application tracker card with status and meta row" viewport="700x200"
 */
export interface TrackerCardProps {
  role: string;
  company: string;
  location?: string;
  /** Status pill text: Saved, Applied, Interviewing, Offer. Always a Sage dot. */
  status?: string;
  /** Uppercase Secondary label over Ink value, e.g. [{label:'Fit', value:'82%'}]. */
  meta?: { label: string; value: string }[];
  /** Tighter padding, for cards indented inside an AI reply. */
  compact?: boolean;
  /** Adds the one soft shadow. Only when the card floats over a photo. */
  floating?: boolean;
  style?: React.CSSProperties;
}
export declare function TrackerCard(props: TrackerCardProps): JSX.Element;
