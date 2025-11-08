# baselinegrid.scss

**A modern SCSS toolkit for aligning text and layout to a baseline grid with configuration validation and responsive utilities.**

[![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)](https://github.com/jeromev/baselinegrid.scss)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Perfect typography requires vertical rhythm. This toolkit provides precise baseline grid alignment with responsive scaling, configuration validation, and utility functions for modern design systems.

## Features

- ✅ **Automatic Configuration Validation** - Compile-time checks for scale integrity
- 📐 **Responsive Baseline Grid** - 7 breakpoints with customizable scale
- 🎯 **Precise Typography** - Align text to baseline grid like InDesign
- 🔧 **Rich Utility Functions** - Grid units, spacing helpers, media queries
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

### Configuration Validation (New in v2.2.0)

The toolkit automatically validates your configuration at compile time:

- ✅ Ensures all required breakpoints exist (`xs`, `s`, `m`, `l`, `xl`, `xxl`, `ul`)
- ✅ Checks for required properties (`font-size`, `line-height`, `min-width`, `pad`)
- ⚠️ Warns about odd line-heights (even integers render better in browsers)
- ⚠️ Validates `xs` breakpoint has `min-width: 0`
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

### Padding & Margin Mixins

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

### Configuration Queries (New in v2.2.0)

```scss
// Get complete configuration
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

.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(bg.h(18), 1fr));
  column-gap: bg.h();
  padding: bg.v() 0;
}
```

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties (CSS Variables)
- CSS Grid (for layout utilities)
- SCSS/Sass compilation

## Credits

Original calculations based on Benoît Wimart's Basel project (v0.1 beta, May 2013). Modernized and extended with responsive utilities, configuration validation, and SCSS module system.

## License

MIT © [Jérôme Vogel](https://github.com/jeromev)

## Contributing

Issues and pull requests welcome at [github.com/jeromev/baselinegrid.scss](https://github.com/jeromev/baselinegrid.scss)
