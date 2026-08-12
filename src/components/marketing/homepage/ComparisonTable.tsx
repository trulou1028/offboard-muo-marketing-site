import { Check, Minus, X } from "lucide-react";

import { COMPARISON_ROWS, type ComparisonCell } from "./fixtures";

const CELL_LABEL: Record<ComparisonCell, string> = {
  yes: "Included",
  partial: "Partial",
  no: "Not covered",
};

function Cell({ state, note }: { state: ComparisonCell; note: string }) {
  const Icon = state === "yes" ? Check : state === "partial" ? Minus : X;
  return (
    <td className={`is-${state}`}>
      <Icon aria-hidden="true" />
      <span className="mh-visually-hidden">{CELL_LABEL[state]}</span>
      {note ? <span className="mh-comparison-note"> {note}</span> : null}
    </td>
  );
}

export function ComparisonTable() {
  return (
    <div className="mh-table-scroll">
      <table>
        <caption className="mh-visually-hidden">
          What the unemployment experience takes on your own, with separate point
          solutions, and with Offboard
        </caption>
        <thead>
          <tr>
            <th scope="col">What you need</th>
            <th scope="col">On your own</th>
            <th scope="col">Point solutions</th>
            <th scope="col">Offboard</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON_ROWS.map((row) => (
            <tr key={row.need}>
              <th scope="row">{row.need}</th>
              <Cell {...row.onYourOwn} />
              <Cell {...row.pointSolutions} />
              <Cell {...row.offboard} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
