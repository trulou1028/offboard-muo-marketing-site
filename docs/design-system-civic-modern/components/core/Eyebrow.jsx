import React from 'react';

const tones = {
  forest: 'var(--forest)',
  sand: 'var(--sand-eyebrow)',
  lumo: 'var(--lumo)',
  onDark: 'var(--on-dark-muted)',
};

/** Inter 600 · 12 · 0.1em · uppercase. The only place Title/UPPER casing is allowed. */
export function Eyebrow({ tone = 'forest', children, style }) {
  return (
    <div style={{
      font: '600 var(--type-eyebrow-size)/1.2 var(--font-sans)',
      letterSpacing: 'var(--type-eyebrow-ls)', textTransform: 'uppercase',
      color: tones[tone], ...style,
    }}>{children}</div>
  );
}
