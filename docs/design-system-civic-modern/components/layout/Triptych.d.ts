/**
 * The section-scale photo pattern. The wide slot gets the environmental shot;
 * narrow slots get tighter, quieter frames. Never three faces in a row.
 * @startingPoint section="Layout" subtitle="Narrow-wide-narrow photo row with product chips" viewport="700x300"
 */
export interface TriptychProps {
  /** Exactly three <Photo> children. */
  children?: React.ReactNode;
  /** Shared row height in px. Default 320. */
  height?: number;
  /** Side column width. Default 250. */
  side?: number;
  style?: React.CSSProperties;
}
export declare function Triptych(props: TriptychProps): JSX.Element;
