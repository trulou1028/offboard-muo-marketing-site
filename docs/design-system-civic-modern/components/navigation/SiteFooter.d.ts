/** Site footer on the Forest deep band. */
export interface SiteFooterProps {
  /** Use assets/logo-wordmark-light.png here. */
  logo: string;
  columns?: { title: string; items: string[] }[];
  note?: string;
  style?: React.CSSProperties;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
