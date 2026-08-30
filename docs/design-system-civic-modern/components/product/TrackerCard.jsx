import React from 'react';
import { Chip } from '../core/Chip.jsx';

function Meta({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--secondary)' }}>{label}</span>
      <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--ink)' }}>{value}</span>
    </div>
  );
}

/** White on Paper, 1px Line border, 16px radius, no shadow when flat in a grid. */
export function TrackerCard({ role, company, location, status, meta = [], compact = false, floating = false, style }) {
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 'var(--radius-tracker)',
      padding: compact ? 14 : 18, boxShadow: floating ? 'var(--shadow-float)' : 'none', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: 'var(--paper-deep)', flex: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          font: '600 14px/1 var(--font-sans)', color: 'var(--forest)',
        }}>{(company || '?').charAt(0)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '600 15px/1.3 var(--font-sans)', color: 'var(--ink)' }}>{role}</div>
          <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--secondary)', marginTop: 2 }}>
            {company}{location ? ` · ${location}` : ''}
          </div>
        </div>
        {status ? <Chip tone="status" dot="sage">{status}</Chip> : null}
      </div>
      {meta.length ? (
        <div style={{ display: 'flex', gap: 28, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          {meta.map((m) => <Meta key={m.label} label={m.label} value={m.value} />)}
        </div>
      ) : null}
    </div>
  );
}
