# Changelog

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