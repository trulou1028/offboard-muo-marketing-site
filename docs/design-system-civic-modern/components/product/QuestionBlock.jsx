import React from 'react';
import { Eyebrow } from '../core/Eyebrow.jsx';

/** Section 4 pattern: an Ink hairline, the question in the serif, the feature name demoted to an eyebrow, the answer in Inter. No icons, no cards. */
export function QuestionBlock({ question, feature, children, tone = 'forest', style }) {
  return (
    <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 20, ...style }}>
      <h3 style={{ font: 'var(--serif-weight) var(--type-question-size)/var(--type-question-lh) var(--font-serif-display)', color: 'var(--ink)', margin: 0 }}>{question}</h3>
      {feature ? <Eyebrow tone={tone} style={{ marginTop: 12 }}>{feature}</Eyebrow> : null}
      <p style={{ marginTop: 10, font: '400 15px/1.55 var(--font-sans)', color: 'var(--body-muted)', maxWidth: '46ch' }}>{children}</p>
    </div>
  );
}
