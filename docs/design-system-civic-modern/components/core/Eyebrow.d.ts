/** Uppercase section label, Inter 600 / 12px / 0.1em. */
export interface EyebrowProps {
  /** forest (default) · sand for warm bands · lumo only when the section is about AI · onDark for neutral dark bands. */
  tone?: 'forest' | 'sand' | 'lumo' | 'onDark';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Eyebrow(props: EyebrowProps): JSX.Element;
