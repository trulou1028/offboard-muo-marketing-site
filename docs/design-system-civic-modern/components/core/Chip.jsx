import React from 'react';

/**
 * Translucent product chip floating on photography, or a Paper-deep status pill.
 * Names a real product action only.
 */
export function Chip({ children, tone = 'photo', dot, style }) {
  const photo = tone === 'photo';
  const dotColor = dot === 'lumo' ? 'var(--lumo)' : dot === 'sage' ? 'var(--sage)' : null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 'var(--radius-pill)',
      padding: photo ? '7px 12px' : '5px 10px',
      background: photo ? 'var(--chip-fill)' : 'var(--paper-deep)',
      color: photo ? 'var(--paper)' : 'var(--ink)',
      font: '600 12px/1 var(--font-sans)',
      backdropFilter: photo ? 'saturate(120%) blur(2px)' : undefined,
      ...style,
    }}>
      {dotColor ? <span style={{ width: 6, height: 6, borderRadius: 999, background: dotColor, flex: 'none' }} /> : null}
      {children}
    </span>
  );
}
