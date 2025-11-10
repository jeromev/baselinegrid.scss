# Changelog

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