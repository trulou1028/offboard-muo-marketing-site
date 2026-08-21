import Image from "next/image";
import { ArrowRight, CalendarDays, Check, GraduationCap, LockKeyhole, Plus } from "lucide-react";

import { SearchShowcase } from "./SearchShowcase";
import "./MarketingHomepage.css";

const SIGN_UP_URL = "https://app.offboard.co/auth?tab=signup";
const SIGN_IN_URL = "https://app.offboard.co/auth?tab=signin";
const HUMAN_SUPPORT_URL = "https://offboard.co/intake";

const START_STEPS = [
  ["Choose where you are now", "Start with the path that fits today, from newly laid off to preparing ahead."],
  ["Answer one useful question at a time", "Add your state, timing, benefits, and severance only when it helps your path."],
  ["Keep your context private", "Your answers personalize deadlines and priorities. They are never shown to employers or recruiters."],
] as const;

const HUMAN_STEPS = [
  ["Work independently", "Follow your plan, manage applications, and use the tools at your own pace."],
  ["Ask Lumo", "Get guidance that uses the context already in your Offboard workspace."],
  ["Talk with a person", "Book available one-on-one support online or visit the Offboard office in Concord, California."],
] as const;

const FAQS = [
  ["Is Offboard part of the government?", "No. Offboard is an independent career-transition service. It is not a government agency and does not make decisions about unemployment insurance or public-benefit eligibility."],
  ["Can Offboard tell me whether I qualify for benefits?", "Offboard can help you find programs that may be relevant and get to the official source. The agency or provider responsible for the program decides eligibility, benefit amounts, and approval."],
  ["Is Offboard only for people in tech?", "No. Offboard is designed for people navigating a layoff or job transition. Some job-search tools may be most developed for professional and knowledge-work roles today, and we will be clear when a feature is better suited to a particular kind of work."],
  ["Can I use Offboard without an employer sponsor?", "Yes. You can start on your own. If an employer, workforce organization, or public partner offers sponsored access, you can also enroll through that program."],
  ["Can my former employer see my information?", "If your access is sponsored, Offboard will explain what the sponsor can see before you enroll. Review that notice or contact Offboard with questions about your specific program."],
  ["Can I speak with a person?", "Yes, depending on availability. Offboard may offer online appointments and in-person support at its Concord, California office. The booking page will show current formats, hours, eligibility, and pricing."],
  ["What if I only need help with one part of my transition?", "Start with what feels most urgent. You can use Offboard to organize a single application, research possible support, or build a broader transition plan. You do not need to complete every part at once."],
  ["Does Offboard guarantee benefits, interviews, offers, or placement?", "No. Offboard helps you organize and improve the work of a transition, but it cannot guarantee eligibility decisions, interviews, offers, or job placement."],
  ["How is Lumo different from a general AI assistant?", "Lumo works inside your Offboard workspace, so it can use the transition, role, and application context you choose to save. It is designed to help with the work in Offboard, while still requiring your review and judgment."],
] as const;

function Brand() {
  return <Image className="mh-brand" src="/marketing/homepage/offboard-logo-light.png" alt="Offboard" width={520} height={106} loading="eager" />;
}

function PrimaryCta({ children = "Build my plan", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <a className={`mh-primary-cta ${className}`.trim()} href={SIGN_UP_URL}><span>{children}</span><ArrowRight aria-hidden="true" /></a>;
}

function NumberedRows({ rows }: { rows: readonly (readonly [string, string])[] }) {
  return (
    <ol className="mh-numbered-rows">
      {rows.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}
    </ol>
  );
}

function HowItWorks() {
  const jobs = [
    ["01", "Protect your runway", "Money, coverage, and timing organized around what needs attention first."],
    ["02", "Find available support", "Benefits, training, and local resources with deadlines and official sources."],
    ["03", "Find what comes next", "Roles, materials, interviews, and next steps kept in one connected search."],
  ] as const;

  return (
    <section className="mh-three-jobs mh-section" id="how-it-works" aria-labelledby="three-jobs-title">
      <div className="mh-jobs-intro"><div><span className="mh-kicker">How it works</span><h2 id="three-jobs-title">A layoff gives you three jobs at once.</h2></div><p>Protect the money you have. Find support before deadlines pass. Build your next source of income. Offboard connects all three in one plan.</p></div>
      <div className="mh-jobs-editorial">
        <Image src="/marketing/homepage/three-jobs-editorial-v1.png" alt="A desk scene representing financial planning, benefits research, and a connected job search" fill sizes="(max-width: 900px) 100vw, 90vw" />
        <span className="mh-job-pill is-runway"><b>01</b>Runway</span>
        <span className="mh-job-pill is-support"><b>02</b>Support</span>
        <span className="mh-job-pill is-next-role"><b>03</b>Next role</span>
      </div>
      <div className="mh-jobs-rail">
        {jobs.map(([number, title, body]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}
      </div>
    </section>
  );
}

function StartingPlan() {
  return (
    <div className="mh-onboarding-visual" aria-label="An abstracted preview of Offboard onboarding">
      <Image src="/marketing/homepage/onboarding-atmosphere-v1.png" alt="" fill sizes="(max-width: 900px) 100vw, 44vw" aria-hidden="true" />
      <div className="mh-onboarding-screen">
        <div className="mh-onboarding-progress" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <h3>Where are you right now?</h3>
        <p>This sets your path. You can change it any time, or skip straight to the tools if you already know what you need.</p>
        <div className="mh-onboarding-choices" aria-hidden="true"><span /><span /><span>I&apos;m still employed, but at risk</span><span /></div>
        <small>Private by default. This never appears to employers or recruiters. It only personalizes your path, deadlines, and what you may be entitled to.</small>
        <button type="button">Skip, I&apos;ll decide later</button>
      </div>
      <div className="mh-onboarding-card is-laid-off"><i />I was just laid off</div>
      <div className="mh-onboarding-card is-know"><i />I know what I need</div>
    </div>
  );
}

function TransitionTimeline() {
  const items = [
    ["This week", "Review severance agreement", "Save questions for a qualified professional.", "Sep 5"],
    ["Next", "Check unemployment steps", "Continue to the official state source.", "Sep 12"],
    ["Later", "Review healthcare options", "Compare timing and official enrollment details.", "Sep 26"],
  ] as const;
  return (
    <div className="mh-ui-card mh-timeline-card" aria-label="Illustrative transition timeline">
      <div className="mh-ui-card-heading"><h3>Your transition timeline</h3><span>Illustrative plan</span></div><div className="mh-segmented"><b>Now</b><span>Next</span><span>Later</span></div>
      <div className="mh-timeline-list">{items.map(([when, title, detail, date]) => <div key={title}><span>{when}</span><p><strong>{title}</strong><small>{detail}</small></p><time>{date}</time></div>)}</div>
      <small className="mh-card-note">Dates and actions are illustrative. Verify program details with the responsible agency or qualified professional.</small>
    </div>
  );
}

function BenefitsPreview() {
  return (
    <div className="mh-benefits-preview" aria-label="Illustrative California benefits preview">
      <header><div><h3>Benefits</h3><p>Possible support based on the details you choose to share.</p><small><i /> Official sources only · sample guidance</small></div><span>Sample · CA</span></header>
      <div className="mh-benefits-body"><div className="mh-benefit-matches"><article className="is-deadline"><span>Deadline that expires silently</span><strong>11 weeks left</strong><p>Ask for the training extension before week 16 of your benefit payments.</p></article><small>Possible matches</small><article><strong>Funded training · tuition paid</strong><em>Possible match</em><p>Tuition paid provider-direct</p><a href="https://edd.ca.gov" target="_blank" rel="noreferrer">Official source ↗</a></article><article><strong>Training extension</strong><em>Deadline running</em><p>Up to 26 extra weeks</p><a href="https://edd.ca.gov" target="_blank" rel="noreferrer">Official source ↗</a></article></div><aside><small>California resources</small><article><b>California unemployment office</b><p>The state’s official unemployment portal.</p></article><article><b>Local job center</b><p>Career services near Concord.</p></article></aside></div>
    </div>
  );
}

function StartingPlanPreview() {
  const rows = [["Priority", "Review severance and save questions", "Money"], ["Possible", "Review funded training requirements", "Support"], ["Next", "Finish application packet for Northstar", "Job search"]] as const;
  return (
    <div className="mh-ui-card mh-plan-preview" aria-label="Example Offboard starting plan">
      <div className="mh-ui-card-heading"><h3>Your starting plan</h3><span>Week one</span></div><div className="mh-segmented"><b>Now</b><span>This week</span><span>Coming up</span></div>
      <div className="mh-plan-rows">{rows.map(([status, title, category]) => <div key={title}><span>{status}</span><strong>{title}</strong><small>{category}</small></div>)}</div><div className="mh-lumo-row"><span>Ask Lumo what to do first</span><small>Context already attached</small></div>
    </div>
  );
}

export default function MarketingHome() {
  return (
    <div className="marketing-homepage">
      <a className="mh-skip-link" href="#main-content">Skip to content</a>
      <header className="mh-site-header"><a href="#top" aria-label="Offboard home"><Brand /></a><nav aria-label="Marketing navigation"><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="mailto:hello@offboard.co?subject=Employer%20support">For employers</a><a href="mailto:hello@offboard.co?subject=Public%20partner%20support">For public partners</a></nav><div className="mh-header-actions"><a href={SIGN_IN_URL}>Sign in</a><PrimaryCta /></div></header>
      <main id="main-content">
        <section className="mh-hero" id="top"><div className="mh-hero-inner"><div className="mh-hero-copy"><span className="mh-kicker is-lime">Independent support for life after a layoff</span><h1><span>The Modern</span>{" "}<span>Unemployment Office</span></h1><p>A layoff creates more than a job search. Offboard helps you protect your financial runway, find benefits and support you may qualify for, and build a clear plan for what comes next.</p><div className="mh-hero-actions"><PrimaryCta /><a href="#how-it-works">See how Offboard works <ArrowRight aria-hidden="true" /></a></div><small><LockKeyhole aria-hidden="true" />Start free. No payment required. Offboard is independent, not a government agency.</small></div><div className="mh-hero-visual"><div className="mh-hero-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman at a desk by a window, writing in a notebook as she plans what comes next" fill sizes="(max-width: 900px) 100vw, 42vw" preload /></div><div className="mh-hero-note mh-note-one"><CalendarDays aria-hidden="true" /><span><small>Protect my runway</small><strong>Priorities first</strong></span></div><div className="mh-hero-note mh-note-two"><GraduationCap aria-hidden="true" /><span><small>Plan my next move</small><strong>One connected plan</strong></span></div><div className="mh-official-pill"><Check aria-hidden="true" />Official sources only</div></div></div></section>
        <HowItWorks />

        <section className="mh-fragmented mh-section mh-split" aria-labelledby="fragmented-title"><div className="mh-copy-block"><span className="mh-kicker">The problem is not a lack of information</span><h2 id="fragmented-title">Every part of unemployment lives somewhere else.</h2><p>Your state handles unemployment insurance. Benefits directories live on other websites. Your resume is in one document, applications are in another, and advice is scattered across search results, group chats, and AI tools. Offboard brings the work into one plan.</p><strong>Money and deadlines. Benefits and retraining. Applications and interviews. Answers when you get stuck.</strong><PrimaryCta>See my starting plan</PrimaryCta></div><div className="mh-fragment-collage" aria-label="Fragmented tools organized into one connected Offboard plan"><Image src="/marketing/homepage/fragmentation-collage-v1.png" alt="A layered collage of the disconnected tools people use after a layoff" fill sizes="(max-width: 900px) 100vw, 46vw" /><span className="is-state"><i />State portal</span><span className="is-benefits"><i />Benefits directory</span><span className="is-resume"><i />Resume documents</span><span className="is-search"><i />Search, chats, and AI</span><span className="is-trackers"><i />Application trackers</span></div></section>

        <section className="mh-personalized mh-section mh-split" aria-labelledby="personalized-title"><StartingPlan /><div className="mh-copy-block"><span className="mh-kicker">Tell us once</span><h2 id="personalized-title">Start with your situation,<br />not a blank dashboard.</h2><p>Offboard starts with where you are now, then asks only what changes your path: your state, timing, benefits, and severance. Each answer is optional and editable.</p><NumberedRows rows={START_STEPS} /><small><em>You can update or delete your information at any time.</em></small></div></section>

        <section className="mh-runway mh-section mh-split" aria-labelledby="runway-title"><TransitionTimeline /><div className="mh-copy-block"><span className="mh-kicker">Job one</span><h2 id="runway-title">Know what deserves attention before it becomes urgent.</h2><p>Turn severance, benefits, health coverage, recurring expenses, and important dates into a practical timeline. Offboard helps you see what to handle now, what can wait, and which questions may require a qualified professional.</p><ul className="mh-plain-list"><li>01 Capture severance, coverage, and benefit dates</li><li>02 Track unemployment and healthcare actions</li><li>03 See how timing affects your weekly priorities</li><li>04 Save questions for the right professional</li></ul><PrimaryCta>Organize my runway</PrimaryCta><small>Offboard provides general information and planning support. It does not provide legal, tax, financial, or benefits determinations.</small></div></section>

        <section className="mh-benefits mh-section mh-split" aria-labelledby="benefits-title"><div className="mh-copy-block"><span className="mh-kicker">Job two</span><h2 id="benefits-title">Find support you may qualify for before deadlines pass.</h2><p>Programs vary by state, county, household, and employment history. Offboard helps you identify relevant possibilities and get to the official application or local provider without starting your research from scratch.</p><ul className="mh-check-list"><li><Check aria-hidden="true" />Unemployment, healthcare, and household assistance</li><li><Check aria-hidden="true" />Training funds and local career services</li><li><Check aria-hidden="true" />Possible matches → official source</li></ul><small className="mh-top-rule">Eligibility and final decisions are made by the agency or provider responsible for each program.</small></div><BenefitsPreview /></section>

        <SearchShowcase signUpUrl={SIGN_UP_URL} />

        <section className="mh-human mh-section mh-split" aria-labelledby="human-title"><div className="mh-human-photo"><Image src="/marketing/homepage/raw/hero-real-life.webp" alt="A woman sitting at her desk with a notebook and laptop" fill sizes="(max-width: 900px) 100vw, 42vw" /></div><div className="mh-copy-block"><span className="mh-kicker">Use the support that fits the moment</span><h2 id="human-title">You can do this yourself. You should not have to do it alone.</h2><p>Use Offboard on your own, ask Lumo for guidance when you get stuck, or talk with a real person when the situation needs more context.</p><NumberedRows rows={HUMAN_STEPS} /><a className="mh-primary-cta" href={HUMAN_SUPPORT_URL}><span>Talk to someone</span><ArrowRight aria-hidden="true" /></a><small>Availability, format, and pricing vary by support option.</small></div></section>

        <section className="mh-proof mh-section mh-split" aria-labelledby="proof-title"><div className="mh-copy-block"><span className="mh-kicker">Built around the work after a layoff</span><h2 id="proof-title">One plan for the decisions, deadlines, and opportunities ahead.</h2><p>Offboard brings the practical work of a transition into one place, so you can spend less time rebuilding context and more time taking the next useful step.</p><ul className="mh-plain-list ruled"><li>01 A starting plan organized around your situation</li><li>02 One workspace connecting each role, application, and next step</li><li>03 Possible support with official sources and clear follow-through</li></ul><a className="mh-primary-cta" href="#how-it-works"><span>See how Offboard works</span><ArrowRight aria-hidden="true" /></a></div><div><StartingPlanPreview /><small className="mh-card-note">Example information shown. Your plan will reflect the details you choose to provide.</small></div></section>

        <section className="mh-privacy mh-section" id="privacy" aria-labelledby="privacy-title"><div className="mh-privacy-heading"><div><span className="mh-kicker is-lime">Private by default</span><h2 id="privacy-title">Your transition is yours.</h2><p>Offboard uses your information to provide the tools and support you ask for. We do not sell personal information for money. You can manage or delete your consumer account from settings.</p><p className="mh-privacy-links"><a href="https://app.offboard.co/privacy">Read the privacy policy</a><a href="mailto:hello@offboard.co?subject=Sponsored%20access">Learn about sponsored access</a></p></div><NumberedRows rows={[["Independent", "Offboard is an independent company and is not affiliated with any state or federal agency."], ["Your choice", "You choose what enters your workspace and which support you ask Offboard to provide."], ["Clear sponsor terms", "If an employer or public partner sponsors your access, Offboard explains what that sponsor can and cannot see before you enroll."]]} /></div><div className="mh-information-flow" aria-label="How information moves through Offboard"><small>How information moves</small><div><article><span>You</span><strong>Choose what to share</strong><p>Your details and requests</p></article><i /><article><span>Your workspace</span><strong>Offboard tools and support</strong><p>Context stays attached to the work you request</p></article><i /><article><span>Official provider</span><strong>You continue there</strong><p>For eligibility and applications</p></article><i /><article className="is-sponsor"><span>Sponsor view</span><strong>Explained before enrollment</strong><p>Visibility depends on the program notice</p></article></div><p>Offboard organizes information and routes you to official providers. It does not replace government agencies or program decision-makers.</p></div></section>

        <section className="mh-pricing mh-section" id="pricing" aria-labelledby="pricing-title"><div className="mh-pricing-heading"><div><span className="mh-kicker">A simple place to start</span><h2 id="pricing-title">Start free. Add more support when you need it.</h2></div><p>Begin with a transition plan and the core tools. Add credits or human support only when you choose to go further. You will see the price and what is included before you pay.</p></div><div className="mh-price-deck"><article className="is-primary"><header><span>01 · Start free</span><span>No payment required</span></header><h3>Start free</h3><p>Create your starting plan, add jobs, organize your search, and use the included Offboard tools. No payment is required to begin.</p><strong>Starting plan · Jobs · Search tools</strong><PrimaryCta /></article><article><header><span>02 · Add support</span><b>Choose when needed</b></header><div><h3>Go further when you need to</h3><p>Add credits for deeper research, tailored materials, and interview preparation. Book eligible human-support options separately when available.</p><ul><li><Check aria-hidden="true" />Deeper research</li><li><Check aria-hidden="true" />Tailored materials</li><li><Check aria-hidden="true" />Interview preparation</li><li><Check aria-hidden="true" />Human support when available</li></ul></div><PrimaryCta>See plans and support</PrimaryCta></article></div></section>

        <section className="mh-faq mh-section" aria-labelledby="faq-title"><div><span className="mh-kicker">Good questions</span><h2 id="faq-title">A few things to know before you start.</h2></div><div className="mh-faq-list">{FAQS.map(([question, answer]) => <article key={question}><header><h3>{question}</h3><Plus aria-hidden="true" /></header><p>{answer}</p></article>)}</div></section>

        <section className="mh-final-cta mh-section" aria-labelledby="final-title"><span className="mh-kicker is-lime">You do not need the whole plan today</span><h2 id="final-title">Start with the next right step.</h2><p>Tell us what changed. Offboard will help you organize what deserves attention now and build from there.</p><div><PrimaryCta /><a href={HUMAN_SUPPORT_URL}>Talk to a person</a></div><small>Independent support. Start free.</small><div className="mh-progress-mark" aria-hidden="true"><i /><span /><i /><span /><i /></div></section>
      </main>
      <footer className="mh-site-footer"><div><div><strong>Offboard</strong><p>Offboard is an independent career-transition service and is not affiliated with any state or federal agency. Information provided by Offboard is general and does not replace guidance from government agencies or qualified legal, tax, financial, or healthcare professionals.</p></div><nav aria-label="Footer navigation"><div><strong>Product</strong><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a></div><div><strong>Partners</strong><a href="mailto:hello@offboard.co?subject=Employer%20support">For employers</a><a href="mailto:hello@offboard.co?subject=Public%20partner%20support">For public partners</a></div><div><strong>Company</strong><a href={HUMAN_SUPPORT_URL}>Visit us</a><a href="mailto:hello@offboard.co">Contact</a></div><div><strong>Legal</strong><a href="https://app.offboard.co/privacy">Privacy</a><a href="https://app.offboard.co/terms">Terms</a></div></nav></div><p><span>© 2026 Offboard</span><span>Independent support for life after a layoff</span></p></footer>
    </div>
  );
}
