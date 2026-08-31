import React from 'react';

/** Narrow, wide, narrow: 250px sides, fluid center, 16px gaps, one shared height. */
export function Triptych({ children, height = 320, side = 250, style }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `${side}px minmax(0,1fr) ${side}px`,
      gap: 'var(--grid-gap)', alignItems: 'stretch', ...style,
    }}>
      {React.Children.map(children, (c) => (
        <div style={{ height }}>{React.isValidElement(c) ? React.cloneElement(c, { height }) : c}</div>
      ))}
    </div>
  );
}
