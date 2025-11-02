import { LovelaceCardConfig } from 'custom-card-helpers';

export interface HeatPumpFlowCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;

  // Heat Pump Configuration
  heat_pump?: {
    power_entity?: string;      // Electrical power input (W)
    thermal_entity?: string;     // Thermal power output (W)
    cop_entity?: string;         // COP sensor
    outlet_temp_entity?: string; // Outlet temperature
    inlet_temp_entity?: string;  // Inlet temperature
    flow_rate_entity?: string;   // Flow rate (L/min)
    fan_speed_entity?: string;   // Fan speed (0-100%)
    mode_entity?: string;        // Operating mode (heating/cooling/dhw/idle/off)
    defrost_entity?: string;     // Defrost mode (binary sensor)
    error_entity?: string;       // Error/alarm sensor
    energy_entity?: string;      // Total energy consumed (kWh)
    cost_entity?: string;        // Energy cost
    runtime_entity?: string;     // Runtime sensor (optional)
    name?: string;
    icon?: string;
  };

  // Heat Pump Visual Configuration
  heat_pump_visual?: {
    off_color?: string;         // Color when off (default: #95a5a6 gray)
    heating_color?: string;     // Color in heating mode (default: #e74c3c red)
    cooling_color?: string;     // Color in cooling mode (default: #3498db blue)
    dhw_color?: string;         // Color in DHW mode (default: #e67e22 orange)
    defrost_color?: string;     // Color in defrost mode (default: #f1c40f yellow)
    show_metrics?: boolean;     // Show metrics below heat pump (default: true)
    animate_fan?: boolean;      // Animate fan rotation (default: true)
  };

  // Buffer Tank Configuration
  buffer_tank?: {
    supply_temp_entity?: string;  // Supply temperature
    return_temp_entity?: string;  // Return temperature
    level_entity?: string;         // Tank level (optional)
    name?: string;
    icon?: string;
  };

  // HVAC/Load Configuration
  hvac?: {
    thermal_entity?: string;      // Thermal power consumed (W)
    flow_rate_entity?: string;    // Flow rate to radiant floor (L/min)
    supply_temp_entity?: string;  // Supply temperature
    return_temp_entity?: string;  // Return temperature
    name?: string;
    icon?: string;
  };

  // Animation Configuration
  animation?: {
    min_flow_rate?: number;     // Minimum animation speed (seconds for dot to travel)
    max_flow_rate?: number;     // Maximum animation speed (seconds)
    dot_size?: number;          // Size of animated dots (radius)
    dot_spacing?: number;       // Spacing between dots
    use_temp_color?: boolean;   // Use temperature-based coloring (default: true)
    dot_color?: string;         // Fixed dot color (overrides temp color if use_temp_color is false)
    dot_stroke_color?: string;  // Dot border color (default: 'white')
    dot_stroke_width?: number;  // Dot border width (default: 1.5)
    dot_opacity?: number;       // Dot opacity 0-1 (default: 1)
    dot_shadow?: boolean;       // Show dot shadow for depth (default: true)
  };

  // Temperature Color Configuration
  temperature?: {
    min_temp?: number;      // Minimum temperature for color scale (°C or °F)
    max_temp?: number;      // Maximum temperature for color scale
    cold_color?: string;    // Color for minimum temp (default: blue)
    hot_color?: string;     // Color for maximum temp (default: red)
    unit?: 'C' | 'F';       // Temperature unit
  };

  // Display Configuration
  display?: {
    show_values?: boolean;    // Show numeric values
    show_labels?: boolean;    // Show entity labels
    show_icons?: boolean;     // Show entity icons
    compact?: boolean;        // Compact layout
    decimal_places?: number;  // Decimal places for values
  };
}

export interface HeatPumpState {
  power: number;
  thermal: number;
  cop: number;
  outletTemp: number;
  inletTemp: number;
  flowRate: number;
  fanSpeed?: number;           // Fan speed percentage (0-100)
  mode?: string;               // Operating mode
  defrost?: boolean;           // Defrost active
  error?: string;              // Error message
  energy?: number;             // Total energy (kWh)
  cost?: number;               // Energy cost
  runtime?: number;            // Runtime in seconds
}

export interface BufferTankState {
  supplyTemp: number;
  returnTemp: number;
  level?: number;
}

export interface HVACState {
  thermal: number;
  flowRate: number;
  supplyTemp: number;
  returnTemp: number;
}
