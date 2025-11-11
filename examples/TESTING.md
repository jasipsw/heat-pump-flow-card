# Testing Guide for Heat Pump Flow Card

This guide explains how to set up a complete test environment for the Heat Pump Flow Card using the provided example configurations.

## Quick Start

### Step 1: Create Test Sensors in Home Assistant

1. Open your Home Assistant `configuration.yaml` file
2. Add this line to include the test sensors:

```yaml
# Include heat pump test sensors
homeassistant:
  packages:
    heat_pump_test: !include examples/heat-pump-test-sensors.yaml
```

**OR** copy the entire contents of `heat-pump-test-sensors.yaml` directly into your `configuration.yaml`

3. Restart Home Assistant
4. Navigate to **Settings → Devices & Services → Helpers** to verify all test sensors were created

### Step 2: Add the Test Card to Your Dashboard

1. Go to your Lovelace dashboard
2. Click **Edit Dashboard** → **Add Card** → **Manual Card**
3. Copy the contents of `full-detailed-metrics-test.yaml` into the card editor
4. Click **Save**

### Step 3: Test Different Scenarios

Use the provided automation buttons or run scripts manually:

#### Heating Mode
```yaml
service: script.set_test_heating_mode
```
**What it does:**
- Sets HP to heating mode
- Activates buffer tank → HVAC load flow
- DHW diverter valve OFF (heating position)
- Power: 3kW, Thermal: 12kW, COP: 4.0
- Outlet: 45°C, Inlet: 35°C, Flow: 15 L/min

#### DHW Mode
```yaml
service: script.set_test_dhw_mode
```
**What it does:**
- Sets HP to DHW mode
- Activates HP → DHW tank flow
- DHW diverter valve ON (DHW position)
- Power: 4kW, Thermal: 14kW, COP: 3.5
- Outlet: 55°C, Inlet: 40°C, Flow: 18 L/min
- Auxiliary heater: 9kW (50% power)
- Street water flow: 8 L/min

#### HP Off
```yaml
service: script.set_test_hp_off
```
**What it does:**
- Turns off heat pump
- Sets all power/flow values to 0
- Shows idle/off state visualization

## Test Control Dashboard

Create a test control panel using this configuration:

```yaml
type: vertical-stack
cards:
  - type: horizontal-stack
    cards:
      - show_name: true
        show_icon: true
        type: button
        name: Heating Mode
        icon: mdi:radiator
        tap_action:
          action: call-service
          service: script.set_test_heating_mode
      - show_name: true
        show_icon: true
        type: button
        name: DHW Mode
        icon: mdi:water-boiler
        tap_action:
          action: call-service
          service: script.set_test_dhw_mode
      - type: button
        name: HP Off
        icon: mdi:power
        tap_action:
          action: call-service
          service: script.set_test_hp_off

  - type: entities
    title: Heat Pump Controls
    entities:
      - entity: input_boolean.test_hp_running
      - entity: input_boolean.test_g2_valve
      - entity: input_select.test_hp_mode
      - entity: input_number.test_fan_speed
      - entity: input_number.test_aux_heater_power

  - type: entities
    title: Heat Pump Metrics
    entities:
      - entity: input_number.test_hp_power
      - entity: input_number.test_hp_thermal
      - entity: sensor.test_heat_pump_cop
      - entity: input_number.test_hp_flow
      - entity: input_number.test_hp_outlet_temp
      - entity: input_number.test_hp_inlet_temp

  - type: entities
    title: Electrical Metrics
    entities:
      - entity: input_number.test_hp_amps
      - entity: input_number.test_hp_volts

  - type: entities
    title: Detailed Metrics - Row 3
    entities:
      - entity: input_number.test_compressor_freq
      - entity: input_number.test_discharge_temp
      - entity: input_number.test_ambient_temp

  - type: entities
    title: Buffer Tank & HVAC
    entities:
      - input_number.test_buffer_supply_temp
      - input_number.test_buffer_return_temp
      - type: divider
      - input_number.test_hvac_flow
      - input_number.test_hvac_thermal

  - type: entities
    title: DHW Tank 1
    entities:
      - input_number.test_dhw_inlet_temp
      - input_number.test_dhw_outlet_temp
      - input_number.test_dhw_tank_temp
      - input_number.test_street_water_flow
      - input_number.test_street_water_temp
      - input_number.dhw1_outlet_temp

  - type: entities
    title: DHW Tank 2
    entities:
      - input_number.dhw_2_outlet_temp
      - input_number.dhw_2_tank_temp
      - input_number.dhw2_min_temp
      - input_number.dhw2_max_temp
```

## What Gets Created

### Input Numbers (50+ sensors)
- **Core Metrics**: power, thermal, temps, flow, fan speed
- **Electrical**: amps, volts
- **Detailed Row 3**: compressor freq, discharge temp, ambient temp
- **Detailed Row 4**: DHW temp, outdoor coil, suction temp
- **Detailed Row 5**: heat exchanger, plate exchanger, IPM temp
- **Detailed Row 6**: EC fan 1 & 2, bus voltage
- **Detailed Row 7**: aux heater, compressor hours, max compressor %
- **Detailed Row 8**: fan shutdown code, DIN6 switch
- **Buffer Tank**: supply/return temps
- **HVAC**: thermal power, flow rate
- **DHW Tank 1**: coil temps, tank temp, street water
- **DHW Tank 2**: outlet temp, tank temp, gradient settings

### Input Booleans (2)
- `test_hp_running` - HP on/off status
- `test_g2_valve` - DHW diverter valve position

### Input Select (1)
- `test_hp_mode` - Operating mode (off/heating/cooling/dhw/idle/defrost)

### Template Sensors (1)
- `sensor.test_heat_pump_cop` - Calculated COP (thermal ÷ power)

### Scripts (3)
- `script.set_test_heating_mode` - Quick heating scenario
- `script.set_test_dhw_mode` - Quick DHW scenario
- `script.set_test_hp_off` - Quick off scenario

## Testing Tips

### Verify Metric Positioning

The full test configuration displays **10 rows** of metrics:

1. **Row 1**: IN (Power) | OUT (Thermal) | COP ← Always shown
2. **Row 2**: Flow | Amps | Volts ← Always shown
3. **Row 3**: Comp | Disch | Amb ← Detailed metrics start
4. **Row 4**: DHW | O-Coil | Suct
5. **Row 5**: HX | Plate | IPM
6. **Row 6**: Fan1 | Fan2 | Bus V
7. **Row 7**: E-Htr | Comp H | MaxC%
8. **Row 8**: Pump | F-Code* | DIN6
9. **Row 9**: Defrost* | Error* | —
10. **Row 10**: Custom metrics (3 sensors)

*Only shown when active/non-zero

### Manual Testing

To manually adjust any value:
1. Go to **Developer Tools → States**
2. Find the entity (e.g., `input_number.test_hp_power`)
3. Adjust the value
4. Watch the card update in real-time

### Test Animation

Adjust flow rates to test animations:
- `input_number.test_hp_flow` - HP flow (triggers pipe animations)
- `input_number.test_hvac_flow` - HVAC flow
- `input_number.test_street_water_flow` - DHW street water inlet

Set to `0` to stop animations and see idle state.

### Test Auxiliary Heater Glow

Adjust `input_number.test_aux_heater_power`:
- `0 W` = Gray coil, no glow
- `4500 W` (25%) = Slight red glow
- `9000 W` (50%) = Medium red glow
- `13500 W` (75%) = Strong red glow
- `18000 W` (100%) = Maximum glow

### Test DHW Diverter Valve

Toggle `input_boolean.test_g2_valve`:
- **OFF** = Heating mode (flow to buffer tank)
- **ON** = DHW mode (flow to DHW tank)

Watch the valve symbol and pipe colors change accordingly.

## Cleanup

To remove all test sensors:

1. Remove the `!include` line or sensor definitions from `configuration.yaml`
2. Restart Home Assistant
3. Go to **Settings → Devices & Services → Helpers**
4. Delete all entities starting with "Test"

## Other Example Configurations

- **`cx50-configuration.yaml`** - Real-world Chiltrix CX50 setup
- **`test-configuration.yaml`** - Basic test configuration (fewer sensors)
- **`full-detailed-metrics-test.yaml`** - Complete test with all metrics ← Use this one!

## Support

For issues or questions:
- [GitHub Issues](https://github.com/jasipsw/heat-pump-flow-card/issues)
- [Documentation](https://github.com/jasipsw/heat-pump-flow-card)
