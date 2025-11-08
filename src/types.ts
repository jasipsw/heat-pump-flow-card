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
    mode_display_entity?: string; // Mode display text entity (e.g., "Heat+DHW", "Heating Only")
    defrost_entity?: string;     // Defrost mode (binary sensor)
    error_entity?: string;       // Error/alarm sensor
    energy_entity?: string;      // Total energy consumed (kWh)
    cost_entity?: string;        // Energy cost
    runtime_entity?: string;     // Runtime sensor (optional)
    name?: string;               // Generic name (deprecated, use display_name)
    icon?: string;               // Generic icon (deprecated, use logo_url)
    display_name?: string;       // Display name (e.g., "Chiltrix CX50-2")
    logo_url?: string;           // URL to logo image (local /local/... or external https://...)
    logo_background_color?: string; // Background color for logo area (default: transparent, e.g., "white", "#ffffff")
    logo_text_color?: string;    // Text color for brand name (default: dynamic based on HP state, e.g., "white", "#2c3e50")
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

  // DHW (Domestic Hot Water) Tank Configuration
  dhw_tank?: {
    inlet_temp_entity?: string;    // DHW coil inlet temperature
    outlet_temp_entity?: string;   // DHW coil outlet temperature
    tank_temp_entity?: string;     // DHW tank temperature (optional)
    name?: string;
    icon?: string;
  };

  // G2 Valve Configuration (diverter valve between buffer and DHW)
  g2_valve?: {
    state_entity?: string;         // Entity indicating valve state (on=DHW mode, off=heating mode)
    name?: string;
  };

  // Auxiliary Heater Configuration (inline heater between HP and G2)
  aux_heater?: {
    enabled?: boolean;             // Show auxiliary heater visualization (default: false)
    power_entity?: string;         // Power consumption entity (W)
    max_power?: number;            // Maximum power for normalization (default: 18000W = 18kW)
    display_name?: string;         // Display name shown on visualization (e.g., "V18", "AUX", etc.)
    glow_size?: number;            // Glow animation extension in pixels (default: 8, larger = more dramatic)
    shadow_blur?: number;          // Drop-shadow blur intensity multiplier (default: 1.0, 2.0 = double blur)
    name?: string;                 // Internal name (deprecated, use display_name)
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

  // House/Building Performance Configuration
  house?: {
    heat_loss_kw_entity?: string;                    // Real-time heat loss (kW)
    heat_loss_btu_h_entity?: string;                 // Real-time heat loss (BTU/h)
    projected_max_heat_loss_kw_entity?: string;      // Manual J projected max (kW)
    projected_max_heat_loss_btu_h_entity?: string;   // Manual J projected max (BTU/h)
    heat_loss_coefficient_kw_c_entity?: string;      // Calculated coefficient (kW/°C)
    heat_loss_coefficient_energy_entity?: string;    // Energy-based coefficient
    indoor_temp_entity?: string;                     // Average indoor temperature
    outdoor_temp_entity?: string;                    // Outdoor temperature
    delta_t_raw_entity?: string;                     // Raw delta-T (indoor - outdoor)
    delta_t_24h_mean_entity?: string;                // 24-hour mean delta-T
    thermal_energy_used_daily_entity?: string;       // Daily HVAC energy used
    thermal_energy_produced_daily_entity?: string;   // Daily HP energy produced
    name?: string;
  };

  // Animation Configuration
  animation?: {
    enabled?: boolean;          // Enable/disable all animations (default: true)
    min_flow_rate?: number;     // SLOW animation duration in seconds (used at low flow)
    max_flow_rate?: number;     // FAST animation duration in seconds (used at high flow)
    max_flow_rate_value?: number;  // Flow rate (L/min) that triggers fastest animation (default: 50)
    dot_size?: number;          // Size of animated dots (radius)
    dot_spacing?: number;       // Spacing between dots
    use_temp_color?: boolean;   // Use temperature-based coloring (default: true)
    dot_color?: string;         // Fixed dot color (overrides temp color if use_temp_color is false)
    dot_stroke_color?: string;  // Dot border color (default: 'white')
    dot_stroke_width?: number;  // Dot border width (default: 1.0)
    dot_stroke_opacity?: number; // Dot stroke opacity 0-1 (default: 0.8)
    dot_opacity?: number;       // Dot opacity 0-1 (default: 1)
    dot_shadow?: boolean;       // Show dot shadow for depth (default: true)
  };

  // Temperature Color Configuration (Delta-based pipe coloring)
  temperature?: {
    delta_threshold?: number;  // Minimum temp difference to show hot/cold colors (default: 10)
    hot_color?: string;        // Color for hotter pipe (default: #e74c3c red)
    cold_color?: string;       // Color for cooler pipe (default: #3498db blue)
    neutral_color?: string;    // Color when delta < threshold or no flow (default: #95a5a6 gray)
    unit?: 'C' | 'F';          // Temperature unit
  };

  // Text Style Configuration (for temperatures and flow rates)
  text_style?: {
    font_family?: string;      // Font family (default: 'Courier New, monospace' for computer-like look)
    font_size?: number;        // Font size in px (default: 11)
    font_weight?: string;      // Font weight (default: 'bold')
    show_labels?: boolean;     // Show descriptive labels like "HP Supply:" (default: false)
  };

  // Display Configuration
  display?: {
    show_values?: boolean;    // Show numeric values
    show_labels?: boolean;    // Show entity labels
    show_icons?: boolean;     // Show entity icons
    compact?: boolean;        // Compact layout
    decimal_places?: number;  // Decimal places for values
  };

  // Labels Configuration (for internationalization)
  labels?: {
    hp_supply?: string;       // Heat pump supply label (default: "HP Supply")
    hp_return?: string;       // Heat pump return label (default: "HP Return")
    hvac_supply?: string;     // HVAC supply label (default: "HVAC Supply")
    hvac_return?: string;     // HVAC return label (default: "HVAC Return")
    buffer_tank?: string;     // Buffer tank label (default: "BUFFER TANK")
    dhw_tank?: string;        // DHW tank label (default: "DHW")
    power_in?: string;        // Power in label (default: "Power In")
    thermal_out?: string;     // Thermal out label (default: "Thermal Out")
    cop?: string;             // COP label (default: "COP")
    flow?: string;            // Flow label (default: "Flow")
    energy?: string;          // Energy label (default: "Energy")
    cost?: string;            // Cost label (default: "Cost")
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
  modeDisplay?: string;        // Mode display text (e.g., "Heat+DHW")
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

export interface DHWTankState {
  inletTemp: number;
  outletTemp: number;
  tankTemp?: number;
}

export interface G2ValveState {
  isActive: boolean;  // true = DHW mode, false = heating mode
}

export interface AuxHeaterState {
  enabled: boolean;      // Is auxiliary heater enabled in config
  power: number;         // Current power consumption (W)
  maxPower: number;      // Maximum power for normalization
  intensity: number;     // Normalized intensity 0-1 (power / max_power)
  displayName: string;   // Display name for the heater (e.g., "V18", "AUX")
}

export interface HousePerformanceState {
  heatLossKw?: number;                // Real-time heat loss (kW)
  heatLossBtuH?: number;              // Real-time heat loss (BTU/h)
  projectedMaxHeatLossKw?: number;    // Manual J projected max (kW)
  projectedMaxHeatLossBtuH?: number;  // Manual J projected max (BTU/h)
  heatLossCoefficientKwC?: number;    // Calculated coefficient (kW/°C)
  heatLossCoefficientEnergy?: number; // Energy-based coefficient
  indoorTemp?: number;                // Average indoor temperature
  outdoorTemp?: number;               // Outdoor temperature
  deltaTRaw?: number;                 // Raw delta-T
  deltaT24hMean?: number;             // 24-hour mean delta-T
  thermalEnergyUsedDaily?: number;    // Daily HVAC energy used
  thermalEnergyProducedDaily?: number; // Daily HP energy produced
}
