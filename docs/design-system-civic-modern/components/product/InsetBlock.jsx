import React from 'react';

/** The Forest block: institutional emphasis without a third dark band. Inset on Paper, never full-bleed. */
export function InsetBlock({ children, style, contentStyle }) {
  return (
    <div style={{
      background: 'var(--forest)', color: 'var(--on-dark-heading)',
      borderRadius: 'var(--radius-card)', padding: '56px 48px', ...style,
    }}>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
