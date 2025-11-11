# Heat Pump Flow Card

A beautiful, animated Home Assistant card that visualizes heat pump water flow between the heat pump, buffer tank, DHW (Domestic Hot Water) tank, and HVAC load with real-time temperature-based color gradients, dynamic flow animations, and temperature status indicators at critical system points.

## Features

✨ **Animated Water Flow** - Dots move along pipes at speeds proportional to actual flow rates

🌡️ **Temperature-Based Colors** - Pipes change color from blue (cold) to red (hot) based on actual water temperature

📍 **Temperature Status Indicators** - Clean circular indicators show real-time temperatures at critical points

🌀 **Animated Heat Pump** - Spinning fan that rotates based on actual fan speed (0-100%)

🎨 **State-Based Coloring** - Heat pump changes color based on operating mode (heating=red, cooling=blue, DHW=orange, defrost=yellow, off=gray)

🔥 **Auxiliary Heater Visualization** - Inline electric heater with dynamic glow animations

🔀 **G2 Diverter Valve** - Visual indicator showing flow direction

🛢️ **Dual Tank Support** - Buffer tank and DHW tank with gradient temperature visualization

📊 **Real-Time Data** - Shows thermal power, COP, temperatures, flow rates, energy consumption, costs, and runtime

📈 **Custom Metrics** - Add your own sensors with custom labels in a 3-column grid format

🌈 **Tank Gradient Visualization** - Tanks fill with color gradients representing temperature stratification

🏠 **House Performance Metrics** - Track heat loss, coefficients, Manual J calculations, and system efficiency

⚙️ **Highly Configurable** - Customize colors, animation speeds, temperature ranges, and more

## Installation

For detailed installation instructions, configuration examples, and documentation, see the [full README](https://github.com/jasipsw/heat-pump-flow-card).

## Quick Configuration Example

```yaml
type: custom:heat-pump-flow-card
title: Heat Pump System
heat_pump:
  power_entity: sensor.heat_pump_electrical_power_input
  thermal_entity: sensor.heat_pump_thermal_power_output
  cop_entity: sensor.heat_pump_cop
  outlet_temp_entity: sensor.heat_pump_outlet_temperature
  inlet_temp_entity: sensor.heat_pump_inlet_temperature
  flow_rate_entity: sensor.heat_pump_flow_rate
buffer_tank:
  supply_temp_entity: sensor.buffer_tank_supply_temperature
  return_temp_entity: sensor.buffer_tank_return_temperature
hvac:
  thermal_entity: sensor.hvac_thermal_power_used
  flow_rate_entity: sensor.hvac_flow_rate
  supply_temp_entity: sensor.hvac_supply_temperature
  return_temp_entity: sensor.hvac_return_temperature
```

## Support

For issues, questions, or feature requests, visit the [GitHub repository](https://github.com/jasipsw/heat-pump-flow-card/issues).
