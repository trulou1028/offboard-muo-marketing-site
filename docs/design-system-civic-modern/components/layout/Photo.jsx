import React from 'react';

/** Documentary photo, 20px radius, never bleeding to the page edge. Chips float on top. */
export function Photo({ src, alt = '', ratio = '4 / 3', chips = [], chipCorner = 'bottom-left', height, imgStyle, style, children }) {
  const [v, h] = chipCorner.split('-');
  return (
    <div style={{ position: 'relative', borderRadius: 'var(--radius-photo)', overflow: 'hidden', aspectRatio: height ? undefined : ratio, height, background: 'var(--paper-deep)', ...style }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', ...imgStyle }} />
      {chips.length ? (
        <div style={{
          position: 'absolute', [v]: 14, [h]: 14, display: 'flex', flexWrap: 'wrap', gap: 8,
          justifyContent: h === 'right' ? 'flex-end' : 'flex-start', maxWidth: 'calc(100% - 28px)',
        }}>{chips}</div>
      ) : null}
      {children}
    </div>
  );
}
