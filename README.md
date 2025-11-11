# baselinegrid.scss

**A modern SCSS toolkit for aligning text and layout to a baseline grid with configuration validation and responsive utilities.**

[![Version](https://img.shields.io/badge/version-3.0.1-blue.svg)](https://github.com/jeromev/baselinegrid.scss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Perfect typography requires vertical rhythm. This toolkit provides precise baseline grid alignment with responsive scaling, configuration validation, fluid spacing, container queries, and utility functions for modern design systems.

## Features

- ✅ **Automatic Configuration Validation** - Compile-time checks for scale integrity with enhanced validation
- 📐 **Responsive Baseline Grid** - 7 breakpoints with customizable scale
- 🎯 **Precise Typography** - Align text to baseline grid like InDesign
- 🔧 **Rich Utility Functions** - Grid units, spacing helpers, media queries
- 🌊 **Fluid Spacing (v3.0)** - Smooth scaling between breakpoints with clamp functions
- 📦 **Container Queries (v3.0)** - Component-level responsive design
- 💫 **Enhanced Spacing Mixins (v3.0)** - Convenient patterns for common layouts
- 🐛 **Debug Mode** - Visual grid overlay for development
- 📦 **Zero Dependencies** - Pure SCSS with modern module system
- ⚡ **CSS Custom Properties** - Dynamic grid units that scale responsively

## Installation

```bash
npm install baselinegrid.scss
```

## Quick Start

```scss
@use 'baselinegrid' as bg with (
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
@use 'baselinegrid' as bg with (
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
@use 'baselinegrid' as bg with (
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
$icon-size: bg.v-static(2);        // Returns 48px at 'xs' breakpoint
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
// Get complete configuration (includes version 3.0.0)
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

## Debug Mode

Enable visual grid overlay during development:

```scss
@use 'baselinegrid' as bg with (
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
@use 'baselinegrid' as bg with (
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

## Credits

Original calculations based on Benoît Wimart's Basel project (v0.1 beta, May 2013). Modernized and extended with responsive utilities, configuration validation, fluid spacing, container queries, and SCSS module system.

## License

MIT © [Jérôme Vogel](https://github.com/jeromev)

## Contributing

Issues and pull requests welcome at [github.com/jeromev/baselinegrid.scss](https://github.com/jeromev/baselinegrid.scss)
