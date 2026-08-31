import React from 'react';

const bands = {
  paper:      { background: 'var(--paper)', color: 'var(--ink)' },
  paperDeep:  { background: 'var(--paper-deep)', color: 'var(--ink)' },
  mist:       { background: 'var(--mist)', color: 'var(--ink)' },
  sand:       { background: 'var(--sand)', color: 'var(--ink)' },
  forestDeep: { background: 'var(--forest-deep)', color: 'var(--on-dark-heading)' },
};

/** A full-width band with the standard container inside. */
export function Section({ band = 'paper', compact = false, children, style, contentStyle, ...rest }) {
  return (
    <section style={{
      ...bands[band],
      padding: `${compact ? 'var(--section-pad-y-compact)' : 'var(--section-pad-y)'} var(--container-gutter)`,
      ...style,
    }} {...rest}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', ...contentStyle }}>{children}</div>
    </section>
  );
}
