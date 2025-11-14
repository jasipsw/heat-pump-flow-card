# Changelog

All notable changes to the Heat Pump Flow Card will be documented in this file.

## [Unreleased]

### Added
- **Tank Temperature Indicators**: All tanks (Buffer, DHW, and DHW Tank 2) now support an optional temperature indicator circle displayed in the center of the tank
  - New `tank_temp_entity` configuration option for Buffer Tank to specify the tank temperature sensor
  - New `show_temp_indicator` boolean option to enable/disable the temperature indicator (default: false)
  - New `temp_indicator_radius` option to customize the indicator circle size in pixels (default: 15)
  - Temperature indicators are clickable and open the Home Assistant more-info dialog for the temperature entity
  - Indicators automatically color-match the tank's heating/cooling state for visual consistency

### Changed
- Updated `tank_temp_entity` description in documentation to clarify it's required for the temperature indicator feature

### Technical Details
For developers and advanced users:
- Added `BufferTankState.tankTemp` property to store buffer tank temperature
- Added `renderTankTempIndicator()` helper method for rendering temperature circles in SVG
- Temperature indicators use the same shadow and styling as existing temperature status indicators for consistency
- Indicators are centered at coordinates (45, 90) within each tank's local coordinate system
