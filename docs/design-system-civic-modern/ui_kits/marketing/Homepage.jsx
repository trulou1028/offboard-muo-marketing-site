const { Section, Photo, Triptych, Chip, Button, Eyebrow, Icon,
  ChatExchange, YouBubble, AiReply, TrackerCard, QuestionBlock, InsetBlock, PlanCard,
  SiteHeader, SiteFooter } = window.OffboardDesignSystem_d4ec49;

const A = '../../assets';
const ICONS = A + '/icons';
const PHOTO = A + '/photo-hero-kitchen-table.png';
const LINKS = ['How it works', 'Career Context', 'Pricing', 'Sponsor Offboard'];

function Lead({ children, style }) {
  return <p style={{ font: '400 20px/1.45 var(--font-sans)', color: 'var(--body-muted)', maxWidth: '46ch', ...style }}>{children}</p>;
}
function Head({ children, size = 40, onDark, style }) {
  return <h2 style={{ font: `500 ${size}px/${size > 48 ? 1.02 : 1.1} var(--font-serif-display)`, letterSpacing: size > 48 ? '-0.02em' : '-0.015em', color: onDark ? 'var(--on-dark-heading)' : 'var(--ink)', margin: 0 }}>{children}</h2>;
}

function Hero() {
  return (
    <Section band="paper" style={{ paddingTop: 88, paddingBottom: 96 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow>Job search, benefits, and next steps</Eyebrow>
          <h1 style={{ marginTop: 20, font: '500 64px/1.02 var(--font-serif-display)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            The modern<br />unemployment<br />office.
          </h1>
          <Lead style={{ marginTop: 24 }}>
            Your job search, benefits, applications, career context, and next steps in one system, connected to the AI you already use.
          </Lead>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <Button variant="primary">Get started free</Button>
            <Button variant="secondary">See how it works</Button>
          </div>
          <p style={{ marginTop: 28, font: '400 14px/1.5 var(--font-sans)', color: 'var(--secondary)' }}>
            Join thousands of people building their next chapter with Offboard.
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <Photo src={PHOTO} ratio="4 / 3" chips={[<Chip key="c" dot="lumo">Benefits check · Done</Chip>]} chipCorner="top-left" />
          <ChatExchange style={{ position: 'absolute', right: -24, bottom: -36, width: 380 }}>
            <YouBubble>I think I'm going to apply to this. Add it to Offboard.</YouBubble>
            <AiReply highlight="Done." cards={<TrackerCard compact role="Product Designer" company="Tesserac" status="Saved" />}>
              I've added the role to your Offboard tracker and saved the company context.
            </AiReply>
          </ChatExchange>
        </div>
      </div>
    </Section>
  );
}

function WhereverYouWork() {
  return (
    <Section band="mist" compact style={{ paddingTop: 128 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow>Offboard, wherever you work</Eyebrow>
          <Head style={{ marginTop: 18 }}>Your job search goes wherever you do.</Head>
          <Lead style={{ marginTop: 20 }}>
            Offboard connects to the assistants you already use, so the tracker updates from wherever the conversation happens.
          </Lead>
        </div>
        <ChatExchange>
          <YouBubble>Move Tesserac to the interview stage.</YouBubble>
          <AiReply highlight="Done.">Tesserac is now in Interviewing.</AiReply>
        </ChatExchange>
      </div>
    </Section>
  );
}

const CONTEXT = [
  { icon: 'file-text', title: 'Experience', body: 'Roles, projects, and the work a resume leaves out.' },
  { icon: 'list-checks', title: 'Applications', body: 'Every role you saved, applied to, or heard back from.' },
  { icon: 'building-2', title: 'Companies', body: 'What you learned about each team, kept with the role.' },
  { icon: 'message-square', title: 'Interviews', body: 'Questions asked, answers given, what to prepare next.' },
];

function CareerContext() {
  return (
    <Section band="paper">
      <Eyebrow>Career context</Eyebrow>
      <Head style={{ marginTop: 18, maxWidth: '18ch' }}>One place that remembers your entire job search.</Head>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: 48 }}>
        {CONTEXT.map((c) => (
          <div key={c.title} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 'var(--radius-card)', padding: 24 }}>
            <Icon name={c.icon} size={20} color="var(--forest)" base={ICONS} />
            <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--ink)', marginTop: 20 }}>{c.title}</div>
            <p style={{ marginTop: 8, font: '400 14px/1.5 var(--font-sans)', color: 'var(--body-muted)' }}>{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MoreThanAJobSearch() {
  return (
    <Section band="sand">
      <Eyebrow tone="sand">More than a job search</Eyebrow>
      <Head style={{ marginTop: 18, maxWidth: '20ch' }}>Losing your job creates more than one problem.</Head>
      <Triptych height={280} style={{ marginTop: 48 }}>
        <Photo src={PHOTO} imgStyle={{ objectPosition: '4% 60%' }} chips={[<Chip key="a" dot="sage">Plan · Updated</Chip>]} />
        <Photo src={PHOTO} chips={[<Chip key="b" dot="lumo">Benefits check</Chip>]} />
        <Photo src={PHOTO} imgStyle={{ objectPosition: '98% 40%' }} chips={[<Chip key="c" dot="sage">Resume · 3 versions</Chip>]} />
      </Triptych>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32, marginTop: 56 }}>
        <QuestionBlock question="What do I do first?" feature="First steps" tone="sand">
          Filing, deadlines, and coverage, in the order they actually matter that week.
        </QuestionBlock>
        <QuestionBlock question="What support might I qualify for?" feature="Benefits and workforce programs" tone="sand">
          Navigate unemployment insurance, training programs, workforce resources, and other forms of support that may be available where you live.
        </QuestionBlock>
        <QuestionBlock question="Is this job worth my time?" feature="Fit and compensation" tone="sand">
          See how a role lines up with your experience, your pay range, and what you said you wanted.
        </QuestionBlock>
      </div>
    </Section>
  );
}

function MeetLumo() {
  const prompts = ['What should I focus on today?', 'Which applications need follow-up?', "Help me prepare for tomorrow's interview."];
  return (
    <Section band="forestDeep">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow tone="lumo">Meet Lumo</Eyebrow>
          <Head onDark style={{ marginTop: 18, maxWidth: '16ch' }}>An AI guide that already knows what you're working on.</Head>
          <p style={{ marginTop: 20, font: '400 18px/1.5 var(--font-sans)', color: 'var(--on-dark-muted)', maxWidth: '44ch' }}>
            Because Lumo works from your Career Context, you can ask about your search without explaining yourself from scratch.
          </p>
          <div style={{ marginTop: 32 }}><Button variant="ai">Ask Lumo</Button></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {prompts.map((p) => (
            <div key={p} style={{ border: '1px solid var(--on-dark-hairline)', borderRadius: 'var(--radius-inset)', padding: '18px 20px', font: '400 16px/1.4 var(--font-sans)', color: 'var(--on-dark-heading)' }}>{p}</div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const TOOLKIT = [
  { icon: 'search', title: 'Decide', items: ['Fit score', 'Pay range', 'Company context'] },
  { icon: 'file-text', title: 'Apply', items: ['Resume versions', 'Cover letters', 'One tracker'] },
  { icon: 'message-square', title: 'Interview', items: ['Question bank', 'Practice out loud', 'Follow-ups'] },
  { icon: 'list-checks', title: 'Organize', items: ['Deadlines', 'Benefits filings', 'Weekly plan'] },
];

function Toolkit() {
  return (
    <Section band="paper">
      <Eyebrow>Your job search toolkit</Eyebrow>
      <Head style={{ marginTop: 18, maxWidth: '24ch' }}>Everything you need when the next opportunity appears.</Head>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 32, marginTop: 48 }}>
        {TOOLKIT.map((t) => (
          <div key={t.title} style={{ borderTop: '1px solid var(--ink)', paddingTop: 20 }}>
            <Icon name={t.icon} size={20} color="var(--forest)" base={ICONS} />
            <div style={{ font: '500 22px/1.2 var(--font-serif-display)', color: 'var(--ink)', marginTop: 16 }}>{t.title}</div>
            <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {t.items.map((i) => <li key={i} style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--body-muted)' }}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Pro() {
  return (
    <Section band="paperDeep">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'center' }}>
        <div>
          <Eyebrow>Offboard Pro</Eyebrow>
          <Head style={{ marginTop: 18, maxWidth: '16ch' }}>Free remembers your search. Pro puts it to work.</Head>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <PlanCard name="Free" price="$0" tagline="Build your Career Context." iconBase={ICONS}
            features={['Application tracker', 'Benefits checklist', 'Career Context']}
            action={<Button variant="secondary">Get started free</Button>} />
          <PlanCard name="Pro" price="$19" cadence="/ month" emphasized tagline="Put it to work." iconBase={ICONS}
            features={['Everything in Free', 'Unlimited applications', 'Interview prep with Lumo']}
            action={<Button>See Pro pricing</Button>} />
        </div>
      </div>
    </Section>
  );
}

function SponsoredAccess() {
  return (
    <Section band="paper">
      <InsetBlock>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, alignItems: 'center' }}>
          <div>
            <Eyebrow tone="onDark">Sponsored access</Eyebrow>
            <Head onDark style={{ marginTop: 18, maxWidth: '18ch' }}>Job-search support people will actually use.</Head>
            <p style={{ marginTop: 18, font: '400 16px/1.55 var(--font-sans)', color: 'var(--on-dark-muted)', maxWidth: '52ch' }}>
              Employers, workforce boards, and universities can sponsor Offboard for the people they are responsible for. Usage reporting, no per-seat guesswork.
            </p>
            <div style={{ marginTop: 28 }}><Button variant="onDark">Sponsor Offboard</Button></div>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[['1,240', 'Members supported'], ['68%', 'Placed within 90 days'], ['4.6', 'Average weekly sessions']].map(([n, l]) => (
              <div key={l} style={{ border: '1px solid var(--on-dark-hairline)', borderRadius: 'var(--radius-inset)', padding: '14px 16px' }}>
                <div style={{ font: '500 26px/1 var(--font-serif-display)', color: 'var(--on-dark-heading)' }}>{n}</div>
                <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--on-dark-muted)', marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </InsetBlock>
    </Section>
  );
}

function BuiltAroundYou() {
  return (
    <Section band="mist">
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 56, alignItems: 'center' }}>
        <Photo src={PHOTO} ratio="4 / 5" imgStyle={{ objectPosition: '38% 25%' }} />
        <div>
          <Eyebrow>Built around you</Eyebrow>
          <Head style={{ marginTop: 18, maxWidth: '18ch' }}>Your career context should belong to you.</Head>
          <Lead style={{ marginTop: 20 }}>Your experience. Your progress. Your context. Available when you need it, and exportable whenever you want it.</Lead>
          <p style={{ marginTop: 24, font: '400 15px/1.6 var(--font-sans)', color: 'var(--body-muted)', maxWidth: '52ch' }}>
            Offboard is not a government agency and does not decide your benefits. It helps you understand what you may qualify for and keep track of what you filed.
          </p>
        </div>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section band="forestDeep" compact contentStyle={{ textAlign: 'center' }}>
      <h2 style={{ font: '500 56px/1.05 var(--font-serif-display)', letterSpacing: '-0.02em', color: 'var(--on-dark-heading)', margin: '0 auto', maxWidth: '18ch' }}>
        You don't need another place to start over.
      </h2>
      <div style={{ marginTop: 32 }}><Button variant="lumo">Get started free</Button></div>
      <p style={{ marginTop: 18, font: '400 14px/1.5 var(--font-sans)', color: 'var(--on-dark-muted)' }}>No credit card required.</p>
    </Section>
  );
}

function Homepage({ onNavigate, active }) {
  return (
    <div>
      <SiteHeader logo={A + '/logo-wordmark-dark.png'} links={LINKS} active={active} onNavigate={onNavigate} />
      <Hero />
      <WhereverYouWork />
      <CareerContext />
      <MoreThanAJobSearch />
      <MeetLumo />
      <Toolkit />
      <Pro />
      <SponsoredAccess />
      <BuiltAroundYou />
      <FinalCTA />
      <SiteFooter logo={A + '/logo-wordmark-light.png'} note="© 2026 Offboard. Not a government agency."
        columns={[{ title: 'Product', items: ['How it works', 'Career Context', 'Pricing'] },
                  { title: 'Support', items: ['Benefits guide', 'Help center', 'Contact'] },
                  { title: 'Company', items: ['About', 'Careers', 'Privacy'] }]} />
    </div>
  );
}

Object.assign(window, { Homepage, Lead, Head, LINKS, A, ICONS, PHOTO });
