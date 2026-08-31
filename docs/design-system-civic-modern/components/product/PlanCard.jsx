import React from 'react';
import { Icon } from '../core/Icon.jsx';

/** Pricing card. Free is a plain hairline card; Pro earns the Forest border, nothing else changes. */
export function PlanCard({ name, price, cadence, tagline, features = [], emphasized = false, action, iconBase, style }) {
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 'var(--radius-card)', padding: 28,
      border: `1px solid ${emphasized ? 'var(--forest)' : 'var(--line)'}`,
      display: 'flex', flexDirection: 'column', gap: 18, ...style,
    }}>
      <div>
        <div style={{ font: '600 var(--type-eyebrow-size)/1.2 var(--font-sans)', letterSpacing: 'var(--type-eyebrow-ls)', textTransform: 'uppercase', color: 'var(--forest)' }}>{name}</div>
        <div style={{ font: 'var(--serif-weight) 34px/1.1 var(--font-serif-display)', color: 'var(--ink)', marginTop: 12 }}>
          {price}<span style={{ font: '400 15px/1 var(--font-sans)', color: 'var(--secondary)' }}>{cadence ? ` ${cadence}` : ''}</span>
        </div>
        {tagline ? <p style={{ marginTop: 8, font: '400 15px/1.5 var(--font-sans)', color: 'var(--body-muted)' }}>{tagline}</p> : null}
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((t) => (
          <li key={t} style={{ display: 'flex', gap: 10, font: '400 14px/1.5 var(--font-sans)', color: 'var(--body-muted)' }}>
            <Icon name="check" size={18} color="var(--forest)" base={iconBase} style={{ marginTop: 2 }} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {action ? <div style={{ marginTop: 'auto' }}>{action}</div> : null}
    </div>
  );
}
