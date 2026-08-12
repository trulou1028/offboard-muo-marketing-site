/**
 * The ecosystem view, as markup: everything Offboard does works from the same
 * understanding of you. Pure CSS connectors, no image, no client JS.
 */
export function SystemDiagram() {
  return (
    <ul className="mh-system-diagram" aria-label="How your information powers everything">
      <li>You + your information</li>
      <li>
        <ul className="mh-system-branches">
          <li>Career plan</li>
          <li>Job search</li>
          <li>Support</li>
        </ul>
      </li>
    </ul>
  );
}
