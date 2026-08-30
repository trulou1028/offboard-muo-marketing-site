/**
 * Pricing card for Free and Pro.
 * @startingPoint section="Product" subtitle="Free and Pro pricing cards" viewport="700x400"
 */
export interface PlanCardProps {
  name: string;
  price: string;
  cadence?: string;
  tagline?: string;
  features?: string[];
  /** Pro only: swaps the hairline for a Forest border. Nothing else changes. */
  emphasized?: boolean;
  action?: React.ReactNode;
  /** Passed to Icon; set when the page is not served from the project root. */
  iconBase?: string;
  style?: React.CSSProperties;
}
export declare function PlanCard(props: PlanCardProps): JSX.Element;
