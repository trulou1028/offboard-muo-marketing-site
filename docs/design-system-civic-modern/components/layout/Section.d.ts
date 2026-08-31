/**
 * Page band. No two adjacent sections share a band, tints alternate temperature
 * (Mist then Sand), and at most two forestDeep anchors per page, never adjacent.
 * @startingPoint section="Layout" subtitle="Paper, Paper deep, Mist, Sand and dark anchor bands" viewport="700x260"
 */
export interface SectionProps {
  band?: 'paper' | 'paperDeep' | 'mist' | 'sand' | 'forestDeep';
  /** 80px vertical padding instead of 120px. */
  compact?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}
export declare function Section(props: SectionProps): JSX.Element;
