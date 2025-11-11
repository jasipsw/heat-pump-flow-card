import { LovelaceCardConfig } from 'custom-card-helpers';

export interface HeatPumpFlowCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  show_logo?: boolean;          // Show Heat Pump Flow Card logo in header (default: true)
  logo_path?: string;           // Path to logo image (default: '/local/heat-pump-flow.png')
  logo_url?: string;            // URL to open when clicking logo (default: GitHub README)
  logo_size?: number;           // Logo size in pixels (default: 40)

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
    // Temperature setpoints for target indicators
    heating_target_temp_entity?: string;  // Heating target temperature
    dhw_target_temp_entity?: string;      // DHW target temperature
    cooling_target_temp_entity?: string;  // Cooling target temperature
    // Electrical metrics
    amps_entity?: string;                 // Current (amps)
    volts_entity?: string;                // Voltage (volts)
    // Detailed metrics (optional)
    compressor_frequency_entity?: string; // Compressor frequency (Hz)
    discharge_temp_entity?: string;       // Compressor discharge temperature
    ambient_temp_entity?: string;         // Ambient air temperature
    dhw_temp_entity?: string;             // DHW temperature
    outdoor_coil_temp_entity?: string;    // Outdoor coil temperature
    suction_temp_entity?: string;         // Suction line temperature
    heat_exchanger_temp_entity?: string;  // Heat exchanger temperature
    plate_exchange_temp_entity?: string;  // Plate heat exchanger temperature
    // Additional detailed metrics
    ec_fan_motor_1_speed_entity?: string; // EC fan motor 1 speed
    ec_fan_motor_2_speed_entity?: string; // EC fan motor 2 speed
    bus_line_voltage_entity?: string;     // Bus line voltage (V)
    fan_shutdown_code_entity?: string;    // Fan shutdown code
    ipm_temp_entity?: string;             // IPM temperature
    compressor_running_time_entity?: string; // Compressor total running time
    e_heater_power_entity?: string;       // E-heater compensation power
    din6_mode_switch_entity?: string;     // DIN6 AC/heating mode switch
    din7_mode_switch_entity?: string;     // DIN7 AC/heating mode switch
    pump_enabled_entity?: string;         // Pump enabled status
    compressor_max_percentage_entity?: string; // Compressor max percentage
    show_detailed_metrics?: boolean;      // Show detailed metrics panel (default: false)
    name?: string;               // Generic name (deprecated, use display_name)
    icon?: string;               // Generic icon (deprecated, use logo_url)
    display_name?: string;       // Display name (e.g., "Chiltrix CX50-2")
    logo_url?: string;           // URL to logo image (local /local/... or external https://...)
    logo_background_color?: string; // Background color for logo area (default: transparent, e.g., "white", "#ffffff")
    logo_text_color?: string;    // Text color for brand name (default: dynamic based on HP state, e.g., "white", "#2c3e50")
  };

  // Custom Metrics Configuration
  // Displays additional sensors below the core heat pump metrics in three-column format
  metrics?: {
    entity: string;      // Sensor entity ID to display
    label: string;       // Custom abbreviation/label (e.g., "Cust1", "Temp", etc.)
    unit?: string;       // Optional unit override (default: use entity's unit_of_measurement)
    decimals?: number;   // Optional decimal places (default: 1)
  }[];

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
    name?: string;                 // Tank display name (default: BUFFER)
    icon?: string;
    logo_url?: string;             // Logo URL (displayed left of label)
    logo_background_color?: string; // Background color behind logo (e.g., "white", "#ffffff")
    logo_drop_shadow?: string;     // Drop shadow color (e.g., "rgba(0,0,0,0.5)")
    label_color?: string;          // Label text color (default: white)
    label_font_size?: number;      // Label font size in pixels (default: 12)
    gradient?: {
      enabled?: boolean;            // Enable gradient visualization (default: true)
      levels?: number;              // Number of gradient steps (default: 10)
      min_temp?: number | string;   // Min temp: hard-coded number or entity (e.g., sensor.indoor_temp or 60)
      max_temp?: number | string;   // Max temp: hard-coded number or entity (e.g., sensor.heating_setpoint or 130)
      min_temp_entity?: string;     // DEPRECATED: Use min_temp with entity string instead
      max_temp_entity?: string;     // DEPRECATED: Use max_temp with entity string instead
      min_temp_fallback?: number;   // DEPRECATED: Use min_temp with number instead
      max_temp_fallback?: number;   // DEPRECATED: Use max_temp with number instead
      bottom_color?: string;        // Bottom color (default: neutral_color)
      heating_top_color?: string;   // Top color for heating (default: hot_color)
      cooling_top_color?: string;   // Top color for cooling (default: cold_color)
    };
  };

  // DHW (Domestic Hot Water) Tank Configuration
  dhw_tank?: {
    inlet_temp_entity?: string;    // DHW coil inlet temperature
    outlet_temp_entity?: string;   // DHW coil outlet temperature
    tank_temp_entity?: string;     // DHW tank temperature (optional)
    name?: string;                 // Tank display name (default: DHW)
    icon?: string;
    logo_url?: string;             // Logo URL (displayed left of label)
    logo_background_color?: string; // Background color behind logo (e.g., "white", "#ffffff")
    logo_drop_shadow?: string;     // Drop shadow color (e.g., "rgba(0,0,0,0.5)")
    label_color?: string;          // Label text color (default: white)
    label_font_size?: number;      // Label font size in pixels (default: 12)
    // DHW coil circuit (heat exchanger inside tank)
    inlet_color?: string;             // DHW coil inlet temperature indicator color (default: #3498db blue)
    outlet_color?: string;            // DHW coil outlet temperature indicator color (default: #e74c3c red)
    // Street water inlet (cold water supply to tank)
    tank_inlet_flow_entity?: string;  // Street water flow rate (L/min) - optional, no animation if not provided
    tank_inlet_temp_entity?: string;  // Street water temperature
    tank_inlet_color?: string;        // Street water pipe color (default: #3498db light blue)
    tank_inlet_icon_url?: string;     // Icon URL for water source (default: water tower icon)
    tank_inlet_icon_color?: string;   // Icon color for MDI icons (default: var(--primary-text-color))
    // Hot water outlet (heated water from tank to house)
    tank_outlet_temp_entity?: string; // Hot water outlet temperature
    tank_outlet_color?: string;       // Hot water outlet pipe color (default: #e74c3c red)
    tank_outlet_icon_url?: string;    // Hot water outlet icon URL (default: faucet icon)
    tank_outlet_icon_color?: string;  // Icon color for MDI icons (default: var(--primary-text-color))
    gradient?: {
      enabled?: boolean;            // Enable gradient visualization (default: true)
      levels?: number;              // Number of gradient steps (default: 10)
      min_temp?: number | string;   // Min temp: hard-coded number or entity (e.g., sensor.street_water_temp or 60)
      max_temp?: number | string;   // Max temp: hard-coded number or entity (e.g., sensor.dhw_setpoint or 130)
      min_temp_entity?: string;     // DEPRECATED: Use min_temp with entity string instead
      max_temp_entity?: string;     // DEPRECATED: Use max_temp with entity string instead
      min_temp_fallback?: number;   // DEPRECATED: Use min_temp with number instead
      max_temp_fallback?: number;   // DEPRECATED: Use max_temp with number instead
      bottom_color?: string;        // Bottom color (default: neutral_color)
      top_color?: string;           // Top color (default: hot_color)
    };
  };

  // DHW Tank 2 (Secondary/Finishing Heater) - Optional
  dhw_tank_2?: {
    enabled?: boolean;                // Enable second DHW tank (default: false)
    inlet_temp_entity?: string;       // Inlet temperature (from first tank outlet)
    outlet_temp_entity?: string;      // Final outlet temperature (to house)
    tank_temp_entity?: string;        // Tank temperature (optional)
    name?: string;                    // Tank display name (default: DHW 2)
    logo_url?: string;                // Logo URL (displayed left of label)
    logo_background_color?: string;   // Background color behind logo (e.g., "white", "#ffffff")
    logo_drop_shadow?: string;        // Drop shadow color (e.g., "rgba(0,0,0,0.5)")
    label_color?: string;             // Label text color (default: white)
    label_font_size?: number;         // Label font size in pixels (default: 12)
    tank_outlet_icon_url?: string;    // Final outlet icon URL (default: faucet icon)
    tank_outlet_color?: string;       // Final outlet pipe color (default: #e74c3c red)
    tank_outlet_icon_color?: string;  // Icon color for MDI icons (default: var(--primary-text-color))
    gradient?: {
      enabled?: boolean;              // Enable gradient visualization (default: true)
      levels?: number;                // Number of gradient steps (default: 10)
      min_temp?: number | string;     // Min temp: hard-coded number or entity
      max_temp?: number | string;     // Max temp: hard-coded number or entity
      min_temp_entity?: string;       // DEPRECATED: Use min_temp with entity string instead
      max_temp_entity?: string;       // DEPRECATED: Use max_temp with entity string instead
      min_temp_fallback?: number;     // DEPRECATED: Use min_temp with number instead
      max_temp_fallback?: number;     // DEPRECATED: Use max_temp with number instead
      bottom_color?: string;          // Bottom color (default: neutral_color)
      top_color?: string;             // Top color (default: hot_color)
    };
  };

  // DHW Heating Diverter Valve Configuration (3-way valve between buffer and DHW)
  g2_valve?: {
    state_entity?: string;         // Entity indicating valve state (on=DHW mode, off=heating mode)
    name?: string;
  };

  // Auxiliary Heater Configuration (inline heater between HP and DHW diverter valve)
  aux_heater?: {
    enabled?: boolean;             // Show auxiliary heater visualization (default: false)
    power_entity?: string;         // Power consumption entity (W)
    max_power?: number;            // Maximum power for normalization (default: 18000W = 18kW)
    display_name?: string;         // Display name shown on visualization (e.g., "V18", "AUX", etc.)
    show_label?: boolean;          // Show label above heater (default: true when display_name is set)
    logo_url?: string;             // URL to brand logo image (local /local/... or external https://...)
    logo_background_color?: string; // Background color for logo (default: transparent, e.g., "white", "#ffffff")
    label_color?: string;          // Text color for label (default: "#2c3e50")
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
    logo_url?: string;            // Logo URL (displayed above HVAC load box)
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
    idle_threshold?: number;    // Flow rate (L/min) below which animations hide (default: 0)
    dot_size?: number;          // Size of animated particles in pixels (radius, default: 1.0)
    dot_spacing?: number;       // Spacing between dots (deprecated, controlled by count)
    use_temp_color?: boolean;   // Use temperature-based coloring (default: true)
    dot_color?: string;         // Fixed dot color (overrides temp color if use_temp_color is false)
    dot_opacity?: number;       // Dot opacity 0-1 (default: 0.9)
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

  // Temperature Status Indicators Configuration
  temperature_status?: {
    enabled?: boolean;                // Enable temperature status indicators (default: false)
    circle_radius?: number;           // Radius of status circles in pixels (default: 12)
    points?: {
      hp_outlet?: {
        enabled?: boolean;            // Enable indicator at heat pump outlet (default: true)
        entity?: string;              // Entity override (uses heat_pump.outlet_temp_entity if not set)
      };
      hp_inlet?: {
        enabled?: boolean;            // Enable indicator at heat pump inlet (default: true)
        entity?: string;              // Entity override (uses heat_pump.inlet_temp_entity if not set)
      };
      buffer_supply?: {
        enabled?: boolean;            // Enable indicator at buffer supply (default: true)
        entity?: string;              // Entity override (uses buffer_tank.supply_temp_entity if not set)
      };
      buffer_return?: {
        enabled?: boolean;            // Enable indicator at buffer return (default: true)
        entity?: string;              // Entity override (uses buffer_tank.return_temp_entity if not set)
      };
      hvac_supply?: {
        enabled?: boolean;            // Enable indicator at HVAC supply (default: true)
        entity?: string;              // Entity override (uses hvac.supply_temp_entity if not set)
      };
      hvac_return?: {
        enabled?: boolean;            // Enable indicator at HVAC return (default: true)
        entity?: string;              // Entity override (uses hvac.return_temp_entity if not set)
      };
      dhw_inlet?: {
        enabled?: boolean;            // Enable indicator at DHW inlet (default: true)
        entity?: string;              // Entity override (uses dhw_tank.inlet_temp_entity if not set)
      };
      dhw_outlet?: {
        enabled?: boolean;            // Enable indicator at DHW outlet (default: true)
        entity?: string;              // Entity override (uses dhw_tank.outlet_temp_entity if not set)
      };
      dhw_tank_inlet?: {
        enabled?: boolean;            // Enable indicator at DHW tank cold inlet (default: true)
        entity?: string;              // Entity override (uses dhw_tank.tank_inlet_temp_entity if not set)
      };
      dhw_tank_outlet?: {
        enabled?: boolean;            // Enable indicator at DHW tank hot outlet (default: true)
        entity?: string;              // Entity override (uses dhw_tank.tank_outlet_temp_entity if not set)
      };
      dhw_tank_2_outlet?: {
        enabled?: boolean;            // Enable indicator at DHW tank 2 outlet (default: true)
        entity?: string;              // Entity override (uses dhw_tank_2.outlet_temp_entity if not set)
      };
    };
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
  // Temperature setpoints
  heatingTargetTemp?: number;  // Heating target temperature
  dhwTargetTemp?: number;      // DHW target temperature
  coolingTargetTemp?: number;  // Cooling target temperature
  // Electrical metrics
  amps?: number;               // Current (amps)
  volts?: number;              // Voltage (volts)
  // Detailed metrics (optional)
  compressorFrequency?: number;  // Compressor frequency (Hz)
  dischargeTemp?: number;        // Compressor discharge temperature
  ambientTemp?: number;          // Ambient air temperature
  dhwTemp?: number;              // DHW temperature
  outdoorCoilTemp?: number;      // Outdoor coil temperature
  suctionTemp?: number;          // Suction line temperature
  heatExchangerTemp?: number;    // Heat exchanger temperature
  plateExchangeTemp?: number;    // Plate heat exchanger temperature
  // Additional detailed metrics
  ecFanMotor1Speed?: number;     // EC fan motor 1 speed
  ecFanMotor2Speed?: number;     // EC fan motor 2 speed
  busLineVoltage?: number;       // Bus line voltage (V)
  fanShutdownCode?: number;      // Fan shutdown code
  ipmTemp?: number;              // IPM temperature
  compressorRunningTime?: number; // Compressor total running time
  eHeaterPower?: number;         // E-heater compensation power
  din6ModeSwitch?: number;       // DIN6 AC/heating mode switch
  din7ModeSwitch?: number;       // DIN7 AC/heating mode switch
  pumpEnabled?: boolean;         // Pump enabled status
  compressorMaxPercentage?: number; // Compressor max percentage
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
  inletTemp: number;         // DHW coil inlet (hot from HP)
  outletTemp: number;        // DHW coil outlet (return to HP)
  tankTemp?: number;         // Tank water temperature
  tankInletFlow?: number;    // Street water flow rate (L/min)
  tankInletTemp?: number;    // Street water temperature
  tankOutletTemp?: number;   // Hot water outlet temperature
}

export interface DHWTank2State {
  enabled: boolean;          // Is second tank enabled
  inletTemp: number;         // Inlet temperature (from first tank)
  outletTemp: number;        // Final outlet temperature (to house)
  tankTemp?: number;         // Tank water temperature
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
