/** Pill label. On photos it is translucent Ink at 62% with Paper text; max two per photo, anchored 14px from a corner. */
export interface ChipProps {
  /** photo = translucent overlay on imagery. status = Paper deep pill for product state. */
  tone?: 'photo' | 'status';
  /** sage = product status, lumo = the AI did it. Omit for no dot. */
  dot?: 'sage' | 'lumo';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Chip(props: ChipProps): JSX.Element;
