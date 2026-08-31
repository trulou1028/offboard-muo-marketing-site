import React from 'react';

const cache = {};

/**
 * Lucide glyph, re-rendered to the Offboard spec: 1.5px stroke, 20px grid,
 * monochrome currentColor, never filled, never inside a colored disc.
 */
export function Icon({ name, size = 20, strokeWidth = 1.5, color = 'currentColor', base = '/assets/icons', style, ...rest }) {
  const [markup, setMarkup] = React.useState(cache[name] || null);
  React.useEffect(() => {
    let live = true;
    if (cache[name]) { setMarkup(cache[name]); return; }
    fetch(`${base}/${name}.svg`)
      .then(r => (r.ok ? r.text() : Promise.reject(r.status)))
      .then(t => {
        const inner = t.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
        cache[name] = inner;
        if (live) setMarkup(inner);
      })
      .catch(() => {});
    return () => { live = false; };
  }, [name, base]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: 'block', flex: 'none', ...style }}
      dangerouslySetInnerHTML={{ __html: markup || '' }}
      {...rest}
    />
  );
}
