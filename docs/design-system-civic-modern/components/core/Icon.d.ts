/**
 * Monochrome line icon on the 20px grid, 1.5px stroke.
 * Icons are Ink or Forest, never filled, never in a colored circle.
 */
export interface IconProps {
  /** Lucide icon file name, e.g. "briefcase", "calendar", "file-text". */
  name: string;
  /** Rendered box in px. Default 20. */
  size?: number;
  /** Stroke width. Default 1.5 — the brand value. */
  strokeWidth?: number;
  /** Stroke color. Default currentColor. */
  color?: string;
  /** Directory the SVG files are served from. Default "/assets/icons". */
  base?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
