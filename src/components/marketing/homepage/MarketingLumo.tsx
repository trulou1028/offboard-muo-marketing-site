import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, BriefcaseBusiness, MessagesSquare } from "lucide-react";
import { FinalCta, LumoMark, MarketingShell, PageHero } from "./MarketingSite";

// Relume MCP Layout 27 and Layout 237 adapted to Civic Modern. COPY.md § 12.
const USE_CASES = [
  { title: "Find your next step", body: "Sort through priorities and decide what needs attention today.", prompt: "What should I focus on today?", icon: Compass },
  { title: "Work through a role", body: "Evaluate an opportunity, strengthen an application, or plan a follow-up.", prompt: "How do I make this application stronger?", icon: BriefcaseBusiness },
  { title: "Prepare for the conversation", body: "Practice for an interview with your experience and the role in mind.", prompt: "Help me prepare for tomorrow's interview.", icon: MessagesSquare },
] as const;

export function MarketingLumo() {
  return (
    <MarketingShell current="lumo">
      <main id="main-content" className="mh-page-lumo">
        <PageHero
          kicker="Meet Lumo"
          title="The AI that already understands your career."
          titleLines={["The AI that already understands", "your career."]}
          body="Ask about your next move. Lumo works from your Career Context, applications, and plan to help you move forward."
          current="lumo"
          aside={false}
          cta="Get started free"
        />
        <section className="mh-lumo-product mh-section" aria-labelledby="product-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">Ask Lumo</span>
            <h2 id="product-title">Start with what you need.</h2>
            <p>Ask in your own words, or choose a prompt to track a role, prepare for an interview, or review your progress.</p>
            <span className="mh-context-callout"><LumoMark />Built into Offboard</span>
            <Link className="mh-section-link" href="/career-context">See what Lumo works from <ArrowRight aria-hidden="true" /></Link>
          </div>
          <figure className="mh-lumo-product-shot">
            <Image src="/marketing/app/lumo-prompts-live-v1.jpg" alt="Lumo's prompt library in the Offboard app, with options to track a job, update an application, prepare for an interview, review progress, add a contact, and check a posting" width={672} height={624} sizes="(max-width: 800px) calc(100vw - 48px), 600px" />
            <figcaption>Inside Lumo: the prompt library.</figcaption>
          </figure>
        </section>
        <section className="mh-lumo-use-cases mh-section" aria-labelledby="ask-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">A few ways to begin</span>
            <h2 id="ask-title">Less setup. More progress.</h2>
          </div>
          <div className="mh-lumo-use-grid">
            {USE_CASES.map(({ title, body, prompt, icon: Icon }) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
                <blockquote>{prompt}</blockquote>
              </article>
            ))}
          </div>
        </section>
        <section className="mh-lumo-assurance mh-section" aria-labelledby="straight-title">
          <div className="mh-copy-block">
            <span className="mh-kicker">You stay in charge</span>
            <h2 id="straight-title">Support for your decisions.</h2>
            <p>Lumo helps you prepare. You review the details and decide what to send.</p>
            <Link className="mh-section-link" href="/pricing">Free includes 10 Lumo messages a day. Pro removes the limit. <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="mh-copy-block">
            <h3>Clear about benefits</h3>
            <p>Benefits guidance draws on human-verified state facts. Agencies and providers decide eligibility and amounts. Offboard is independent, not a government agency.</p>
            <h3>Use the assistant you prefer</h3>
            <p>You can also connect ChatGPT or Claude to your Offboard record.</p>
            <Link className="mh-section-link" href="/integrations">See the integrations <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>
        <FinalCta title="Start with your next question." body="Bring your experience. Lumo helps you put it to work." />
      </main>
    </MarketingShell>
  );
}
