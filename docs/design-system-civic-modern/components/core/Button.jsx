import React from 'react';
import { LumoMark } from './LumoMark.jsx';

const base = {
  height: 'var(--control-height)', borderRadius: 'var(--radius-button)', padding: '0 20px',
  font: '600 15px/1 var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: 10,
  cursor: 'pointer', border: '1px solid transparent', textDecoration: 'none',
  transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
  whiteSpace: 'nowrap',
};

const variants = {
  primary:   { background: 'var(--forest)', color: 'var(--paper)' },
  secondary: { background: 'transparent', color: 'var(--ink)', borderColor: 'var(--line)' },
  ghost:     { background: 'transparent', color: 'var(--ink)', padding: '0 8px' },
  ai:        { background: 'var(--ink)', color: 'var(--paper)' },
  lumo:      { background: 'var(--lumo)', color: 'var(--ink)' },
  onDark:    { background: 'var(--paper)', color: 'var(--ink)' },
};

const hovers = {
  primary:   { background: 'var(--forest-deep)' },
  secondary: { borderColor: 'var(--ink)' },
  ghost:     { color: 'var(--forest)' },
  ai:        { background: '#1B2422' },
  lumo:      { background: '#A8E437' },
  onDark:    { background: '#FFFFFF' },
};

/**
 * 44px tall, 6px radius. One primary per section. No icons in buttons
 * except the Lumo dot on the AI variant.
 */
export function Button({ variant = 'primary', children, href, size = 'md', style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const s = {
    ...base,
    ...(size === 'sm' ? { height: 36, padding: '0 14px', fontSize: 14 } : null),
    ...variants[variant],
    ...(hover ? hovers[variant] : null),
    ...(down ? { transform: 'translateY(1px)' } : null),
    ...style,
  };
  return (
    <Tag
      href={href}
      style={s}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      {...rest}
    >
      {variant === 'ai' ? <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--lumo)' }} /> : null}
      {children}
    </Tag>
  );
}
