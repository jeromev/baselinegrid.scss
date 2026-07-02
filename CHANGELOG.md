# Changelog

## [3.1.2] - 2026-07-01

### Changed
- Demo (`styles.scss`): added extensive inline comments documenting every mixin
  and function call — `begin()`, `root()`, `set()`, `scale()`, `pad-scale()`,
  `h()`, `v()` — including compiled output examples and per-breakpoint
  `ceil()` calculations for `h1` and `h2`.

_Docs/demo only — the published library is unchanged from 3.1.1._

## [3.1.1] - 2026-06-26

### Changed
- Demo (`index.html`): linked the project from the intro and heading, added a
  "With baselinegrid.scss, it's easy." line, and a closing colophon paragraph.
- Demo: load sanitize.css from the jsDelivr CDN so the GitHub Pages demo works
  (the previous `node_modules/...` import 404'd once served from Pages); the demo
  also sets an explicit page background.

_Docs/demo only — the published library is unchanged from 3.1.0 apart from the
version string._

## [3.1.0] - 2026-06-26

### Added
- **Opt-in font-metric correction**: `$metric-correction` (default `false`) makes
  `set()` / `scale()` emit a metric-derived `translateY` that nudges text onto the
  baseline. The shift is expressed in `em`, so one declaration covers all
  breakpoints.
- **`baseline-shift($preset)`**: public function returning the per-font em
  coefficient (Georgia ≈ -0.0049em, Verdana ≈ -0.068em). Computed on demand.
- **Verdana preset** alongside Georgia; `set()` / `scale()` accept a `$preset`
  argument for per-component fonts.

### Changed
- **`$right-side-optical-adjustment` now defaults to `1`** (was `0.8`), i.e.
  symmetric horizontal padding by default. Set it `< 1` to optically trim the
  right side as before.
- **The `spacing-*` family now honors `$right-side-optical-adjustment`** (right
  side uses `h-right()`), consistent with `pad()` / `marg()`.
- **Font-metrics internals refactored**: the eagerly-computed (and partly dead)
  metric variables were replaced by the lazy `baseline-shift()` function, so
  nothing is computed unless the correction is used.
- **Debug overlay is now legible**: `show-grid()` draws a sharp 1px rule at each
  baseline (every 2 grid units) over a lighter rule at each grid unit, instead of
  the previous faint top-of-tile fade. The demo enables it and sets a background
  so the grid is visible in `index.html`.
- README rewritten in a precise, technical register (no "InDesign-like"
  superlatives); added a "How alignment works" section documenting the line-box
  stacking approach and its limits.

### Fixed
- **Invalid CSS in fluid spacing**: `v-fluid()` / `h-fluid()` emitted a doubled
  unit (`clamp(24pxpx, …)`) that browsers discard. They now emit valid `clamp()`
  expressions.
- **Invalid CSS in container queries**: `container-min-h()`, `container-min-v()`
  and `container-scale()` emitted `@container (min-width: 264pxpx)`. Fixed (the
  helpers already return px, so the extra `px` is no longer appended).
- **`em()` / `rem()` with unitless input**: `rem(0)` / `em(0)` produced the
  invalid token `calc(0 / 1px)rem`. Zero and unitless values are now handled.
- **`$breakpoints` drift**: the breakpoint map is now derived from `$scale`
  with a loop, so `breakpoint()` / `respond-to()` and `has-breakpoint()` agree
  even when custom breakpoints are added.
- **Documentation values**: `v-static(2)` is documented as `24px` (was wrongly
  `48px`); `breakpoint('m')` JSDoc corrected to `560px` (was `600px`).
- **Version drift**: `$version`, `get-config()`, the README badge and the
  lockfile are all aligned; `get-config()` now reports `$version` instead of a
  hardcoded literal.

### Changed
- **Deprecations removed**: replaced the deprecated global `unquote`/`nth`/
  `length` and the deprecated `if()` function syntax; added `sass:list` and
  `sass:string`. Compiling now produces no Sass deprecation warnings.
- **`set-scale()`** now `@warn`s that it cannot reconfigure the module at
  runtime (it was a silent no-op) and points to `@use … with (...)`.
- **Removed dead/broken legacy mixins** `align-old()` and `box()` (they
  referenced undefined variables and emitted invalid CSS).
- The `spacing-*` family is now documented as using symmetric horizontal
  padding (use `pad()` / `marg()` for the right-side optical adjustment).

### Packaging / tooling
- Added a Sass `exports` condition and `sass` field so `@use 'pkg:baselinegrid.scss'`
  resolves; added a `files` allowlist so the npm tarball ships only the library,
  README, CHANGELOG and LICENSE (no demo artifacts).
- Added `sass` as a devDependency and `build` / `test` npm scripts, plus a
  compile smoke-test (`test/`) that fails on invalid CSS.

## [3.0.2] - 2025-11-11

### Changed
- Packaging preparation for npm publish; regenerated `styles.css`.

## [3.0.1] - 2025-11-10

### Documentation
- Expanded the README with comprehensive v3.0 feature documentation.

## [3.0.0] - 2025-11-10

### Added - New Utility Functions
- **Fluid spacing functions**: Smooth scaling between breakpoints
  - `v-fluid($start-bp, $end-bp, $start-val, $end-val)`: Fluid vertical spacing
  - `h-fluid($start-bp, $end-bp, $start-val, $end-val)`: Fluid horizontal spacing
- **Clamp functions**: Constrained responsive spacing
  - `v-clamp($value, $min, $max)`: Vertical spacing with min/max limits
  - `h-clamp($value, $min, $max)`: Horizontal spacing with min/max limits
- **Zero-value shortcuts**: Explicit zero values
  - `v0()`: Zero vertical spacing (clarity over bare `0`)
  - `h0()`: Zero horizontal spacing
- **Static value functions**: Compile-time optimization
  - `v-static($multiplier, $breakpoint)`: Pre-calculated vertical value
  - `h-static($multiplier, $breakpoint)`: Pre-calculated horizontal value
  - `is-zero($value)`: Check if value is effectively zero

### Added - Enhanced Spacing Mixins
- **Convenience spacing mixins**: Common patterns simplified
  - `spacing($v-size, $h-size)`: Vertical and horizontal padding
  - `spacing-symmetric($size)`: Same padding on all sides
  - `spacing-custom($top, $right, $bottom, $left)`: Individual side control
  - `spacing-stack($size)`: Vertical stacking with auto last-child cleanup
  - `spacing-inline($size)`: Horizontal arrangement with auto last-child cleanup
  - `spacing-scale($scale-map)`: Responsive spacing at multiple breakpoints

### Added - Container Query Support
- **Container query helpers**: Modern responsive design
  - `container-min-h($min-units)`: Query based on horizontal grid units
  - `container-min-v($min-units)`: Query based on vertical grid units
  - `container-scale($property, $unit-map)`: Responsive properties for containers

### Enhanced - Configuration Validation
- **Progression validation**: Ensures logical scale configuration
  - Validates breakpoint min-widths are in ascending order
  - Warns if line-heights decrease at larger breakpoints
  - More helpful error messages with context

### Changed
- Version bumped to 3.0.0 (new features, backward compatible)
- Package description updated to reflect new capabilities

### Performance
- Static value functions enable compile-time optimization
- Reduced calc() overhead where values don't need runtime responsiveness
- More efficient CSS output with new convenience mixins

### Documentation
- Complete JSDoc for all new functions and mixins
- Examples for each new feature
- Migration notes for upgrading from 2.x

### Migration from 2.x
All existing code remains compatible. New features are opt-in enhancements.

#### Before (verbose):
```scss
@include bg.scale('padding', (
  'xs': bg.v(2),
  's': bg.v(2.5),
  'm': bg.v(3),
  'l': bg.v(3.5),
  'xl': bg.v(4)
));
```

#### After (concise with fluid spacing):
```scss
padding: bg.v-fluid('xs', 'xl', 2, 4);
```

## [2.2.0] - 2025-11-08

### Added
- **Configuration validation**: Automatic validation of scale configuration
  - Checks for required breakpoints and properties
  - Warns about odd line-heights (subpixel rendering)
  - Validates min-width: 0 for 'xs' breakpoint
  - Warns about optical adjustment outside typical range
  - Warns if debug mode is enabled
- **Configuration query functions**:
  - `get-config()`: Returns complete configuration map
  - `get-breakpoints()`: Returns list of breakpoint names
  - `has-breakpoint($bp)`: Check if breakpoint exists
- **Improved documentation**: Complete JSDoc comments on all public functions and mixins
- **Version export**: `$version` variable for tracking library version

### Changed
- Enhanced error messages with helpful context
- Better warnings for configuration issues

### Fixed
- None

## [2.1.2] - Previous release