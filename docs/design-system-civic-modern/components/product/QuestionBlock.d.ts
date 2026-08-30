/**
 * The "more than a job search" pattern: hairline, question, feature eyebrow, answer.
 * @startingPoint section="Product" subtitle="Hairline question block, three across" viewport="700x220"
 */
export interface QuestionBlockProps {
  /** Asked in the member's voice, in the serif. "What do I do first?" */
  question: string;
  /** The product feature that answers it, demoted to an eyebrow. */
  feature?: string;
  /** Eyebrow tone; use "sand" on the Sand band. */
  tone?: 'forest' | 'sand' | 'lumo' | 'onDark';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function QuestionBlock(props: QuestionBlockProps): JSX.Element;
