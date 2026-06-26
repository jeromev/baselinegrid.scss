# baselinegrid.scss

**An SCSS toolkit for aligning text and layout to a baseline grid, with compile-time configuration validation and responsive utilities.**

[![Version](https://img.shields.io/badge/version-3.1.1-blue.svg)](https://github.com/jeromev/baselinegrid.scss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The toolkit snaps line boxes to a vertical grid: it sets each element's
`line-height` to an integer number of grid units and uses `::before`/`::after`
pseudo-elements to carry that rhythm to the following content. Grid units are
emitted as CSS custom properties, so spacing scales responsively across
breakpoints. An optional, opt-in font-metric correction can additionally nudge
text onto the baseline using per-font metrics.

This is alignment by line-box stacking, not font-metric trimming — see
[How alignment works](#how-alignment-works) for what that does and does not give you.

## Features

- **Configuration validation** — compile-time checks that the scale defines the required breakpoints and properties, with warnings for likely mistakes (odd line-heights, breakpoints out of order, decreasing line-heights).
- **Responsive baseline grid** — 7 default breakpoints; the scale is fully overridable at `@use` time.
- **Baseline alignment** — `set()` / `scale()` make `line-height` an integer multiple of the grid unit so successive baselines fall on grid lines.
- **Optional font-metric correction** — opt-in `translateY` nudge derived from per-font metrics (Georgia and Verdana presets included; add your own). Off by default.
- **Grid-unit utilities** — vertical/horizontal units, padding/margin and spacing mixins, media-query and breakpoint helpers.
- **Fluid spacing** — `clamp()`-based interpolation between two breakpoints, plus min/max clamps.
- **Container queries** — thresholds and scales expressed in grid units.
- **Debug overlay** — a background grid image for visual checking during development.
- **No runtime dependencies** — the core is self-contained SCSS (the demo uses sanitize.css as a dev dependency).
- **CSS custom properties** — grid units are emitted as variables that scale responsively.

## How alignment works

`set()` and `scale()` compute a `line-height` that is an integer number of grid
units (`--base-unit`, half the scale's line-height). Because every line is a
whole number of units tall, successive baselines land on grid lines. Two
`::before`/`::after` pseudo-elements — height equal to the line-height, with a
negative `vertical-align` on `::after` — carry that rhythm to the following
content.

This snaps the **line box** to the grid. It does not, on its own, control where
the glyph sits inside that box; that depends on the font's metrics (ascent,
descent, cap-height). For body text on a 2-unit grid the residual offset is
sub-pixel. To bring the glyph itself onto the baseline, enable the opt-in
[font-metric correction](#font-metric-correction).

Constraints:

- `line-height` values should be even integers so that `--base-unit`
  (`line-height ÷ 2`) is a whole pixel and the grid stays sharp. The validator
  warns when this is not the case.
- `root()` sets the root `font-size`/`line-height` in pixels to keep the grid on
  whole pixels — see the [Accessibility note](#accessibility-note) for the
  trade-off this implies.

## Installation

```bash
npm install baselinegrid.scss
```

Then import it in your Sass. The form below works with any toolchain that puts
`node_modules` on the Sass load path (Vite, `sass-loader`, the `sass` CLI with
`--load-path=node_modules`):

```scss
@use 'baselinegrid.scss/baselinegrid' as bg;
```

If your toolchain has the [package importer](https://sass-lang.com/documentation/at-rules/use/#pkg) enabled
(`sass --pkg-importer=node`), the canonical modern form also works:

```scss
@use 'pkg:baselinegrid.scss' as bg;
```

## Quick Start

```scss
@use 'baselinegrid.scss/baselinegrid' as bg with (
  $debug: 1  // Enable visual grid overlay during development
);

@include bg.begin();

html {
  font-family: Georgia, serif;
  @include bg.root();
}

h1 {
  @include bg.scale('font-size', (
    'xs': 35px,
    'm': 60px,
    'xl': 70px
  ));
}

p {
  @include bg.set();
}

article {
  @include bg.pad-scale();  // Responsive padding
}
```

## Configuration

### Default Responsive Scale

The toolkit comes with a complete 7-breakpoint scale optimized for modern devices:

| Breakpoint | Font Size | Line Height | Min Width | Default Padding |
|------------|-----------|-------------|-----------|-----------------|
| `xs`       | 15px      | 24px        | 0         | 1 unit          |
| `s`        | 17px      | 26px        | 375px     | 2 units         |
| `m`        | 19px      | 28px        | 560px     | 3 units         |
| `l`        | 20px      | 30px        | 768px     | 4 units         |
| `xl`       | 21px      | 32px        | 1024px    | 5 units         |
| `xxl`      | 23px      | 34px        | 1440px    | 8 units         |
| `ul`       | 25px      | 36px        | 2004px    | 10 units        |

### Customize Configuration

Override the scale to match your design system:

```scss
@use 'baselinegrid.scss/baselinegrid' as bg with (
  $scale: (
    'xs': (
      'font-size': 16px,
      'line-height': 24px,
      'min-width': 0,
      'pad': 2
    ),
    's': (
      'font-size': 18px,
      'line-height': 28px,
      'min-width': 640px,
      'pad': 3
    ),
    // ... define all 7 breakpoints
  ),
  $width-optical-adjustment: 1.1,
  $debug: 0
);
```

Other configuration options:

| Variable | Default | Effect |
|----------|---------|--------|
| `$width-optical-adjustment` | `1.1` | Scales horizontal grid units relative to vertical ones. |
| `$right-side-optical-adjustment` | `1` | Extra factor applied to right-side padding (`h-right()`, used by `pad()`/`marg()`/`spacing-*`). `1` is symmetric; values `< 1` optically trim the right side. |
| `$debug` | `0` | `1` shows the grid overlay (also emits a warning so it is not deployed by accident). |
| `$preset` | `'Georgia'` | Default font preset for the metric correction. |
| `$metric-correction` | `false` | Enables the opt-in [font-metric correction](#font-metric-correction). |

### Configuration Validation (Enhanced in v3.0.0)

The toolkit automatically validates your configuration at compile time:

- ✅ Ensures all required breakpoints exist (`xs`, `s`, `m`, `l`, `xl`, `xxl`, `ul`)
- ✅ Checks for required properties (`font-size`, `line-height`, `min-width`, `pad`)
- ⚠️ Warns about odd line-heights (even integers render better in browsers)
- ⚠️ Validates `xs` breakpoint has `min-width: 0`
- ⚠️ Validates breakpoints are in ascending order (new in v3.0)
- ⚠️ Warns if line-heights decrease at larger breakpoints (new in v3.0)
- ⚠️ Warns if debug mode is enabled (don't deploy to production!)

## Configuration Best Practices

### Recommended: Dedicated Configuration File

For projects with consistent design systems, create a dedicated configuration file:

```scss
// styles/_baselinegrid-config.scss
@use "design-system" as ds;

@use 'baselinegrid.scss/baselinegrid' as * with (
  $scale: ds.$scale,
  $width-optical-adjustment: ds.$optical-adjustment,
  $debug: 0
);

@forward 'baselinegrid.scss/baselinegrid';
```

Then import this configuration throughout your project:

```scss
// components/_typography.scss
@use '../styles/baselinegrid-config' as bg;

h1 {
  @include bg.scale('font-size', (
    'xs': 35px,
    'm': 60px,
    'xl': 70px
  ));
}
```

### Alternative: Direct Configuration

For simpler projects, configure directly in your main stylesheet:

```scss
// main.scss
@use 'baselinegrid.scss/baselinegrid' as bg with (
  $debug: 1
);

@include bg.begin();

html {
  @include bg.root();
}
```

## Core Mixins

### `@include bg.begin()`
Initialize the baseline grid system. Call once in your global styles.

```scss
@include bg.begin();
```

### `@include bg.root()`
Apply to your root element (`html` or `body`). Sets up CSS custom properties and responsive base font.

```scss
html {
  @include bg.root();
}
```

### `@include bg.set($font-size)`
Align text to the baseline grid. Automatically calculates line-height and applies pseudo-element adjustments.

```scss
p, li {
  @include bg.set();  // Uses base font size
}

h3 {
  @include bg.set(24px);  // Custom font size
}
```

### `@include bg.scale($property, $breakpoint-map)`
Apply responsive values across breakpoints. Special handling for `font-size` maintains baseline alignment.

```scss
h1 {
  @include bg.scale('font-size', (
    'xs': 35px,
    's': 38px,
    'm': 60px,
    'l': 65px,
    'xl': 70px
  ));
}

.container {
  @include bg.scale('max-width', (
    'xs': bg.h(30),
    'm': bg.h(50),
    'xl': bg.h(70)
  ));
}
```

## Spacing Utilities

### Basic Padding & Margin Mixins

```scss
.element {
  @include bg.pad(2);      // Padding: 2 vertical units, horizontal units with optical adjustment
  @include bg.padv(3);     // Vertical padding only
  @include bg.padh(2);     // Horizontal padding only
  @include bg.marg(1);     // Margin
  @include bg.margv(2);    // Vertical margin
  @include bg.margh(1);    // Horizontal margin
}
```

### Enhanced Spacing Mixins (New in v3.0.0)

```scss
// Common spacing patterns
.card {
  @include bg.spacing(2, 1);           // 2 vertical, 1 horizontal
  @include bg.spacing-symmetric(2);    // 2 units on all sides
  @include bg.spacing-custom(2, 1, 3, 1); // top, right, bottom, left
}

// Auto-cleanup patterns
.cards > .card {
  @include bg.spacing-stack(2);        // 2 units between, removes last margin
}

.tags > .tag {
  @include bg.spacing-inline(1);       // 1 unit between, removes last margin
}

// Responsive spacing
.container {
  @include bg.spacing-scale((
    'xs': (1, 0.5),  // (vertical, horizontal) per breakpoint
    'm': (2, 1),
    'xl': (3, 2)
  ));
}
```

### Responsive Padding

```scss
article {
  @include bg.pad-scale();   // Applies scale-based padding at each breakpoint
  @include bg.padh-scale();  // Horizontal padding only
}
```

### Grid Unit Functions

```scss
.box {
  padding: bg.v(3);           // 3 vertical grid units
  margin-left: bg.h(2);       // 2 horizontal grid units
  margin-right: bg.h-right(2); // Right side with optical adjustment
  
  width: bg.v(40);            // Vertical units work for any dimension
  gap: bg.h();                // Default: 1 unit
}
```

### Fluid Spacing Functions (New in v3.0.0)

```scss
// Smooth scaling between breakpoints
.hero {
  padding: bg.v-fluid('xs', 'xl', 2, 4);  // Grows from 2 to 4 units
  width: bg.h-fluid('m', 'xxl', 10, 20);  // Grows from 10 to 20 units
}

// Clamped values with min/max limits
.box {
  padding: bg.v-clamp(2, 1, 3);    // Prefer 2, min 1, max 3
  width: bg.h-clamp(20, 15, 30);   // Prefer 20, min 15, max 30
}

// Static values (compile-time optimization)
$icon-size: bg.v-static(2);        // Returns 24px at 'xs' breakpoint
$column-width: bg.h-static(11);    // Returns static px value

// Zero shortcuts (explicit for clarity)
margin-top: bg.v0();               // More explicit than 0
padding-left: bg.h0();             // More explicit than 0
```

## Responsive Utilities

### Media Query Mixin

```scss
.element {
  font-size: 16px;
  
  @include bg.respond-to('m') {
    font-size: 20px;
  }
  
  @include bg.respond-to('xl') {
    font-size: 24px;
  }
}
```

### Breakpoint Function

```scss
.container {
  max-width: bg.breakpoint('m');  // Returns 560px
}
```

## Helper Functions

### Configuration Queries

```scss
// Get complete configuration (includes the library version)
$config: bg.get-config();
@debug $config;

// Get all breakpoint names
$breakpoints: bg.get-breakpoints();  // ('xs', 's', 'm', 'l', 'xl', 'xxl', 'ul')

// Check if breakpoint exists
@if bg.has-breakpoint('xl') {
  // Safe to use 'xl'
}
```

### Scale Queries

```scss
// Get specific values from scale
$tablet-font-size: bg.getFromScale('m', 'font-size');      // 19px
$desktop-line-height: bg.getFromScale('l', 'line-height'); // 30px
$mobile-padding: bg.getFromScale('xs', 'pad');             // 1
```

### Unit Conversion

```scss
// Convert pixels to rem/em
.element {
  padding: bg.rem(24px);  // Relative to root
  margin: bg.em(16px);    // Relative to element font-size
}
```

### Utility Helpers (New in v3.0.0)

```scss
// Check if value is zero
@if not bg.is-zero($margin) {
  margin: $margin;
}
```

## Container Queries (New in v3.0.0)

Use container queries with grid units for component-level responsive design:

```scss
// Container query with horizontal grid units
.card {
  container-type: inline-size;
  
  @include bg.container-min-h(20) {
    display: flex;  // Flex layout when wider than 20 horizontal units
  }
  
  @include bg.container-min-v(10) {
    padding: bg.v(2);  // Extra padding when taller than 10 vertical units
  }
}

// Container query scale (like bg.scale but for containers)
.sidebar {
  container-type: inline-size;
  
  @include bg.container-scale('padding', (
    0: bg.v(1),     // Default (no container query)
    15: bg.v(2),    // At 15h units wide
    30: bg.v(3)     // At 30h units wide
  ));
}
```

**Note:** Container queries require browser support (Chrome 105+, Firefox 110+, Safari 16+).

## Font-metric correction

By default, alignment relies on line-box stacking (see
[How alignment works](#how-alignment-works)), which positions the line box but
not the glyph inside it. The opt-in metric correction adds a `translateY` nudge,
derived from a font's metrics, that shifts the text so the glyph is optically
balanced on the baseline. It is **off by default** and computed only when used.

```scss
@use 'baselinegrid.scss/baselinegrid' as bg with (
  $metric-correction: true,
  $preset: 'Georgia'   // default preset for set()/scale()
);
```

The shift is expressed in `em`, so a single declaration scales across every
breakpoint. Magnitude is font-dependent — it is the difference between the space
below the baseline and the space above the caps:

```scss
bg.baseline-shift('Georgia');  // ≈ -0.0049em (sub-pixel at body sizes)
bg.baseline-shift('Verdana');  // ≈ -0.068em  (~4px at 60px — visible)
```

Pass a per-element preset when a component uses a different font:

```scss
h1 { @include bg.scale('font-size', ('xs': 32px, 'm': 60px), $preset: 'Verdana'); }
```

Presets ship for `Georgia` and `Verdana`; metrics come from the font's OS/2 and
`head` tables (the same dataset as [Capsize](https://seek-oss.github.io/capsize/)).
Add your own by extending `$_presets`. Because the correction is engine- and
font-dependent, verify it visually for your stack rather than assuming pixel-exact
results.

## Debug Mode

Enable visual grid overlay during development:

```scss
@use 'baselinegrid.scss/baselinegrid' as bg with (
  $debug: 1
);
```

Or use the debug mixin on specific elements:

```scss
.element {
  @include bg.debug('test');  // Red highlight with label
}
```

**Remember to disable debug mode before deploying to production!**

## Complete Example

```scss
@use 'baselinegrid.scss/baselinegrid' as bg with (
  $debug: 1
);

@include bg.begin();

html {
  font-family: Georgia, serif;
  @include bg.root();
}

body {
  margin: 0;
}

article {
  @include bg.pad-scale();
  max-width: bg.h(60);
  margin: 0 auto;
}

// Responsive typography with baseline alignment
h1 {
  font-family: Verdana, sans-serif;
  @include bg.scale('font-size', (
    'xs': 35px,
    's': 38px,
    'm': 60px,
    'l': 65px,
    'xl': 70px,
    'xxl': 73px,
    'ul': 75px
  ));
}

h2 {
  font-family: Verdana, sans-serif;
  @include bg.scale('font-size', (
    'xs': 30px,
    's': 34px,
    'm': 42px,
    'l': 44px,
    'xl': 48px
  ));
}

p, li {
  @include bg.set();
}

.sidebar {
  @include bg.set(14px);  // Smaller text, still aligned
}

// Grid layout with grid units
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(bg.h(18), 1fr));
  column-gap: bg.h();
  padding: bg.v() 0;
}

// v3.0 features: Fluid spacing
.hero {
  padding: bg.v-fluid('xs', 'xl', 2, 6);  // Smoothly grows from 2 to 6 units
  background: linear-gradient(to bottom, #eee, #fff);
}

// v3.0 features: Enhanced spacing mixins
.card {
  @include bg.spacing(2, 1);       // 2 vertical, 1 horizontal
  background: white;
  border-radius: 4px;
  
  &:not(:last-child) {
    @include bg.spacing-stack(2);  // Auto margin cleanup
  }
}

// v3.0 features: Container queries
.responsive-card {
  container-type: inline-size;
  padding: bg.v(1);
  
  @include bg.container-min-h(20) {
    display: flex;
    padding: bg.v(2);
  }
}

// v3.0 features: Clamped values
.dynamic-box {
  padding: bg.v-clamp(2, 1, 3);    // Between 1-3 units
  width: bg.h-clamp(20, 15, 30);   // Between 15-30 units
}
```

## What's New in v3.0.0

### Fluid Spacing
- `v-fluid()` and `h-fluid()` - Smooth scaling between breakpoints
- `v-clamp()` and `h-clamp()` - Responsive values with min/max limits
- `v-static()` and `h-static()` - Compile-time optimization for static values
- `v0()` and `h0()` - Explicit zero shortcuts

### Enhanced Spacing Mixins
- `spacing()` - Quick vertical + horizontal padding
- `spacing-symmetric()` - Same on all sides
- `spacing-custom()` - Individual side control
- `spacing-stack()` - Auto margin cleanup for vertical stacking
- `spacing-inline()` - Auto margin cleanup for horizontal arrangement
- `spacing-scale()` - Responsive spacing map

### Container Queries
- `container-min-h()` - Query using horizontal grid units
- `container-min-v()` - Query using vertical grid units
- `container-scale()` - Responsive properties based on container size

### Enhanced Validation
- Validates breakpoints are in ascending order
- Warns if line-heights decrease at larger breakpoints
- Better error messages with available options

### Utility Functions
- `is-zero()` - Check if value is effectively zero
- `get-config()` now includes version number

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- CSS Grid (for layout utilities)
- Container Queries (for container query features - Chrome 105+, Firefox 110+, Safari 16+)
- SCSS/Sass compilation

## Accessibility note

To keep baselines on an exact pixel grid, `root()` sets the root `font-size`
and `line-height` in **pixels**. Page (pinch/Ctrl+/-) zoom scales these fine,
but a user's *default font-size* preference (set in the browser) will **not**
resize the text, which is a [WCAG 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)
consideration. If honoring the user's default text size matters more than
pixel-exact snapping for your project, drive the root size from `rem`/`%` and
treat the grid as best-effort. This is a deliberate trade-off of the px-grid
approach, not a bug.

## Credits

Original calculations based on Benoît Wimart's Basel project (v0.1 beta, May 2013). Modernized and extended with responsive utilities, configuration validation, fluid spacing, container queries, and SCSS module system.

## License

MIT © [Jérôme Vogel](https://github.com/jeromev)

## Contributing

Issues and pull requests welcome at [github.com/jeromev/baselinegrid.scss](https://github.com/jeromev/baselinegrid.scss)
