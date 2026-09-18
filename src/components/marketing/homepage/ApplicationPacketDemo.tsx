import { Check } from "lucide-react";
import { PACKET_DEMO_STEPS, PACKET_EXAMPLE, PACKET_STEP_CHIP } from "./ApplicationPacketDemoData";

export function ApplicationPacketDemo() {
  return (
    <div className="mh-packet-demo">
      <div className="mh-packet-demo-stage">
        <aside className="mh-packet-example-role" aria-label="Illustrative candidate and role">
          <span className="mh-packet-example-label">Illustrative example</span>
          <div className="mh-packet-persona">
            <span aria-hidden="true">AM</span>
            <div><strong>{PACKET_EXAMPLE.candidate}</strong><p>{PACKET_EXAMPLE.candidateRole}</p></div>
          </div>
          <dl>
            <div><dt>Role</dt><dd>{PACKET_EXAMPLE.role}</dd></div>
            <div><dt>Company</dt><dd>{PACKET_EXAMPLE.company}</dd></div>
          </dl>
          <p>{PACKET_EXAMPLE.roleSummary}</p>
          <div className="mh-packet-source-record">
            <span>Example source record</span>
            <p>{PACKET_EXAMPLE.sourceExperience}</p>
          </div>
          <small>Illustrative example. No live job is being checked.</small>
        </aside>

        <div className="mh-packet-output" aria-label="Complete packet example">
          <div className="mh-packet-output-head">
            <div>
              <span className="mh-packet-output-kicker">Complete example</span>
              <h3>One role, six connected outputs.</h3>
            </div>
            <span className="mh-packet-complete-mark"><Check aria-hidden="true" /> Ready to review</span>
          </div>
          <ul className="mh-packet-summary">
            {PACKET_DEMO_STEPS.map((step) => (
              <li key={step.id}>
                <div><strong>{step.label}</strong><span>{step.summary}</span></div>
                <em className={`mh-state-chip${step.tier === "pro" ? " is-pro" : ""}`}>
                  {PACKET_STEP_CHIP[step.tier]}
                </em>
              </li>
            ))}
          </ul>
          <p className="mh-packet-review-note">Alex reviews and sends every application material.</p>
        </div>
      </div>
    </div>
  );
}
