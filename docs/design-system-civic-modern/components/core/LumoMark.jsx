import React from 'react';

/** The AI avatar. The only mark that sits on a Lumo-colored disc. */
export function LumoMark({ size = 24, style }) {
  return (
    <span
      style={{
        width: size, height: size, borderRadius: '999px', background: 'var(--lumo)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', ...style,
      }}
      aria-label="Lumo"
    >
      <span style={{
        width: Math.round(size * 0.34), height: Math.round(size * 0.34),
        border: '1.5px solid var(--ink)', borderRadius: '999px', boxSizing: 'border-box',
      }} />
    </span>
  );
}
