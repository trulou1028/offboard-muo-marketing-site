import React from 'react';

/** Forest deep footer. Columns of plain links, hairlines at 16% Paper. */
export function SiteFooter({ logo, columns = [], note, style }) {
  return (
    <footer style={{ background: 'var(--forest-deep)', color: 'var(--on-dark-muted)', padding: '64px var(--container-gutter) 40px', ...style }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(' + Math.max(columns.length, 1) + ', 1fr)', gap: 32 }}>
          <img src={logo} alt="Offboard" style={{ height: 24, width: 'auto' }} />
          {columns.map((c) => (
            <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ font: '600 var(--type-eyebrow-size)/1.2 var(--font-sans)', letterSpacing: 'var(--type-eyebrow-ls)', textTransform: 'uppercase', color: 'var(--on-dark-heading)' }}>{c.title}</div>
              {c.items.map((i) => (
                <a key={i} href="#" style={{ font: '400 14px/1.4 var(--font-sans)', color: 'var(--on-dark-muted)', textDecoration: 'none' }}>{i}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, paddingTop: 20, borderTop: '1px solid var(--on-dark-hairline)', font: '400 13px/1.5 var(--font-sans)', color: 'var(--on-dark-muted)' }}>{note}</div>
      </div>
    </footer>
  );
}
