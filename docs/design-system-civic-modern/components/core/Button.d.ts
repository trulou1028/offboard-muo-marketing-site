/**
 * Offboard button. 44px tall, 6px radius, sentence case, no icons except the Lumo dot.
 * @startingPoint section="Core" subtitle="Primary, secondary, ghost, AI and Lumo buttons" viewport="700x180"
 */
export interface ButtonProps {
  /** primary = Forest fill (one per section). secondary = hairline outline. ghost = bare text.
   *  ai = Ink fill with the Lumo dot, once per page. lumo = Lumo fill, only the final CTA. onDark = Paper fill on dark bands. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'ai' | 'lumo' | 'onDark';
  /** md = 44px (default). sm = 36px, for header and inline use. */
  size?: 'md' | 'sm';
  /** Renders an anchor instead of a button. */
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
