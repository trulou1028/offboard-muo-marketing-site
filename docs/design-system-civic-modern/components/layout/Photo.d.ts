/** Photograph in the grid: 20px radius, natural daylight, subject mid-task. Max two chips. */
export interface PhotoProps {
  src: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "4 / 3" or "3 / 2". Ignored when height is set. */
  ratio?: string;
  /** Fixed pixel height, for triptych rows sharing one height. */
  height?: number;
  /** Up to two <Chip> elements floated over the image. */
  chips?: React.ReactNode[];
  chipCorner?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** Styles for the inner img, e.g. objectPosition to vary the crop when frames share a source. */
  imgStyle?: React.CSSProperties;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Photo(props: PhotoProps): JSX.Element;
