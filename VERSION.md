# Version History

## Open TODO Items

### High Priority
None

### Low Priority
- [ ] Dark mode text readability - text in heat pump box is not readable when heat pump is off in dark mode

### Future Enhancements
- [ ] Custom icon configuration support for brand display (allow users to specify custom SVG/image)
- [ ] Additional brand display customization options

---

## Version History

## v0.20.17 (2025-11-07)
**Fixed: Spacing adjustment for brand text area**
- Moved fan housing and blades down 3px (cy: 45 → 48)
- Moved heat pump label down 3px (y: 90 → 93)
- Moved error indicator down 3px (y: 105 → 108)
- Moved metrics down 3px (metricsY: 105/120 → 108/123)
- Provides better spacing below brand logo/text area (~1/4 of 12px text height)
- Prevents crowding between brand area and internal elements

## v0.20.16 (2025-11-07)
**Improved: Brand logo and text layout**
- Increased brand text from 10px to 12px for better readability
- Center-aligned text vertically with logo for better visual balance
- Moved logo down from y=1 to y=4 to avoid border collision
- Moved text from y=10 to y=14 and x=24 to x=25 for optical centering
- Added configurable `logo_background_color` option in heat_pump config
- Background rect behind logo/text area (default: transparent)
- Useful for logos with fixed backgrounds (e.g., white logo backgrounds)
- Background rect: x=3, y=3, width=114, height=20, rx=4 (rounded corners)

## v0.20.15 (2025-11-07)
**Fixed: Brand logo not rendering due to nested html template**
- Changed from nested `html` template to opacity-based conditional rendering
- Image element now always rendered with opacity 0 when no logo_url configured
- Fixes issue where logo element was not created in DOM
- Logo now displays correctly at 16x16px in upper left corner
- Resolves Lit SVG rendering limitation with nested template wrappers

## v0.20.14 (2025-11-07)
**Updated: Brand logo size to favicon standard (16x16px)**
- Increased logo from 12x12px to 16x16px (favicon standard size)
- Adjusted logo position from y=3 to y=1 for better centering
- Moved brand text from x=20 to x=24 to accommodate larger logo
- Better brand visibility with 33% larger logo area
- Aligns with web standards for optimal brand recognition at small scale

## v0.20.13 (2025-11-07)
**Fixed: Auxiliary heater visibility issue**
- Moved auxiliary heater rendering from pipes section to after entities
- Aux heater now renders on top of temperature labels and entity boxes
- Fixes issue where aux heater coil was being covered and invisible
- Aux heater with full power (18kW) now displays properly with red glow

## v0.20.12 (2025-11-07)
**Added: Support for custom brand logo from PNG file**
- Brand logo now loads from configured `logo_url` (e.g., `/local/chiltrix-logo.png`)
- Logo displayed as 12x12px image in upper left corner
- Replaced SVG icon with actual PNG logo from config
- Text positioned at x=20 to accommodate logo

## v0.20.11 (2025-11-07)
**Fixed: Brand icon and text repositioned to upper left**
- Moved brand icon from center to upper left corner (translate 38,5 → 5,5)
- Moved brand text to right of icon (x=60 → x=18, text-anchor middle → start)
- Icon and text now positioned in upper left corner of heat pump box

## v0.20.10 (2025-11-07)
**Adjusted: G2 valve size further reduced**
- Scaled G2 valve down from 0.85 to 0.7 for better proportions
- 30% smaller than original size

## v0.20.9 (2025-11-07)
**Fixed: Brand logo visibility, G2 valve position and size**
- Fixed brand logo rendering by removing nested html wrapper (always render with conditional opacity)
- Moved G2 valve from x=320 to x=345 for better horizontal positioning
- Scaled G2 valve down from 1.0 to 0.85 for more appropriate size
- Updated HP to G2 pipe to extend to x=307 (left valve inlet)
- Updated G2 to DHW pipe to start at x=345 (valve center)
- Extended auxiliary heater coil from x=200-270 to x=200-300 to cover longer pipe
- Centered aux heater power label at x=250

## v0.20.8 (2025-11-07)
**Fixed: G2 valve alignment and added CX brand icon**
- Fixed G2 valve position from y=190 to y=180 to align with DHW supply pipe
- Updated HP to G2 pipe path to stay horizontal at y=180
- Updated G2 to DHW pipe path to start at correct position (y=192)
- Added simplified CX logo icon next to brand name (curved C with X inside)
- Brand icon dynamically matches heat pump state color

## v0.20.7 (2025-11-07)
**Removed: Confusing icon artifact**
- Removed simple building icon that was displaying as confusing rectangles behind brand text
- Brand name now displays cleanly without icon
- Icon support can be added properly in future version with better design

## v0.20.6 (2025-11-07)
**Fixed: Fan rotation and brand display rendering**
- Fixed fan rotation transform-origin from 60px 40px to 60px 45px to match new fan center position
- Removed nested html wrapper from brand icon/text to fix zero-dimension rendering issue
- Brand icon now uses conditional opacity (0.8 when display_name set, 0 when not)
- Brand text uses conditional content (display_name or empty string)
- Both elements always rendered to avoid Lit HTML conditional rendering issues

## v0.20.5 (2025-11-07)
**Added: Brand name display with icon - initial release**
- Added brand name text display at top of heat pump box
- Added simple building/factory icon next to brand name
- Text color matches heat pump state color (same as mode label) for better readability
- Improved spacing - moved fan down 5px (cy 40→45), mode label down 5px (y 85→90), error indicator down 5px (y 100→105)
- Adjusted metrics positioning (metricsY 100→105, error case 115→120)

## v0.20.4 (2025-11-07)
**Fixed: Brand name text rendering structure**
- Fixed brand name text that wasn't rendering despite being in DOM (zero dimensions)
- Removed nested `html` template wrapper from brand text element
- Changed from conditional element rendering to conditional content rendering
- Matched structure of working text elements

## v0.20.3 (2025-11-07)
**Fixed: Debug logging and version display**
- Removed excessive debug logging
- Fixed version display positioning

## v0.20.2 (Earlier)
**Added: Debug helpers and improved rendering**
- Added debug helper function `window.findHeatPumpCard()` for console debugging
- Fixed SVG rendering order for brand name text

## v0.20.1 (Earlier)
**Major Feature Release: G2 valve improvements, aux heater, and flow control**
- G2 valve size and alignment fixes - Reduced scale and adjusted positioning to align with DHW supply
- G2 valve animations - Added smooth transitions and pulsing effects when valve switches modes
- Flow dot stroke opacity control - New `dot_stroke_opacity` configuration option (default 0.8)
- DHW coil visual feedback - Coil turns gray when no flow (heating mode)
- Auxiliary heater visualization - Spiral coil with intensity-based glow effect based on power consumption
- Configurable aux heater display name - Generic `aux_heater` configuration with customizable `display_name`
- Brand name display fix - Fixed positioning to prevent clipping

### Configuration Changes (v0.20.1)
**New: Auxiliary Heater Configuration**
```yaml
aux_heater:
  enabled: true
  power_entity: sensor.aux_heater_power
  max_power: 18000
  display_name: "V18"
```

**Enhanced: Flow Dot Stroke Control**
```yaml
animation:
  dot_stroke_width: 1.0
  dot_stroke_opacity: 0.8
```

**Heat Pump Display Name**
```yaml
heat_pump:
  display_name: "Chiltrix CX50-2"
```
