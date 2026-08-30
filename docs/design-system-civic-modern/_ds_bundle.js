/* @ds-bundle: {"format":4,"namespace":"OffboardDesignSystem_d4ec49","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"LumoMark","sourcePath":"components/core/LumoMark.jsx"},{"name":"Photo","sourcePath":"components/layout/Photo.jsx"},{"name":"Section","sourcePath":"components/layout/Section.jsx"},{"name":"Triptych","sourcePath":"components/layout/Triptych.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"YouBubble","sourcePath":"components/product/ChatExchange.jsx"},{"name":"AiReply","sourcePath":"components/product/ChatExchange.jsx"},{"name":"ChatExchange","sourcePath":"components/product/ChatExchange.jsx"},{"name":"InsetBlock","sourcePath":"components/product/InsetBlock.jsx"},{"name":"PlanCard","sourcePath":"components/product/PlanCard.jsx"},{"name":"QuestionBlock","sourcePath":"components/product/QuestionBlock.jsx"},{"name":"TrackerCard","sourcePath":"components/product/TrackerCard.jsx"}],"sourceHashes":{"components/core/Button.jsx":"8100b5e03775","components/core/Chip.jsx":"f5b84aaa8660","components/core/Eyebrow.jsx":"911585fbb1a9","components/core/Icon.jsx":"b2ac1a7870ac","components/core/LumoMark.jsx":"7a2861cbb9ee","components/layout/Photo.jsx":"7ba079307f81","components/layout/Section.jsx":"b81fc4f587bf","components/layout/Triptych.jsx":"dde9c5c03989","components/navigation/SiteFooter.jsx":"0e3f79b50f25","components/navigation/SiteHeader.jsx":"76ddd9930cf9","components/product/ChatExchange.jsx":"f3a9d2ffc7f1","components/product/InsetBlock.jsx":"f9a55b62b1ac","components/product/PlanCard.jsx":"e0d16f005444","components/product/QuestionBlock.jsx":"d23ddfd7e60a","components/product/TrackerCard.jsx":"ad1b0ea4b539","ui_kits/marketing/Homepage.jsx":"0feb40d410a0","ui_kits/marketing/Sponsor.jsx":"8082df43e18c","ui_kits/marketing/app.jsx":"735d6e55ba7d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OffboardDesignSystem_d4ec49 = window.OffboardDesignSystem_d4ec49 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Chip.jsx
try { (() => {
/**
 * Translucent product chip floating on photography, or a Paper-deep status pill.
 * Names a real product action only.
 */
function Chip({
  children,
  tone = 'photo',
  dot,
  style
}) {
  const photo = tone === 'photo';
  const dotColor = dot === 'lumo' ? 'var(--lumo)' : dot === 'sage' ? 'var(--sage)' : null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderRadius: 'var(--radius-pill)',
      padding: photo ? '7px 12px' : '5px 10px',
      background: photo ? 'var(--chip-fill)' : 'var(--paper-deep)',
      color: photo ? 'var(--paper)' : 'var(--ink)',
      font: '600 12px/1 var(--font-sans)',
      backdropFilter: photo ? 'saturate(120%) blur(2px)' : undefined,
      ...style
    }
  }, dotColor ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: dotColor,
      flex: 'none'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
const tones = {
  forest: 'var(--forest)',
  sand: 'var(--sand-eyebrow)',
  lumo: 'var(--lumo)',
  onDark: 'var(--on-dark-muted)'
};

/** Inter 600 · 12 · 0.1em · uppercase. The only place Title/UPPER casing is allowed. */
function Eyebrow({
  tone = 'forest',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 var(--type-eyebrow-size)/1.2 var(--font-sans)',
      letterSpacing: 'var(--type-eyebrow-ls)',
      textTransform: 'uppercase',
      color: tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const cache = {};

/**
 * Lucide glyph, re-rendered to the Offboard spec: 1.5px stroke, 20px grid,
 * monochrome currentColor, never filled, never inside a colored disc.
 */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = 'currentColor',
  base = '/assets/icons',
  style,
  ...rest
}) {
  const [markup, setMarkup] = React.useState(cache[name] || null);
  React.useEffect(() => {
    let live = true;
    if (cache[name]) {
      setMarkup(cache[name]);
      return;
    }
    fetch(`${base}/${name}.svg`).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(t => {
      const inner = t.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '');
      cache[name] = inner;
      if (live) setMarkup(inner);
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [name, base]);
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: markup || ''
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/LumoMark.jsx
try { (() => {
/** The AI avatar. The only mark that sits on a Lumo-colored disc. */
function LumoMark({
  size = 24,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '999px',
      background: 'var(--lumo)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      ...style
    },
    "aria-label": "Lumo"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: Math.round(size * 0.34),
      height: Math.round(size * 0.34),
      border: '1.5px solid var(--ink)',
      borderRadius: '999px',
      boxSizing: 'border-box'
    }
  }));
}
Object.assign(__ds_scope, { LumoMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LumoMark.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  height: 'var(--control-height)',
  borderRadius: 'var(--radius-button)',
  padding: '0 20px',
  font: '600 15px/1 var(--font-sans)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  border: '1px solid transparent',
  textDecoration: 'none',
  transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
  whiteSpace: 'nowrap'
};
const variants = {
  primary: {
    background: 'var(--forest)',
    color: 'var(--paper)'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--ink)',
    borderColor: 'var(--line)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--ink)',
    padding: '0 8px'
  },
  ai: {
    background: 'var(--ink)',
    color: 'var(--paper)'
  },
  lumo: {
    background: 'var(--lumo)',
    color: 'var(--ink)'
  },
  onDark: {
    background: 'var(--paper)',
    color: 'var(--ink)'
  }
};
const hovers = {
  primary: {
    background: 'var(--forest-deep)'
  },
  secondary: {
    borderColor: 'var(--ink)'
  },
  ghost: {
    color: 'var(--forest)'
  },
  ai: {
    background: '#1B2422'
  },
  lumo: {
    background: '#A8E437'
  },
  onDark: {
    background: '#FFFFFF'
  }
};

/**
 * 44px tall, 6px radius. One primary per section. No icons in buttons
 * except the Lumo dot on the AI variant.
 */
function Button({
  variant = 'primary',
  children,
  href,
  size = 'md',
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  const s = {
    ...base,
    ...(size === 'sm' ? {
      height: 36,
      padding: '0 14px',
      fontSize: 14
    } : null),
    ...variants[variant],
    ...(hover ? hovers[variant] : null),
    ...(down ? {
      transform: 'translateY(1px)'
    } : null),
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false)
  }, rest), variant === 'ai' ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--lumo)'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/layout/Photo.jsx
try { (() => {
/** Documentary photo, 20px radius, never bleeding to the page edge. Chips float on top. */
function Photo({
  src,
  alt = '',
  ratio = '4 / 3',
  chips = [],
  chipCorner = 'bottom-left',
  height,
  imgStyle,
  style,
  children
}) {
  const [v, h] = chipCorner.split('-');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-photo)',
      overflow: 'hidden',
      aspectRatio: height ? undefined : ratio,
      height,
      background: 'var(--paper-deep)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      ...imgStyle
    }
  }), chips.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      [v]: 14,
      [h]: 14,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: h === 'right' ? 'flex-end' : 'flex-start',
      maxWidth: 'calc(100% - 28px)'
    }
  }, chips) : null, children);
}
Object.assign(__ds_scope, { Photo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Photo.jsx", error: String((e && e.message) || e) }); }

// components/layout/Section.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const bands = {
  paper: {
    background: 'var(--paper)',
    color: 'var(--ink)'
  },
  paperDeep: {
    background: 'var(--paper-deep)',
    color: 'var(--ink)'
  },
  mist: {
    background: 'var(--mist)',
    color: 'var(--ink)'
  },
  sand: {
    background: 'var(--sand)',
    color: 'var(--ink)'
  },
  forestDeep: {
    background: 'var(--forest-deep)',
    color: 'var(--on-dark-heading)'
  }
};

/** A full-width band with the standard container inside. */
function Section({
  band = 'paper',
  compact = false,
  children,
  style,
  contentStyle,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      ...bands[band],
      padding: `${compact ? 'var(--section-pad-y-compact)' : 'var(--section-pad-y)'} var(--container-gutter)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      ...contentStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Section.jsx", error: String((e && e.message) || e) }); }

// components/layout/Triptych.jsx
try { (() => {
/** Narrow, wide, narrow: 250px sides, fluid center, 16px gaps, one shared height. */
function Triptych({
  children,
  height = 320,
  side = 250,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `${side}px minmax(0,1fr) ${side}px`,
      gap: 'var(--grid-gap)',
      alignItems: 'stretch',
      ...style
    }
  }, React.Children.map(children, c => /*#__PURE__*/React.createElement("div", {
    style: {
      height
    }
  }, React.isValidElement(c) ? React.cloneElement(c, {
    height
  }) : c)));
}
Object.assign(__ds_scope, { Triptych });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Triptych.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
/** Forest deep footer. Columns of plain links, hairlines at 16% Paper. */
function SiteFooter({
  logo,
  columns = [],
  note,
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--forest-deep)',
      color: 'var(--on-dark-muted)',
      padding: '64px var(--container-gutter) 40px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr repeat(' + Math.max(columns.length, 1) + ', 1fr)',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Offboard",
    style: {
      height: 24,
      width: 'auto'
    }
  }), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 var(--type-eyebrow-size)/1.2 var(--font-sans)',
      letterSpacing: 'var(--type-eyebrow-ls)',
      textTransform: 'uppercase',
      color: 'var(--on-dark-heading)'
    }
  }, c.title), c.items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      font: '400 14px/1.4 var(--font-sans)',
      color: 'var(--on-dark-muted)',
      textDecoration: 'none'
    }
  }, i))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      paddingTop: 20,
      borderTop: '1px solid var(--on-dark-hairline)',
      font: '400 13px/1.5 var(--font-sans)',
      color: 'var(--on-dark-muted)'
    }
  }, note)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
/** The site's top bar. Paper ground, hairline underneath, wordmark left. */
function SiteHeader({
  logo,
  links = [],
  onDark = false,
  onNavigate,
  active,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '18px var(--container-gutter)',
      borderBottom: `1px solid ${onDark ? 'var(--on-dark-hairline)' : 'var(--line)'}`,
      background: onDark ? 'var(--forest-deep)' : 'var(--paper)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: "Offboard",
    style: {
      height: 22,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26,
      marginRight: 'auto'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(l);
    },
    style: {
      font: '500 14px/1 var(--font-sans)',
      textDecoration: 'none',
      color: active === l ? onDark ? 'var(--paper)' : 'var(--forest)' : onDark ? 'var(--on-dark-muted)' : 'var(--body-muted)'
    }
  }, l))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: '500 14px/1 var(--font-sans)',
      textDecoration: 'none',
      color: onDark ? 'var(--on-dark-muted)' : 'var(--body-muted)'
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: onDark ? 'onDark' : 'primary'
  }, "Get started free"));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/product/ChatExchange.jsx
try { (() => {
/** Right-aligned Paper deep bubble with one squared corner. No avatar. */
function YouBubble({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper-deep)',
      color: 'var(--ink)',
      borderRadius: '16px 16px 4px 16px',
      padding: '12px 16px',
      font: '400 15px/1.45 var(--font-sans)',
      maxWidth: '78%'
    }
  }, children));
}

/** No bubble. Plain Ink text with the Lumo avatar; the first action word gets the Lumo highlight. */
function AiReply({
  highlight,
  children,
  cards,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LumoMark, {
    size: 24
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 15px/1.5 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, highlight ? /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--lumo)',
      padding: '1px 4px',
      borderRadius: 3
    }
  }, highlight) : null, highlight ? ' ' : null, children), cards ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, cards) : null));
}

/** The hero device on every jobseeker page: a floating card of turns over a photo or band. */
function ChatExchange({
  children,
  floating = true,
  width,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--white)',
      borderRadius: 'var(--radius-card)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      width,
      boxShadow: floating ? 'var(--shadow-float)' : 'none',
      border: floating ? 'none' : '1px solid var(--line)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { YouBubble, AiReply, ChatExchange });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ChatExchange.jsx", error: String((e && e.message) || e) }); }

// components/product/InsetBlock.jsx
try { (() => {
/** The Forest block: institutional emphasis without a third dark band. Inset on Paper, never full-bleed. */
function InsetBlock({
  children,
  style,
  contentStyle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--forest)',
      color: 'var(--on-dark-heading)',
      borderRadius: 'var(--radius-card)',
      padding: '56px 48px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: contentStyle
  }, children));
}
Object.assign(__ds_scope, { InsetBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/InsetBlock.jsx", error: String((e && e.message) || e) }); }

// components/product/PlanCard.jsx
try { (() => {
/** Pricing card. Free is a plain hairline card; Pro earns the Forest border, nothing else changes. */
function PlanCard({
  name,
  price,
  cadence,
  tagline,
  features = [],
  emphasized = false,
  action,
  iconBase,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--white)',
      borderRadius: 'var(--radius-card)',
      padding: 28,
      border: `1px solid ${emphasized ? 'var(--forest)' : 'var(--line)'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 var(--type-eyebrow-size)/1.2 var(--font-sans)',
      letterSpacing: 'var(--type-eyebrow-ls)',
      textTransform: 'uppercase',
      color: 'var(--forest)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--serif-weight) 34px/1.1 var(--font-serif-display)',
      color: 'var(--ink)',
      marginTop: 12
    }
  }, price, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 15px/1 var(--font-sans)',
      color: 'var(--secondary)'
    }
  }, cadence ? ` ${cadence}` : '')), tagline ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      font: '400 15px/1.5 var(--font-sans)',
      color: 'var(--body-muted)'
    }
  }, tagline) : null), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, features.map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--body-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 18,
    color: "var(--forest)",
    base: iconBase,
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, t)))), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, action) : null);
}
Object.assign(__ds_scope, { PlanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PlanCard.jsx", error: String((e && e.message) || e) }); }

// components/product/QuestionBlock.jsx
try { (() => {
/** Section 4 pattern: an Ink hairline, the question in the serif, the feature name demoted to an eyebrow, the answer in Inter. No icons, no cards. */
function QuestionBlock({
  question,
  feature,
  children,
  tone = 'forest',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--ink)',
      paddingTop: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--serif-weight) var(--type-question-size)/var(--type-question-lh) var(--font-serif-display)',
      color: 'var(--ink)',
      margin: 0
    }
  }, question), feature ? /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: tone,
    style: {
      marginTop: 12
    }
  }, feature) : null, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      font: '400 15px/1.55 var(--font-sans)',
      color: 'var(--body-muted)',
      maxWidth: '46ch'
    }
  }, children));
}
Object.assign(__ds_scope, { QuestionBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/QuestionBlock.jsx", error: String((e && e.message) || e) }); }

// components/product/TrackerCard.jsx
try { (() => {
function Meta({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 10px/1 var(--font-sans)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px/1 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, value));
}

/** White on Paper, 1px Line border, 16px radius, no shadow when flat in a grid. */
function TrackerCard({
  role,
  company,
  location,
  status,
  meta = [],
  compact = false,
  floating = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--white)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-tracker)',
      padding: compact ? 14 : 18,
      boxShadow: floating ? 'var(--shadow-float)' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--paper-deep)',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '600 14px/1 var(--font-sans)',
      color: 'var(--forest)'
    }
  }, (company || '?').charAt(0)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 15px/1.3 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, role), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 13px/1.4 var(--font-sans)',
      color: 'var(--secondary)',
      marginTop: 2
    }
  }, company, location ? ` · ${location}` : '')), status ? /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    tone: "status",
    dot: "sage"
  }, status) : null), meta.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 16,
      paddingTop: 14,
      borderTop: '1px solid var(--line)'
    }
  }, meta.map(m => /*#__PURE__*/React.createElement(Meta, {
    key: m.label,
    label: m.label,
    value: m.value
  }))) : null);
}
Object.assign(__ds_scope, { TrackerCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/TrackerCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Homepage.jsx
try { (() => {
const {
  Section,
  Photo,
  Triptych,
  Chip,
  Button,
  Eyebrow,
  Icon,
  ChatExchange,
  YouBubble,
  AiReply,
  TrackerCard,
  QuestionBlock,
  InsetBlock,
  PlanCard,
  SiteHeader,
  SiteFooter
} = window.OffboardDesignSystem_d4ec49;
const A = '../../assets';
const ICONS = A + '/icons';
const PHOTO = A + '/photo-hero-kitchen-table.png';
const LINKS = ['How it works', 'Career Context', 'Pricing', 'Sponsor Offboard'];
function Lead({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 20px/1.45 var(--font-sans)',
      color: 'var(--body-muted)',
      maxWidth: '46ch',
      ...style
    }
  }, children);
}
function Head({
  children,
  size = 40,
  onDark,
  style
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      font: `500 ${size}px/${size > 48 ? 1.02 : 1.1} var(--font-serif-display)`,
      letterSpacing: size > 48 ? '-0.02em' : '-0.015em',
      color: onDark ? 'var(--on-dark-heading)' : 'var(--ink)',
      margin: 0
    }
  }, children);
}
function Hero() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "paper",
    style: {
      paddingTop: 88,
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Job search, benefits, and next steps"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 20,
      font: '500 64px/1.02 var(--font-serif-display)',
      letterSpacing: '-0.02em',
      color: 'var(--ink)'
    }
  }, "The modern", /*#__PURE__*/React.createElement("br", null), "unemployment", /*#__PURE__*/React.createElement("br", null), "office."), /*#__PURE__*/React.createElement(Lead, {
    style: {
      marginTop: 24
    }
  }, "Your job search, benefits, applications, career context, and next steps in one system, connected to the AI you already use."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Get started free"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "See how it works")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 28,
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--secondary)'
    }
  }, "Join thousands of people building their next chapter with Offboard.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: PHOTO,
    ratio: "4 / 3",
    chips: [/*#__PURE__*/React.createElement(Chip, {
      key: "c",
      dot: "lumo"
    }, "Benefits check \xB7 Done")],
    chipCorner: "top-left"
  }), /*#__PURE__*/React.createElement(ChatExchange, {
    style: {
      position: 'absolute',
      right: -24,
      bottom: -36,
      width: 380
    }
  }, /*#__PURE__*/React.createElement(YouBubble, null, "I think I'm going to apply to this. Add it to Offboard."), /*#__PURE__*/React.createElement(AiReply, {
    highlight: "Done.",
    cards: /*#__PURE__*/React.createElement(TrackerCard, {
      compact: true,
      role: "Product Designer",
      company: "Tesserac",
      status: "Saved"
    })
  }, "I've added the role to your Offboard tracker and saved the company context.")))));
}
function WhereverYouWork() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "mist",
    compact: true,
    style: {
      paddingTop: 128
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Offboard, wherever you work"), /*#__PURE__*/React.createElement(Head, {
    style: {
      marginTop: 18
    }
  }, "Your job search goes wherever you do."), /*#__PURE__*/React.createElement(Lead, {
    style: {
      marginTop: 20
    }
  }, "Offboard connects to the assistants you already use, so the tracker updates from wherever the conversation happens.")), /*#__PURE__*/React.createElement(ChatExchange, null, /*#__PURE__*/React.createElement(YouBubble, null, "Move Tesserac to the interview stage."), /*#__PURE__*/React.createElement(AiReply, {
    highlight: "Done."
  }, "Tesserac is now in Interviewing."))));
}
const CONTEXT = [{
  icon: 'file-text',
  title: 'Experience',
  body: 'Roles, projects, and the work a resume leaves out.'
}, {
  icon: 'list-checks',
  title: 'Applications',
  body: 'Every role you saved, applied to, or heard back from.'
}, {
  icon: 'building-2',
  title: 'Companies',
  body: 'What you learned about each team, kept with the role.'
}, {
  icon: 'message-square',
  title: 'Interviews',
  body: 'Questions asked, answers given, what to prepare next.'
}];
function CareerContext() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "paper"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Career context"), /*#__PURE__*/React.createElement(Head, {
    style: {
      marginTop: 18,
      maxWidth: '18ch'
    }
  }, "One place that remembers your entire job search."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginTop: 48
    }
  }, CONTEXT.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    style: {
      background: 'var(--white)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-card)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 20,
    color: "var(--forest)",
    base: ICONS
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 16px/1.3 var(--font-sans)',
      color: 'var(--ink)',
      marginTop: 20
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--body-muted)'
    }
  }, c.body)))));
}
function MoreThanAJobSearch() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "sand"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "sand"
  }, "More than a job search"), /*#__PURE__*/React.createElement(Head, {
    style: {
      marginTop: 18,
      maxWidth: '20ch'
    }
  }, "Losing your job creates more than one problem."), /*#__PURE__*/React.createElement(Triptych, {
    height: 280,
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: PHOTO,
    imgStyle: {
      objectPosition: '4% 60%'
    },
    chips: [/*#__PURE__*/React.createElement(Chip, {
      key: "a",
      dot: "sage"
    }, "Plan \xB7 Updated")]
  }), /*#__PURE__*/React.createElement(Photo, {
    src: PHOTO,
    chips: [/*#__PURE__*/React.createElement(Chip, {
      key: "b",
      dot: "lumo"
    }, "Benefits check")]
  }), /*#__PURE__*/React.createElement(Photo, {
    src: PHOTO,
    imgStyle: {
      objectPosition: '98% 40%'
    },
    chips: [/*#__PURE__*/React.createElement(Chip, {
      key: "c",
      dot: "sage"
    }, "Resume \xB7 3 versions")]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 32,
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(QuestionBlock, {
    question: "What do I do first?",
    feature: "First steps",
    tone: "sand"
  }, "Filing, deadlines, and coverage, in the order they actually matter that week."), /*#__PURE__*/React.createElement(QuestionBlock, {
    question: "What support might I qualify for?",
    feature: "Benefits and workforce programs",
    tone: "sand"
  }, "Navigate unemployment insurance, training programs, workforce resources, and other forms of support that may be available where you live."), /*#__PURE__*/React.createElement(QuestionBlock, {
    question: "Is this job worth my time?",
    feature: "Fit and compensation",
    tone: "sand"
  }, "See how a role lines up with your experience, your pay range, and what you said you wanted.")));
}
function MeetLumo() {
  const prompts = ['What should I focus on today?', 'Which applications need follow-up?', "Help me prepare for tomorrow's interview."];
  return /*#__PURE__*/React.createElement(Section, {
    band: "forestDeep"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "lumo"
  }, "Meet Lumo"), /*#__PURE__*/React.createElement(Head, {
    onDark: true,
    style: {
      marginTop: 18,
      maxWidth: '16ch'
    }
  }, "An AI guide that already knows what you're working on."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      font: '400 18px/1.5 var(--font-sans)',
      color: 'var(--on-dark-muted)',
      maxWidth: '44ch'
    }
  }, "Because Lumo works from your Career Context, you can ask about your search without explaining yourself from scratch."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ai"
  }, "Ask Lumo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, prompts.map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    style: {
      border: '1px solid var(--on-dark-hairline)',
      borderRadius: 'var(--radius-inset)',
      padding: '18px 20px',
      font: '400 16px/1.4 var(--font-sans)',
      color: 'var(--on-dark-heading)'
    }
  }, p)))));
}
const TOOLKIT = [{
  icon: 'search',
  title: 'Decide',
  items: ['Fit score', 'Pay range', 'Company context']
}, {
  icon: 'file-text',
  title: 'Apply',
  items: ['Resume versions', 'Cover letters', 'One tracker']
}, {
  icon: 'message-square',
  title: 'Interview',
  items: ['Question bank', 'Practice out loud', 'Follow-ups']
}, {
  icon: 'list-checks',
  title: 'Organize',
  items: ['Deadlines', 'Benefits filings', 'Weekly plan']
}];
function Toolkit() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "paper"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Your job search toolkit"), /*#__PURE__*/React.createElement(Head, {
    style: {
      marginTop: 18,
      maxWidth: '24ch'
    }
  }, "Everything you need when the next opportunity appears."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 32,
      marginTop: 48
    }
  }, TOOLKIT.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.title,
    style: {
      borderTop: '1px solid var(--ink)',
      paddingTop: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 20,
    color: "var(--forest)",
    base: ICONS
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 22px/1.2 var(--font-serif-display)',
      color: 'var(--ink)',
      marginTop: 16
    }
  }, t.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '14px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, t.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--body-muted)'
    }
  }, i)))))));
}
function Pro() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "paperDeep"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Offboard Pro"), /*#__PURE__*/React.createElement(Head, {
    style: {
      marginTop: 18,
      maxWidth: '16ch'
    }
  }, "Free remembers your search. Pro puts it to work.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PlanCard, {
    name: "Free",
    price: "$0",
    tagline: "Build your Career Context.",
    iconBase: ICONS,
    features: ['Application tracker', 'Benefits checklist', 'Career Context'],
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Get started free")
  }), /*#__PURE__*/React.createElement(PlanCard, {
    name: "Pro",
    price: "$19",
    cadence: "/ month",
    emphasized: true,
    tagline: "Put it to work.",
    iconBase: ICONS,
    features: ['Everything in Free', 'Unlimited applications', 'Interview prep with Lumo'],
    action: /*#__PURE__*/React.createElement(Button, null, "See Pro pricing")
  }))));
}
function SponsoredAccess() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "paper"
  }, /*#__PURE__*/React.createElement(InsetBlock, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, "Sponsored access"), /*#__PURE__*/React.createElement(Head, {
    onDark: true,
    style: {
      marginTop: 18,
      maxWidth: '18ch'
    }
  }, "Job-search support people will actually use."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      font: '400 16px/1.55 var(--font-sans)',
      color: 'var(--on-dark-muted)',
      maxWidth: '52ch'
    }
  }, "Employers, workforce boards, and universities can sponsor Offboard for the people they are responsible for. Usage reporting, no per-seat guesswork."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark"
  }, "Sponsor Offboard"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, [['1,240', 'Members supported'], ['68%', 'Placed within 90 days'], ['4.6', 'Average weekly sessions']].map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      border: '1px solid var(--on-dark-hairline)',
      borderRadius: 'var(--radius-inset)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 26px/1 var(--font-serif-display)',
      color: 'var(--on-dark-heading)'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 10px/1 var(--font-sans)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--on-dark-muted)',
      marginTop: 8
    }
  }, l)))))));
}
function BuiltAroundYou() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "mist"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '380px 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    src: PHOTO,
    ratio: "4 / 5",
    imgStyle: {
      objectPosition: '38% 25%'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Built around you"), /*#__PURE__*/React.createElement(Head, {
    style: {
      marginTop: 18,
      maxWidth: '18ch'
    }
  }, "Your career context should belong to you."), /*#__PURE__*/React.createElement(Lead, {
    style: {
      marginTop: 20
    }
  }, "Your experience. Your progress. Your context. Available when you need it, and exportable whenever you want it."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24,
      font: '400 15px/1.6 var(--font-sans)',
      color: 'var(--body-muted)',
      maxWidth: '52ch'
    }
  }, "Offboard is not a government agency and does not decide your benefits. It helps you understand what you may qualify for and keep track of what you filed."))));
}
function FinalCTA() {
  return /*#__PURE__*/React.createElement(Section, {
    band: "forestDeep",
    compact: true,
    contentStyle: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '500 56px/1.05 var(--font-serif-display)',
      letterSpacing: '-0.02em',
      color: 'var(--on-dark-heading)',
      margin: '0 auto',
      maxWidth: '18ch'
    }
  }, "You don't need another place to start over."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "lumo"
  }, "Get started free")), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--on-dark-muted)'
    }
  }, "No credit card required."));
}
function Homepage({
  onNavigate,
  active
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SiteHeader, {
    logo: A + '/logo-wordmark-dark.png',
    links: LINKS,
    active: active,
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(WhereverYouWork, null), /*#__PURE__*/React.createElement(CareerContext, null), /*#__PURE__*/React.createElement(MoreThanAJobSearch, null), /*#__PURE__*/React.createElement(MeetLumo, null), /*#__PURE__*/React.createElement(Toolkit, null), /*#__PURE__*/React.createElement(Pro, null), /*#__PURE__*/React.createElement(SponsoredAccess, null), /*#__PURE__*/React.createElement(BuiltAroundYou, null), /*#__PURE__*/React.createElement(FinalCTA, null), /*#__PURE__*/React.createElement(SiteFooter, {
    logo: A + '/logo-wordmark-light.png',
    note: "\xA9 2026 Offboard. Not a government agency.",
    columns: [{
      title: 'Product',
      items: ['How it works', 'Career Context', 'Pricing']
    }, {
      title: 'Support',
      items: ['Benefits guide', 'Help center', 'Contact']
    }, {
      title: 'Company',
      items: ['About', 'Careers', 'Privacy']
    }]
  }));
}
Object.assign(window, {
  Homepage,
  Lead,
  Head,
  LINKS,
  A,
  ICONS,
  PHOTO
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Homepage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Sponsor.jsx
try { (() => {
const {
  Section,
  Button,
  Eyebrow,
  Icon,
  TrackerCard,
  SiteHeader,
  SiteFooter,
  Photo,
  Chip
} = window.OffboardDesignSystem_d4ec49;

/** Sponsor page: the institutional dial. Forest full-bleed hero, then Paper the rest of the way. */
function SponsorPage({
  onNavigate,
  active
}) {
  const rows = [['Members invited', '2,400', 'Seats provisioned this quarter'], ['Activated', '1,240', '52% of invitations'], ['Placed within 90 days', '68%', 'Self-reported at exit'], ['Median time to first application', '4 days', 'From activation']];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SiteHeader, {
    onDark: true,
    logo: window.A + '/logo-wordmark-light.png',
    links: window.LINKS,
    active: active,
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(Section, {
    band: "forestDeep",
    compact: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onDark"
  }, "For employers, workforce boards, and universities"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 20,
      font: '500 56px/1.04 var(--font-serif-display)',
      letterSpacing: '-0.02em',
      color: 'var(--on-dark-heading)',
      maxWidth: '15ch'
    }
  }, "Offboarding support that outlasts the severance letter."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 22,
      font: '400 18px/1.5 var(--font-sans)',
      color: 'var(--on-dark-muted)',
      maxWidth: '46ch'
    }
  }, "Sponsor Offboard for the people you are responsible for. One system for the search, the benefits, and everything in between."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark"
  }, "Talk to us"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      color: 'var(--on-dark-heading)'
    }
  }, "See a sample report"))), /*#__PURE__*/React.createElement(Photo, {
    src: window.PHOTO,
    ratio: "4 / 3",
    chips: [/*#__PURE__*/React.createElement(Chip, {
      key: "s",
      dot: "sage"
    }, "Cohort \xB7 Spring 2026")]
  }))), /*#__PURE__*/React.createElement(Section, {
    band: "paper",
    compact: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Reporting"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16,
      font: '500 34px/1.12 var(--font-serif-display)',
      letterSpacing: '-0.015em',
      color: 'var(--ink)'
    }
  }, "Numbers you can take to a board meeting."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      font: '400 15px/1.6 var(--font-sans)',
      color: 'var(--body-muted)'
    }
  }, "Aggregate only. Sponsors never see an individual's applications, messages, or context.")), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map(([label, value, note]) => /*#__PURE__*/React.createElement("tr", {
    key: label,
    style: {
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '18px 0',
      font: '500 16px/1.3 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, label), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '18px 0',
      font: '500 26px/1 var(--font-serif-display)',
      color: 'var(--forest)',
      textAlign: 'right',
      width: 140
    }
  }, value), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '18px 0 18px 32px',
      font: '400 13px/1.4 var(--font-sans)',
      color: 'var(--secondary)',
      width: 240
    }
  }, note))))))), /*#__PURE__*/React.createElement(Section, {
    band: "mist",
    compact: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What members get"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16,
      font: '500 34px/1.12 var(--font-serif-display)',
      letterSpacing: '-0.015em',
      color: 'var(--ink)',
      maxWidth: '20ch'
    }
  }, "The same product, paid for by you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16,
      marginTop: 40
    }
  }, [['wallet', 'Benefits and money', 'Unemployment insurance, health coverage, and a weekly plan.'], ['briefcase', 'The search', 'One tracker for every role, with fit and next steps.'], ['graduation-cap', 'Training routes', 'Workforce programs and reskilling options where they live.']].map(([icon, t, b]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      background: 'var(--white)',
      border: '1px solid var(--mist-border)',
      borderRadius: 'var(--radius-card)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    color: "var(--forest)",
    base: window.ICONS
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 16px/1.3 var(--font-sans)',
      color: 'var(--ink)',
      marginTop: 18
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      font: '400 14px/1.5 var(--font-sans)',
      color: 'var(--body-muted)'
    }
  }, b))))), /*#__PURE__*/React.createElement(Section, {
    band: "paper",
    compact: true
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Recent activity"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 16,
      font: '500 34px/1.12 var(--font-serif-display)',
      letterSpacing: '-0.015em',
      color: 'var(--ink)'
    }
  }, "What the product actually does."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 16,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(TrackerCard, {
    role: "Product Designer",
    company: "Tesserac",
    location: "Remote, US",
    status: "Interviewing",
    meta: [{
      label: 'Fit',
      value: '82%'
    }, {
      label: 'Next',
      value: 'Panel, Thu'
    }]
  }), /*#__PURE__*/React.createElement(TrackerCard, {
    role: "Service Designer",
    company: "Halden Health",
    location: "Portland, OR",
    status: "Applied",
    meta: [{
      label: 'Fit',
      value: '74%'
    }, {
      label: 'Next',
      value: 'Follow up Mon'
    }]
  }))), /*#__PURE__*/React.createElement(Section, {
    band: "forestDeep",
    compact: true,
    contentStyle: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '500 44px/1.08 var(--font-serif-display)',
      letterSpacing: '-0.02em',
      color: 'var(--on-dark-heading)',
      margin: '0 auto',
      maxWidth: '20ch'
    }
  }, "Give people something that keeps working after the last day."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark"
  }, "Sponsor Offboard"))), /*#__PURE__*/React.createElement(SiteFooter, {
    logo: window.A + '/logo-wordmark-light.png',
    note: "\xA9 2026 Offboard. Not a government agency.",
    columns: [{
      title: 'Product',
      items: ['How it works', 'Career Context', 'Pricing']
    }, {
      title: 'Sponsors',
      items: ['Overview', 'Reporting', 'Security']
    }, {
      title: 'Company',
      items: ['About', 'Careers', 'Privacy']
    }]
  }));
}
window.SponsorPage = SponsorPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Sponsor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/app.jsx
try { (() => {
function App() {
  const [page, setPage] = React.useState('How it works');
  const nav = l => setPage(l);
  const Page = page === 'Sponsor Offboard' ? window.SponsorPage : window.Homepage;
  return /*#__PURE__*/React.createElement(Page, {
    onNavigate: nav,
    active: page
  });
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/app.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.LumoMark = __ds_scope.LumoMark;

__ds_ns.Photo = __ds_scope.Photo;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.Triptych = __ds_scope.Triptych;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.YouBubble = __ds_scope.YouBubble;

__ds_ns.AiReply = __ds_scope.AiReply;

__ds_ns.ChatExchange = __ds_scope.ChatExchange;

__ds_ns.InsetBlock = __ds_scope.InsetBlock;

__ds_ns.PlanCard = __ds_scope.PlanCard;

__ds_ns.QuestionBlock = __ds_scope.QuestionBlock;

__ds_ns.TrackerCard = __ds_scope.TrackerCard;

})();
