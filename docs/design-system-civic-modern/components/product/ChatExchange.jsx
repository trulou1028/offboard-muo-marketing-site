import React from 'react';
import { LumoMark } from '../core/LumoMark.jsx';

/** Right-aligned Paper deep bubble with one squared corner. No avatar. */
export function YouBubble({ children, style }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', ...style }}>
      <div style={{
        background: 'var(--paper-deep)', color: 'var(--ink)',
        borderRadius: '16px 16px 4px 16px', padding: '12px 16px',
        font: '400 15px/1.45 var(--font-sans)', maxWidth: '78%',
      }}>{children}</div>
    </div>
  );
}

/** No bubble. Plain Ink text with the Lumo avatar; the first action word gets the Lumo highlight. */
export function AiReply({ highlight, children, cards, style }) {
  return (
    <div style={{ display: 'flex', gap: 12, ...style }}>
      <LumoMark size={24} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '400 15px/1.5 var(--font-sans)', color: 'var(--ink)' }}>
          {highlight ? (
            <span style={{ background: 'var(--lumo)', padding: '1px 4px', borderRadius: 3 }}>{highlight}</span>
          ) : null}
          {highlight ? ' ' : null}
          {children}
        </div>
        {cards ? <div style={{ marginTop: 12 }}>{cards}</div> : null}
      </div>
    </div>
  );
}

/** The hero device on every jobseeker page: a floating card of turns over a photo or band. */
export function ChatExchange({ children, floating = true, width, style }) {
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 'var(--radius-card)', padding: 20,
      display: 'flex', flexDirection: 'column', gap: 16, width,
      boxShadow: floating ? 'var(--shadow-float)' : 'none',
      border: floating ? 'none' : '1px solid var(--line)',
      ...style,
    }}>{children}</div>
  );
}
