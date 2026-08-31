const { Section, Button, Eyebrow, Icon, TrackerCard, SiteHeader, SiteFooter, Photo, Chip } = window.OffboardDesignSystem_d4ec49;

/** Sponsor page: the institutional dial. Forest full-bleed hero, then Paper the rest of the way. */
function SponsorPage({ onNavigate, active }) {
  const rows = [
    ['Members invited', '2,400', 'Seats provisioned this quarter'],
    ['Activated', '1,240', '52% of invitations'],
    ['Placed within 90 days', '68%', 'Self-reported at exit'],
    ['Median time to first application', '4 days', 'From activation'],
  ];
  return (
    <div>
      <SiteHeader onDark logo={window.A + '/logo-wordmark-light.png'} links={window.LINKS} active={active} onNavigate={onNavigate} />
      <Section band="forestDeep" compact>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Eyebrow tone="onDark">For employers, workforce boards, and universities</Eyebrow>
            <h1 style={{ marginTop: 20, font: '500 56px/1.04 var(--font-serif-display)', letterSpacing: '-0.02em', color: 'var(--on-dark-heading)', maxWidth: '15ch' }}>
              Offboarding support that outlasts the severance letter.
            </h1>
            <p style={{ marginTop: 22, font: '400 18px/1.5 var(--font-sans)', color: 'var(--on-dark-muted)', maxWidth: '46ch' }}>
              Sponsor Offboard for the people you are responsible for. One system for the search, the benefits, and everything in between.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              <Button variant="onDark">Talk to us</Button>
              <Button variant="ghost" style={{ color: 'var(--on-dark-heading)' }}>See a sample report</Button>
            </div>
          </div>
          <Photo src={window.PHOTO} ratio="4 / 3" chips={[<Chip key="s" dot="sage">Cohort · Spring 2026</Chip>]} />
        </div>
      </Section>
      <Section band="paper" compact>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 56 }}>
          <div>
            <Eyebrow>Reporting</Eyebrow>
            <h2 style={{ marginTop: 16, font: '500 34px/1.12 var(--font-serif-display)', letterSpacing: '-0.015em', color: 'var(--ink)' }}>Numbers you can take to a board meeting.</h2>
            <p style={{ marginTop: 16, font: '400 15px/1.6 var(--font-sans)', color: 'var(--body-muted)' }}>
              Aggregate only. Sponsors never see an individual's applications, messages, or context.
            </p>
          </div>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              {rows.map(([label, value, note]) => (
                <tr key={label} style={{ borderTop: '1px solid var(--line)' }}>
                  <td style={{ padding: '18px 0', font: '500 16px/1.3 var(--font-sans)', color: 'var(--ink)' }}>{label}</td>
                  <td style={{ padding: '18px 0', font: '500 26px/1 var(--font-serif-display)', color: 'var(--forest)', textAlign: 'right', width: 140 }}>{value}</td>
                  <td style={{ padding: '18px 0 18px 32px', font: '400 13px/1.4 var(--font-sans)', color: 'var(--secondary)', width: 240 }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section band="mist" compact>
        <Eyebrow>What members get</Eyebrow>
        <h2 style={{ marginTop: 16, font: '500 34px/1.12 var(--font-serif-display)', letterSpacing: '-0.015em', color: 'var(--ink)', maxWidth: '20ch' }}>The same product, paid for by you.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 40 }}>
          {[['wallet', 'Benefits and money', 'Unemployment insurance, health coverage, and a weekly plan.'],
            ['briefcase', 'The search', 'One tracker for every role, with fit and next steps.'],
            ['graduation-cap', 'Training routes', 'Workforce programs and reskilling options where they live.']].map(([icon, t, b]) => (
            <div key={t} style={{ background: 'var(--white)', border: '1px solid var(--mist-border)', borderRadius: 'var(--radius-card)', padding: 24 }}>
              <Icon name={icon} size={20} color="var(--forest)" base={window.ICONS} />
              <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--ink)', marginTop: 18 }}>{t}</div>
              <p style={{ marginTop: 8, font: '400 14px/1.5 var(--font-sans)', color: 'var(--body-muted)' }}>{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section band="paper" compact>
        <Eyebrow>Recent activity</Eyebrow>
        <h2 style={{ marginTop: 16, font: '500 34px/1.12 var(--font-serif-display)', letterSpacing: '-0.015em', color: 'var(--ink)' }}>What the product actually does.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 32 }}>
          <TrackerCard role="Product Designer" company="Tesserac" location="Remote, US" status="Interviewing" meta={[{ label: 'Fit', value: '82%' }, { label: 'Next', value: 'Panel, Thu' }]} />
          <TrackerCard role="Service Designer" company="Halden Health" location="Portland, OR" status="Applied" meta={[{ label: 'Fit', value: '74%' }, { label: 'Next', value: 'Follow up Mon' }]} />
        </div>
      </Section>
      <Section band="forestDeep" compact contentStyle={{ textAlign: 'center' }}>
        <h2 style={{ font: '500 44px/1.08 var(--font-serif-display)', letterSpacing: '-0.02em', color: 'var(--on-dark-heading)', margin: '0 auto', maxWidth: '20ch' }}>
          Give people something that keeps working after the last day.
        </h2>
        <div style={{ marginTop: 30 }}><Button variant="onDark">Sponsor Offboard</Button></div>
      </Section>
      <SiteFooter logo={window.A + '/logo-wordmark-light.png'} note="© 2026 Offboard. Not a government agency."
        columns={[{ title: 'Product', items: ['How it works', 'Career Context', 'Pricing'] },
                  { title: 'Sponsors', items: ['Overview', 'Reporting', 'Security'] },
                  { title: 'Company', items: ['About', 'Careers', 'Privacy'] }]} />
    </div>
  );
}
window.SponsorPage = SponsorPage;
