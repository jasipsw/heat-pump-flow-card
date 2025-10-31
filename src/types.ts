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
    name?: string;
    icon?: string;
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
    min_flow_rate?: number;  // Minimum animation speed (seconds for dot to travel)
    max_flow_rate?: number;  // Maximum animation speed (seconds)
    dot_size?: number;       // Size of animated dots
    dot_spacing?: number;    // Spacing between dots
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
