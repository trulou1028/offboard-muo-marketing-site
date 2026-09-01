import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  ListChecks,
  MessageSquare,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { AiReply, CommunityStrip, LumoMark, MarketingShell, SIGN_UP_URL, StartingPlanPreview, TrackerCard, YouBubble } from "./MarketingSite";

/* Homepage v2 (plan 022): the Civic Modern homepage. Copy source:
   offboard-career-context-hp-copy-v1a.md, mirrored in COPY.md § 1. Layout
   follows docs/design-system-civic-modern (readme.md band order and the
   marketing ui_kit). */

function SecondaryCta({ children, href }: { children: ReactNode; href: string }) {
  return href.startsWith("/") ? (
    <Link className="mh-secondary-cta" href={href}>{children}</Link>
  ) : (
    <a className="mh-secondary-cta" href={href}>{children}</a>
  );
}

function HomeHeroV2() {
  return (
    <section className="mh-hero2 mh-section" id="top" aria-labelledby="hero-title">
      <div className="mh-hero2-copy">
        <h1 id="hero-title">The modern unemployment office.</h1>
        <p>Your job search, benefits, applications, career context, and next steps in one system, connected to the AI you already use.</p>
        <div className="mh-hero2-actions">
          <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Get started free</span><ArrowRight aria-hidden="true" /></a>
          <SecondaryCta href="/how-it-works">See how it works</SecondaryCta>
        </div>
        <small className="mh-hero2-trust">Join thousands of people building their next chapter with Offboard.</small>
      </div>
      <div className="mh-hero2-visual">
        <figure className="mh-photo-frame">
          <Image
            src="/marketing/homepage/raw/hero-kitchen-table.webp"
            alt="A man at his kitchen table, working through his job search on a laptop"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
            preload
          />
          <span className="mh-photo-chip"><i className="is-lumo" aria-hidden="true" />Benefits check · Done</span>
        </figure>
        <div className="mh-chat-card is-floating" aria-label="Example conversation with an AI assistant">
          <YouBubble>I think I&apos;m going to apply to this. Add it to Offboard.</YouBubble>
          <AiReply highlight="Done." card={<TrackerCard />}>
            I&apos;ve added the role to your Offboard tracker and saved the company context.
          </AiReply>
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  ["Save opportunities instantly", "Turn something you're already discussing into a tracked opportunity without filling out another form."],
  ["Update your search by conversation", "Move stages, add notes, save contacts, record interviews, and update what happened just by asking."],
  ["Compare opportunities using your context", "Understand which roles actually fit your experience, goals, preferences, and current search."],
  ["Work across Offboard and AI", "Use Offboard directly or connect it to supported AI assistants. Your job search stays in sync."],
] as const;

function WhereverYouWork() {
  return (
    <section className="mh-wherever mh-section" aria-labelledby="wherever-title">
      <div className="mh-wherever-grid">
        <div className="mh-copy-block">
          <span className="mh-kicker">Offboard, wherever you work</span>
          <h2 id="wherever-title">Your job search goes wherever you do.</h2>
          <p>Use Offboard from the AI tools you already use. Research a job, save it to your tracker, compare opportunities, update applications, and keep your search moving without constantly switching tabs.</p>
          <span className="mh-context-callout"><LumoMark />Powered by Offboard Career Context</span>
          <Link className="mh-section-link" href="/integrations">See how Offboard Everywhere works <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="mh-chat-card" aria-label="Example conversation updating a job search from an AI assistant">
          <YouBubble>How does this role compare with the other opportunities I&apos;m pursuing?</YouBubble>
          <AiReply>Based on your Offboard context, Tesserac looks like one of your stronger opportunities. It aligns closely with your AI product experience and gives you more technical ownership than several of the other roles you&apos;re considering.</AiReply>
          <YouBubble>Move Tesserac to the interview stage and save that Ruben is my recruiter.</YouBubble>
          <AiReply highlight="Done.">Tesserac is now in Interviewing, and I&apos;ve added Ruben to the opportunity.</AiReply>
        </div>
      </div>
      <div className="mh-capabilities" data-reveal="">
        {CAPABILITIES.map(([title, body]) => (
          <div className="mh-capability" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const CONTEXT_CATEGORIES = [
  { icon: Briefcase, title: "Experience", body: "Roles, skills, accomplishments, projects, and outcomes." },
  { icon: ListChecks, title: "Applications", body: "The opportunities you're pursuing and what has happened with each one." },
  { icon: Building2, title: "Companies", body: "Research, notes, people, hiring signals, and what you've learned." },
  { icon: Users, title: "Contacts", body: "Recruiters, hiring managers, referrals, and people in your network." },
  { icon: FileText, title: "Documents", body: "Resumes, application materials, job descriptions, and other files." },
  { icon: MessageSquare, title: "Interviews", body: "Upcoming conversations, preparation, notes, feedback, and next steps." },
  { icon: Bookmark, title: "Preferences", body: "The work you want, compensation expectations, location, industries, and constraints." },
  { icon: Sparkles, title: "Goals", body: "What you're trying to accomplish and what needs your attention next." },
] as const;

function CareerContextSection() {
  return (
    <section className="mh-ctx mh-section" aria-labelledby="ctx-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Career Context</span>
        <h2 id="ctx-title">One place that remembers your career.</h2>
        <p>Your resume is only a fraction of your career. Offboard builds a living record of your experience, accomplishments, applications, companies, conversations, documents, interviews, goals, and progress so you don&apos;t have to explain yourself from scratch every time you need help.</p>
        <Link className="mh-section-link" href="/career-context">Learn more about Career Context <ArrowRight aria-hidden="true" /></Link>
      </div>
      <div className="mh-ctx-grid" data-reveal="">
        {CONTEXT_CATEGORIES.map(({ icon: IconComponent, title, body }) => (
          <article className="mh-ctx-card" key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="mh-ctx-inset" data-reveal="">
        <div>
          <strong>Your Career Context</strong>
          <p>Always evolving. Available wherever you use Offboard.</p>
          <p className="mh-ctx-inset-line">Build it once. Keep making it better. Let the tools you use work from the same understanding of you.</p>
        </div>
        <a className="mh-ondark-cta" href={SIGN_UP_URL}><span>Build my Career Context</span><ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}

// The first question is promoted out of the grid so it can sit beside the
// plan-preview card that answers it (that card is real product state, built in
// plan 018 phase 3 and carried into v2).
const FIRST_QUESTION = ["What do I do first?", "Your personalized plan", "Tell Offboard what's happening, and we'll help organize what needs your attention now, what can wait, and what comes next."] as const;

const LIFE_QUESTIONS = [
  ["What support might I qualify for?", "Benefits and workforce programs", "Navigate unemployment insurance, training programs, workforce resources, and other forms of support that may be available where you live."],
  ["Is this job worth my time?", "Opportunity intelligence", "Check role fit, investigate possible ghost jobs, research companies, and understand whether an opportunity deserves your energy."],
  ["How do I submit a stronger application?", "Application support", "Turn your Career Context and the opportunity into stronger resumes, application packets, cover letters, and positioning."],
  ["How do I prepare when I hear back?", "Interview preparation", "Research the company, anticipate questions, prepare stories from your experience, and practice interviews with AI."],
  ["How do I keep everything straight?", "Tracker + Career Context", "Keep every opportunity, contact, document, conversation, and next step connected."],
] as const;

const TRIPTYCH = [
  { src: "/marketing/homepage/raw/strip-interview-prep.webp", alt: "A woman preparing for an interview at her desk", chip: "Plan · Updated", dot: "is-sage" },
  { src: "/marketing/homepage/raw/system-desk.webp", alt: "A desk with a laptop, paperwork, and coffee mid-task", chip: "Benefits check", dot: "is-lumo" },
  { src: "/marketing/homepage/raw/maya-walking.webp", alt: "A woman walking into an office building", chip: "Resume · 3 versions", dot: "is-sage" },
] as const;

function MoreThanAJobSearch() {
  return (
    <section className="mh-morethan mh-section" aria-labelledby="morethan-title">
      <div className="mh-copy-block">
        <span className="mh-kicker is-sand">More than a job search</span>
        <h2 id="morethan-title">Losing your job creates more than one problem.</h2>
        <p>Finding another role matters. But so do unemployment benefits, health coverage, finances, career decisions, applications, networking, interviews, and figuring out what to do first. Offboard brings those pieces together.</p>
      </div>
      <div className="mh-triptych" data-reveal="">
        {TRIPTYCH.map(({ src, alt, chip, dot }) => (
          <figure className="mh-photo-frame" key={chip}>
            <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 30vw" />
            <span className="mh-photo-chip"><i className={dot} aria-hidden="true" />{chip}</span>
          </figure>
        ))}
      </div>
      <div className="mh-morethan-first" data-reveal="">
        <article className="mh-qblock">
          <h3>{FIRST_QUESTION[0]}</h3>
          <span className="mh-qblock-feature">{FIRST_QUESTION[1]}</span>
          <p>{FIRST_QUESTION[2]}</p>
        </article>
        <StartingPlanPreview />
      </div>
      <div className="mh-qgrid" data-reveal="">
        {LIFE_QUESTIONS.map(([question, feature, body]) => (
          <article className="mh-qblock" key={question}>
            <h3>{question}</h3>
            <span className="mh-qblock-feature">{feature}</span>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <small className="mh-morethan-note">Offboard is independent, not a government agency, and claiming your benefits is always free.</small>
    </section>
  );
}

const LUMO_PROMPTS = [
  "What should I focus on today?",
  "Which of my open applications need follow-up?",
  "Help me prepare for tomorrow's interview.",
  "Why do you think this role is a strong fit for me?",
  "What should I do differently based on how my search has been going?",
] as const;

function MeetLumo() {
  return (
    <section className="mh-lumo-band mh-section" aria-labelledby="lumo2-title">
      <div className="mh-lumo-grid">
        <div className="mh-copy-block">
          <span className="mh-kicker is-lime">Meet Lumo</span>
          <h2 id="lumo2-title">An AI guide that already knows what you&apos;re working on.</h2>
          <p>Lumo is Offboard&apos;s native AI assistant. Because Lumo works from your Career Context, you can ask about your search without repeatedly uploading resumes, explaining your goals, or reconstructing what happened with every application.</p>
          <a className="mh-ai-cta" href={SIGN_UP_URL}><LumoMark className="is-dot" /><span>Ask Lumo</span></a>
          <small>Prefer another AI assistant? Connect Offboard and take your context with you.</small>
        </div>
        <div className="mh-lumo-prompts" data-reveal="" aria-label="Example questions to ask Lumo">
          <span>Ask things like</span>
          {LUMO_PROMPTS.map((prompt) => <p key={prompt}>{prompt}</p>)}
        </div>
      </div>
    </section>
  );
}

const TOOLKIT_GROUPS = [
  { icon: Search, title: "Decide", tools: [
    ["Role Fit", "Understand how an opportunity matches your experience, strengths, and goals."],
    ["Ghost Job Check", "Look for signals that a posting may not represent an actively hiring role."],
    ["Company Intelligence", "Know who you're applying to before you invest your time."],
  ] },
  { icon: FileText, title: "Apply", tools: [
    ["Application Packets", "Bring together the role, company, resume strategy, positioning, and application materials in one place."],
    ["Resume Tailoring", "Adapt your resume using the opportunity and your Career Context."],
    ["Cover Letters", "Create relevant application messaging without starting from a blank page."],
  ] },
  { icon: MessageSquare, title: "Interview", tools: [
    ["Interview Prep", "Turn company and role context into a focused preparation plan."],
    ["Voice Practice", "Practice answering questions in a realistic voice conversation."],
  ] },
  { icon: ListChecks, title: "Organize", tools: [
    ["Application Tracker", "Keep your entire pipeline current."],
    ["Career Context", "Connect the history behind every application, interaction, and outcome."],
  ] },
] as const;

function ToolkitV2() {
  return (
    <section className="mh-kit mh-section" aria-labelledby="kit-title">
      <div className="mh-copy-block">
        <span className="mh-kicker">Your job search toolkit</span>
        <h2 id="kit-title">Everything you need when the next opportunity appears.</h2>
      </div>
      <div className="mh-kit-grid" data-reveal="">
        {TOOLKIT_GROUPS.map(({ icon: IconComponent, title, tools }) => (
          <div className="mh-kit-col" key={title}>
            <IconComponent aria-hidden="true" />
            <h3>{title}</h3>
            {tools.map(([name, body]) => (
              <div className="mh-kit-tool" key={name}>
                <strong>{name}</strong>
                <p>{body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const FREE_FEATURES = [
  "Build your Career Context.",
  "Track opportunities.",
  "Save companies, contacts, notes, and activity.",
  "Connect supported AI assistants.",
  "Use core job-search tools.",
] as const;

const PRO_FEATURES = [
  "Compare opportunities using your complete context.",
  "Get deeper role and company intelligence.",
  "Create advanced application materials.",
  "Prepare for interviews using everything Offboard knows about you and the opportunity.",
  "Analyze patterns across your job search.",
  "Get more personalized recommendations about what to do next.",
] as const;

function ProSection() {
  return (
    <section className="mh-pro mh-section" aria-labelledby="pro-title">
      <div className="mh-pro-grid">
        <div className="mh-copy-block">
          <span className="mh-kicker">Offboard Pro</span>
          <h2 id="pro-title">Free remembers your search. Pro puts it to work.</h2>
          <p>Start free and build the foundation of your Career Context. When you want deeper intelligence, preparation, and personalized help, Offboard Pro uses that context to help you make better decisions and move faster.</p>
          <small>Don&apos;t pay just to keep your job search organized. Upgrade when you want Offboard to do more with everything it knows.</small>
        </div>
        <div className="mh-pro-cards" data-reveal="">
          <article className="mh-plan-card">
            <h3>Free</h3>
            <p className="mh-plan-price"><b>$0</b><small>forever</small></p>
            <ul>{FREE_FEATURES.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Start free</span><ArrowRight aria-hidden="true" /></a>
          </article>
          <article className="mh-plan-card is-emphasized">
            <h3>Pro</h3>
            <p className="mh-plan-price"><b>$20</b><small>/month</small></p>
            <ul>{PRO_FEATURES.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <SecondaryCta href="/pricing">See Pro pricing</SecondaryCta>
          </article>
        </div>
      </div>
    </section>
  );
}

const SPONSOR_AUDIENCES = [
  ["Employers", "Support people through layoffs of any size without requiring them to learn another outplacement portal."],
  ["Workforce and government", "Give residents personalized guidance and modern career tools alongside existing public programs."],
  ["Universities and communities", "Help members navigate career transitions with tools that stay useful beyond a single workshop or program."],
] as const;

function SponsoredAccess() {
  return (
    <section className="mh-sponsor mh-section" aria-labelledby="sponsor-title">
      <div className="mh-sponsor-inset" data-reveal="">
        <div className="mh-copy-block">
          <span className="mh-kicker is-ondark">Sponsored access</span>
          <h2 id="sponsor-title">Job-search support people will actually use.</h2>
          <p>Offboard can be sponsored by employers, workforce organizations, universities, and community partners so people navigating job loss can use the same system in Offboard or from the AI tools already part of their workflow.</p>
          <Link className="mh-ondark-cta" href="/employers"><span>Sponsor Offboard</span><ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="mh-sponsor-audiences">
          {SPONSOR_AUDIENCES.map(([title, body]) => (
            <div key={title}><h3>{title}</h3><p>{body}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltAroundYou() {
  return (
    <section className="mh-belong mh-section" aria-labelledby="belong-title">
      <figure className="mh-photo-frame mh-belong-photo">
        <Image src="/marketing/homepage/raw/final-cta-portrait.webp" alt="A woman outdoors, looking ahead" fill sizes="(max-width: 900px) 100vw, 32vw" />
      </figure>
      <div className="mh-copy-block">
        <span className="mh-kicker">Built around you</span>
        <h2 id="belong-title">Your career context should belong to you.</h2>
        <p>Your professional history shouldn&apos;t be trapped inside a single resume, recruiting site, or AI conversation. Offboard is building a portable Career Context that can grow with you across jobs, searches, career changes, and the AI tools you choose to use.</p>
        <p className="mh-belong-affirm">Your experience. Your progress. Your context. Available when you need it.</p>
        <a className="mh-primary-cta" href={SIGN_UP_URL}><span>Create my Career Context</span><ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function FinalCtaV2() {
  return (
    <section className="mh-final2 mh-section" aria-labelledby="final2-title">
      <h2 id="final2-title">You don&apos;t need another place to start over.</h2>
      <p>Build one Career Context. Keep your job search organized. Get help with what comes next. Use Offboard directly or bring it into the AI tools you already use.</p>
      <a className="mh-lumo-cta" href={SIGN_UP_URL}><span>Get started free</span><ArrowRight aria-hidden="true" /></a>
      <small>No credit card required.</small>
    </section>
  );
}

export default function MarketingHome() {
  return (
    <MarketingShell current="home">
      <main id="main-content">
        <HomeHeroV2 />
        <WhereverYouWork />
        <CareerContextSection />
        <MoreThanAJobSearch />
        <MeetLumo />
        <ToolkitV2 />
        <ProSection />
        <SponsoredAccess />
        <BuiltAroundYou />
        <CommunityStrip />
        <FinalCtaV2 />
      </main>
    </MarketingShell>
  );
}
