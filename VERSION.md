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
