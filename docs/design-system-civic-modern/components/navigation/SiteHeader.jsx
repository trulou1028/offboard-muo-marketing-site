import React from 'react';
import { Button } from '../core/Button.jsx';

/** The site's top bar. Paper ground, hairline underneath, wordmark left. */
export function SiteHeader({ logo, links = [], onDark = false, onNavigate, active, style }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 32,
      padding: '18px var(--container-gutter)',
      borderBottom: `1px solid ${onDark ? 'var(--on-dark-hairline)' : 'var(--line)'}`,
      background: onDark ? 'var(--forest-deep)' : 'var(--paper)',
      ...style,
    }}>
      <img src={logo} alt="Offboard" style={{ height: 22, width: 'auto' }} />
      <nav style={{ display: 'flex', gap: 26, marginRight: 'auto' }}>
        {links.map((l) => (
          <a key={l} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(l); }}
            style={{
              font: '500 14px/1 var(--font-sans)', textDecoration: 'none',
              color: active === l ? (onDark ? 'var(--paper)' : 'var(--forest)') : (onDark ? 'var(--on-dark-muted)' : 'var(--body-muted)'),
            }}>{l}</a>
        ))}
      </nav>
      <a href="#" style={{ font: '500 14px/1 var(--font-sans)', textDecoration: 'none', color: onDark ? 'var(--on-dark-muted)' : 'var(--body-muted)' }}>Sign in</a>
      <Button size="sm" variant={onDark ? 'onDark' : 'primary'}>Get started free</Button>
    </header>
  );
}
