/**
 * The chat device: a white card holding YouBubble / AiReply turns.
 * @startingPoint section="Product" subtitle="The hero chat exchange with a tracker card reply" viewport="700x340"
 */
export interface ChatExchangeProps {
  /** true = floating overlay (soft shadow, no border). false = flat in the grid (1px border, no shadow). */
  floating?: boolean;
  width?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function ChatExchange(props: ChatExchangeProps): JSX.Element;

/** A message from the member. Paper deep, right-aligned, one squared corner, no avatar. */
export interface YouBubbleProps { children?: React.ReactNode; style?: React.CSSProperties }
export declare function YouBubble(props: YouBubbleProps): JSX.Element;

/** Lumo's reply. No bubble; plain Ink text with the Lumo avatar. */
export interface AiReplyProps {
  /** The one action word that gets the Lumo highlight, e.g. "Done." Only the first word. */
  highlight?: string;
  /** Cards the AI produced, indented to the text column so they read as part of the reply. */
  cards?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function AiReply(props: AiReplyProps): JSX.Element;
