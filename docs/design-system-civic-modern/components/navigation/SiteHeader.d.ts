/**
 * Marketing site header.
 * @startingPoint section="Navigation" subtitle="Site header with wordmark, links and CTA" viewport="1280x80"
 */
export interface SiteHeaderProps {
  /** Path to the wordmark PNG: assets/logo-wordmark-dark.png on light, -light.png on dark. */
  logo: string;
  links?: string[];
  /** Renders the header on a Forest deep band. */
  onDark?: boolean;
  active?: string;
  onNavigate?: (link: string) => void;
  style?: React.CSSProperties;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
