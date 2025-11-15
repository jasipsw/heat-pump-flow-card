import { LitElement, html, css, PropertyValues, svg } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HeatPumpFlowCardConfig, HeatPumpState, BufferTankState, HVACState, DHWTankState, DHWTank2State, G2ValveState, AuxHeaterState, HousePerformanceState } from './types';
import { CARD_VERSION, BUILD_TIMESTAMP } from './const';
import { cardStyles } from './styles';

console.info(
  `%c  HEAT-PUMP-FLOW-CARD  \n%c  Version ${CARD_VERSION}  \n%c  Built: ${BUILD_TIMESTAMP}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
  'color: #95a5a6; font-weight: normal; background: dimgray',
);

@customElement('heat-pump-flow-card')
export class HeatPumpFlowCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: HeatPumpFlowCardConfig;

  @query('#hp-to-buffer-flow') hpToBufferFlow?: SVGGElement;
  @query('#buffer-to-hp-flow') bufferToHpFlow?: SVGGElement;
  @query('#buffer-to-hvac-flow') bufferToHvacFlow?: SVGGElement;
  @query('#hvac-to-buffer-flow') hvacToBufferFlow?: SVGGElement;

  public static getConfigElement(): LovelaceCardEditor | undefined {
    // No visual editor yet - users can edit YAML directly
    return undefined;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      type: 'custom:heat-pump-flow-card',
      title: 'Heat Pump Flow',
    };
  }

  public setConfig(config: HeatPumpFlowCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    // Merge config with defaults, preserving nested object defaults
    const { animation, temperature, display, heat_pump_visual, labels, temperature_status, ...restConfig } = config;

    this.config = {
      ...restConfig,
      animation: {
        enabled: true,
        min_flow_rate: 5,
        max_flow_rate: 1,
        max_flow_rate_value: 50,
        idle_threshold: 0,  // Hide animations at/below this flow rate (L/min)
        ...animation,
      },
      temperature: {
        delta_threshold: 10,
        hot_color: '#e74c3c',
        cold_color: '#3498db',
        neutral_color: '#95a5a6',
        unit: 'C',
        ...temperature,
      },
      display: {
        show_values: true,
        show_labels: true,
        show_icons: true,
        compact: false,
        decimal_places: 1,
        ...display,
      },
      heat_pump_visual: {
        off_color: '#95a5a6',
        heating_color: '#e74c3c',
        cooling_color: '#3498db',
        dhw_color: '#e67e22',
        defrost_color: '#f1c40f',
        show_metrics: true,
        animate_fan: true,
        ...heat_pump_visual,
      },
      labels: {
        hp_supply: 'HP Supply',
        hp_return: 'HP Return',
        hvac_supply: 'HVAC Supply',
        hvac_return: 'HVAC Return',
        buffer_tank: 'BUFFER',
        dhw_tank: 'DHW',
        power_in: 'Power In',
        thermal_out: 'Thermal Out',
        cop: 'COP',
        flow: 'Flow',
        energy: 'Energy',
        cost: 'Cost',
        ...labels,
      },
      temperature_status: {
        enabled: false,
        circle_radius: 12,
        ...temperature_status,
        points: {
          hp_outlet: { enabled: true },
          hp_inlet: { enabled: true },
          buffer_supply: { enabled: true },
          buffer_return: { enabled: true },
          hvac_supply: { enabled: true },
          hvac_return: { enabled: true },
          dhw_inlet: { enabled: true },
          dhw_outlet: { enabled: true },
          dhw_tank_inlet: { enabled: true },
          dhw_tank_outlet: { enabled: true },
          dhw_tank_2_outlet: { enabled: true },
          ...temperature_status?.points,
        },
      },
    };
  }

  private lastRenderTime = 0;
  private lastHassState: any = {};

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    // Always update on config changes
    if (changedProps.has('config')) {
      return true;
    }

    // Throttle hass updates to max once per second (prevents freezing from frequent sensor updates)
    if (changedProps.has('hass')) {
      const now = Date.now();
      if (now - this.lastRenderTime < 1000) {
        // Still update CSS animation variables even when not re-rendering
        this.updateAnimationVariables();
        return false;
      }
      this.lastRenderTime = now;
    }

    return super.shouldUpdate(changedProps);
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      // Update CSS animation variables (CSS handles the actual animation loop)
      this.updateAnimationVariables();
    }
  }

  protected firstUpdated(): void {
    // Animation variables setup (CSS handles animation automatically via pipe overlays)
    if (this.config.animation.enabled) {
      setTimeout(() => {
        this.updateAnimationVariables();
      }, 100);
    }

    // Debug helper: expose card instance globally
    (window as any).debugCard = () => {
      const card = document.querySelector('heat-pump-flow-card');
      if (card) {
        console.log('Card found:', card);
        console.log('Shadow root:', card.shadowRoot);
        return {
          card,
          shadowRoot: card.shadowRoot,
          config: this.config,
          dhwTank2State: this.getDHWTank2State(),
          querySelector: (selector: string) => card.shadowRoot?.querySelector(selector)
        };
      }
      return null;
    };
  }

  // Flow animation now uses animated gradient overlays (SVG SMIL animations)
  // No JavaScript animation updates needed - SVG handles animation automatically

  private updateAnimationVariables(): void {
    // Only update fan animation
    this.updateFanAnimation();
  }

  private updateFanAnimation(): void {
    const fanBlades = this.shadowRoot?.querySelector('#fan-blades');
    if (!fanBlades || !this.config.heat_pump_visual?.animate_fan) return;

    const hpState = this.getHeatPumpState();
    const fanSpeed = hpState.fanSpeed || 0;

    if (fanSpeed > 0) {
      // Add CSS animation class
      fanBlades.classList.add('fan-rotating');
      // At 100% speed: 1 second per rotation, at 50%: 2 seconds, etc.
      const duration = fanSpeed > 0 ? (100 / fanSpeed) : 999;
      (fanBlades as SVGElement).style.setProperty('--fan-duration', `${duration}s`);
    } else {
      fanBlades.classList.remove('fan-rotating');
    }
  }

  private getHeatPumpState(): HeatPumpState {
    const cfg = this.config.heat_pump || {};
    return {
      power: this.getStateValue(cfg.power_entity) || 0,
      thermal: this.getStateValue(cfg.thermal_entity) || 0,
      cop: this.getStateValue(cfg.cop_entity) || 0,
      outletTemp: this.getStateValue(cfg.outlet_temp_entity) || 0,
      inletTemp: this.getStateValue(cfg.inlet_temp_entity) || 0,
      flowRate: this.getStateValue(cfg.flow_rate_entity) || 0,
      fanSpeed: this.getStateValue(cfg.fan_speed_entity),
      mode: this.getStateString(cfg.mode_entity),
      modeDisplay: this.getStateString(cfg.mode_display_entity),
      defrost: this.getStateString(cfg.defrost_entity) === 'on',
      error: this.getStateString(cfg.error_entity),
      energy: this.getStateValue(cfg.energy_entity),
      cost: this.getStateValue(cfg.cost_entity),
      runtime: this.getStateValue(cfg.runtime_entity),
      // Temperature setpoints
      heatingTargetTemp: this.getStateValue(cfg.heating_target_temp_entity),
      dhwTargetTemp: this.getStateValue(cfg.dhw_target_temp_entity),
      coolingTargetTemp: this.getStateValue(cfg.cooling_target_temp_entity),
      // Electrical metrics
      amps: this.getStateValue(cfg.amps_entity),
      volts: this.getStateValue(cfg.volts_entity),
      // Detailed metrics
      compressorFrequency: this.getStateValue(cfg.compressor_frequency_entity),
      dischargeTemp: this.getStateValue(cfg.discharge_temp_entity),
      ambientTemp: this.getStateValue(cfg.ambient_temp_entity),
      dhwTemp: this.getStateValue(cfg.dhw_temp_entity),
      outdoorCoilTemp: this.getStateValue(cfg.outdoor_coil_temp_entity),
      suctionTemp: this.getStateValue(cfg.suction_temp_entity),
      heatExchangerTemp: this.getStateValue(cfg.heat_exchanger_temp_entity),
      plateExchangeTemp: this.getStateValue(cfg.plate_exchange_temp_entity),
      // Additional detailed metrics
      ecFanMotor1Speed: this.getStateValue(cfg.ec_fan_motor_1_speed_entity),
      ecFanMotor2Speed: this.getStateValue(cfg.ec_fan_motor_2_speed_entity),
      busLineVoltage: this.getStateValue(cfg.bus_line_voltage_entity),
      fanShutdownCode: this.getStateValue(cfg.fan_shutdown_code_entity),
      ipmTemp: this.getStateValue(cfg.ipm_temp_entity),
      compressorRunningTime: this.getStateValue(cfg.compressor_running_time_entity),
      eHeaterPower: this.getStateValue(cfg.e_heater_power_entity),
      din6ModeSwitch: this.getStateValue(cfg.din6_mode_switch_entity),
      din7ModeSwitch: this.getStateValue(cfg.din7_mode_switch_entity),
      pumpEnabled: this.getStateString(cfg.pump_enabled_entity) === 'on',
      compressorMaxPercentage: this.getStateValue(cfg.compressor_max_percentage_entity),
    };
  }

  private getStateString(entityId: string | undefined): string | undefined {
    if (!entityId || !this.hass) return undefined;
    const state = this.hass.states[entityId];
    return state?.state;
  }

  private getBufferTankState(): BufferTankState {
    const cfg = this.config.buffer_tank || {};
    return {
      supplyTemp: this.getStateValue(cfg.supply_temp_entity) || 0,
      returnTemp: this.getStateValue(cfg.return_temp_entity) || 0,
      level: this.getStateValue(cfg.level_entity),
      tankTemp: this.getStateValue(cfg.tank_temp_entity),
    };
  }

  private getHVACState(): HVACState {
    const cfg = this.config.hvac || {};
    return {
      thermal: this.getStateValue(cfg.thermal_entity) || 0,
      flowRate: this.getStateValue(cfg.flow_rate_entity) || 0,
      supplyTemp: this.getStateValue(cfg.supply_temp_entity) || 0,
      returnTemp: this.getStateValue(cfg.return_temp_entity) || 0,
    };
  }

  private getDHWTankState(): DHWTankState {
    const cfg = this.config.dhw_tank || {};
    return {
      inletTemp: this.getStateValue(cfg.inlet_temp_entity) || 0,
      outletTemp: this.getStateValue(cfg.outlet_temp_entity) || 0,
      tankTemp: this.getStateValue(cfg.tank_temp_entity),
      tankInletFlow: this.getStateValue(cfg.tank_inlet_flow_entity),
      tankInletTemp: this.getStateValue(cfg.tank_inlet_temp_entity),
      tankOutletTemp: this.getStateValue(cfg.tank_outlet_temp_entity),
    };
  }

  private getDHWTank2State(): DHWTank2State {
    const cfg = this.config.dhw_tank_2 || {};
    const enabled = cfg.enabled || false;
    return {
      enabled,
      inletTemp: this.getStateValue(cfg.inlet_temp_entity) || 0,
      outletTemp: this.getStateValue(cfg.outlet_temp_entity) || 0,
      tankTemp: this.getStateValue(cfg.tank_temp_entity),
    };
  }

  private getG2ValveState(): G2ValveState {
    const cfg = this.config.g2_valve || {};
    const stateString = this.getStateString(cfg.state_entity);
    // Consider 'on', 'true', '1' as active (DHW mode)
    const isActive = stateString === 'on' || stateString === 'true' || stateString === '1';
    return {
      isActive,
    };
  }

  private getAuxHeaterState(): AuxHeaterState {
    const cfg = this.config.aux_heater || {};
    const enabled = cfg.enabled || false;
    const power = this.getStateValue(cfg.power_entity) || 0;
    const maxPower = cfg.max_power || 18000; // Default 18kW
    const intensity = Math.min(power / maxPower, 1); // Normalize to 0-1, cap at 1
    const displayName = cfg.display_name || cfg.name || 'AUX'; // Fallback to deprecated name field, then "AUX"
    return {
      enabled,
      power,
      maxPower,
      intensity,
      displayName,
    };
  }

  private getStateValue(entityId: string | undefined): number | undefined {
    if (!entityId || !this.hass) return undefined;
    const state = this.hass.states[entityId];
    if (!state) return undefined;
    const value = parseFloat(state.state);
    return isNaN(value) ? undefined : value;
  }

  private getStateUnit(entityId: string | undefined): string {
    if (!entityId || !this.hass) return '';
    const state = this.hass.states[entityId];
    return state?.attributes?.unit_of_measurement || '';
  }

  private formatValue(value: number | undefined, decimals: number = 1): string {
    if (value === undefined) return 'N/A';
    return value.toFixed(decimals);
  }

  /**
   * Render tank temperature indicator circle (centered in tank)
   * Shows the actual tank temperature when available
   */
  private renderTankTempIndicator(
    x: number,
    y: number,
    tankTemp: number | undefined,
    tankTempEntity: string | undefined,
    showIndicator: boolean | undefined,
    indicatorRadius: number | undefined,
    tankColor: string
  ) {
    // Check if indicator is enabled and temperature is available
    if (!showIndicator || !tankTempEntity || tankTemp === undefined || isNaN(tankTemp)) {
      return svg``;
    }

    const radius = indicatorRadius || 15;

    return svg`
      <g class="tank-temp-indicator"
         style="cursor: pointer;"
         @click="${(e: Event) => this.handleTemperatureClick(e, tankTempEntity)}">
        <!-- Circle with white fill and colored border -->
        <circle
          cx="${x}"
          cy="${y}"
          r="${radius}"
          fill="white"
          stroke="${tankColor}"
          stroke-width="2.5"
          opacity="0.95"
          filter="url(#circle-shadow)" />

        <!-- Temperature text -->
        <text
          x="${x}"
          y="${y + 1}"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${tankColor}"
          font-size="10"
          font-weight="bold"
          letter-spacing="-0.5"
          font-family="Arial, sans-serif">
          ${this.formatValue(tankTemp, 1)}°
        </text>
      </g>
    `;
  }

  /**
   * Handle click on temperature indicator to show history graph
   */
  private handleTemperatureClick(event: Event, entityId: string): void {
    event.stopPropagation();
    if (!entityId || !this.hass) return;

    // Fire Home Assistant event to show more-info dialog
    const customEvent = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(customEvent);
  }

  /**
   * Render temperature status indicator circle
   */
  private renderTemperatureIndicator(
    x: number,
    y: number,
    entityId: string | undefined,
    temperature: number,
    pointConfig: { enabled?: boolean } | undefined,
    pipeColor: string
  ) {
    // Check if temperature status is enabled globally and for this point
    if (!this.config.temperature_status?.enabled || !pointConfig?.enabled || !entityId) {
      return svg``;
    }

    if (temperature === undefined || isNaN(temperature)) {
      return svg``;
    }

    const cfg = this.config.temperature_status!;
    const radius = cfg.circle_radius || 12;

    return svg`
      <g class="temp-status-indicator"
         style="cursor: pointer;"
         @click="${(e: Event) => this.handleTemperatureClick(e, entityId)}">
        <!-- Circle with white fill and pipe-colored border -->
        <circle
          cx="${x}"
          cy="${y}"
          r="${radius}"
          fill="white"
          stroke="${pipeColor}"
          stroke-width="2"
          opacity="0.95"
          filter="url(#circle-shadow)" />

        <!-- Temperature text with condensed spacing -->
        <text
          x="${x}"
          y="${y + 1}"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${pipeColor}"
          font-size="7.5"
          font-weight="bold"
          letter-spacing="-0.5"
          font-family="Arial, sans-serif">
          ${this.formatValue(temperature, 1)}°
        </text>
      </g>
    `;
  }

  /**
   * Calculate pipe colors based on temperature delta between supply and return
   * Returns {hotPipe, coldPipe} colors based on delta threshold
   */
  private getPipeColors(hotTemp: number, coldTemp: number, flowRate: number): { hotPipe: string; coldPipe: string } {
    const cfg = this.config.temperature!;
    const delta = Math.abs(hotTemp - coldTemp);

    // If flow below idle threshold or delta below threshold, both pipes are neutral
    if (flowRate <= this.config.animation!.idle_threshold! || delta < cfg.delta_threshold!) {
      return {
        hotPipe: cfg.neutral_color!,
        coldPipe: cfg.neutral_color!
      };
    }

    // Delta above threshold - color based on which is hotter
    if (hotTemp > coldTemp) {
      return {
        hotPipe: cfg.hot_color!,
        coldPipe: cfg.cold_color!
      };
    } else {
      // If coldTemp is actually hotter (reversed flow?)
      return {
        hotPipe: cfg.cold_color!,
        coldPipe: cfg.hot_color!
      };
    }
  }

  /**
   * Generate gradient levels for tank visualization
   * Returns object with gradient levels array and fill percentage
   */
  private generateTankGradient(
    tankType: 'buffer' | 'dhw' | 'dhw_tank_2',
    currentTemp: number,
    isHeating: boolean
  ): { levels: Array<{ y: number; height: number; color: string; opacity: number }>; fillPercentage: number } {
    const gradientConfig = tankType === 'buffer'
      ? this.config.buffer_tank?.gradient
      : tankType === 'dhw_tank_2'
      ? this.config.dhw_tank_2?.gradient
      : this.config.dhw_tank?.gradient;

    // Get min/max temperature values with new flexible configuration
    // Priority: min_temp/max_temp (new) > min_temp_entity/max_temp_entity (deprecated) > defaults
    let minTemp: number;
    let maxTemp: number;

    // Get min temperature
    if (gradientConfig?.min_temp !== undefined) {
      // New config: can be number or entity
      const tempValue = typeof gradientConfig.min_temp === 'number'
        ? gradientConfig.min_temp
        : this.getStateValue(gradientConfig.min_temp);
      minTemp = tempValue ?? 60;
    } else {
      // Fallback to deprecated config
      minTemp = this.getStateValue(gradientConfig?.min_temp_entity) ?? gradientConfig?.min_temp_fallback ?? 60;
    }

    // Get max temperature
    if (gradientConfig?.max_temp !== undefined) {
      // New config: can be number or entity
      const tempValue = typeof gradientConfig.max_temp === 'number'
        ? gradientConfig.max_temp
        : this.getStateValue(gradientConfig.max_temp);
      maxTemp = tempValue ?? 130;
    } else {
      // Fallback to deprecated config
      maxTemp = this.getStateValue(gradientConfig?.max_temp_entity) ?? gradientConfig?.max_temp_fallback ?? 130;
    }

    // Calculate fill ratio (how full the tank is with hot water)
    const tempRange = maxTemp - minTemp;
    const fillRatio = tempRange > 0 ? Math.max(0, Math.min(1, (currentTemp - minTemp) / tempRange)) : 0;
    const fillPercentage = Math.round(fillRatio * 100);

    // Check if gradient visualization is disabled
    if (gradientConfig?.enabled === false) {
      return { levels: [], fillPercentage };  // Return percentage but empty gradient
    }

    // Get configuration for gradient visualization
    const levels = Math.max(2, gradientConfig?.levels ?? 10);  // Minimum 2 levels to avoid division by zero
    const bottomColor = gradientConfig?.bottom_color ?? this.config.temperature?.neutral_color ?? '#95a5a6';

    // Determine top color based on mode
    let topColor: string;
    if (tankType === 'buffer') {
      topColor = isHeating
        ? (gradientConfig?.heating_top_color ?? this.config.temperature?.hot_color ?? '#e74c3c')
        : (gradientConfig?.cooling_top_color ?? this.config.temperature?.cold_color ?? '#3498db');
    } else {
      // DHW tank always uses heating color
      topColor = gradientConfig?.top_color ?? this.config.temperature?.hot_color ?? '#e74c3c';
    }

    // Tank dimensions (from SVG)
    const tankStartY = 25;  // Start Y position of water area
    const tankHeight = 130; // Total height of water area (160 - 25 - 5)
    const levelHeight = tankHeight / levels;

    // Generate gradient levels from bottom to top
    const gradientLevels: Array<{ y: number; height: number; color: string; opacity: number }> = [];

    for (let i = 0; i < levels; i++) {
      const levelRatio = i / (levels - 1);  // 0 at bottom, 1 at top
      const levelY = tankStartY + tankHeight - ((i + 1) * levelHeight);  // Start from bottom

      // Interpolate color from bottom to top
      const color = this.interpolateColor(bottomColor, topColor, levelRatio);

      // Calculate opacity based on fill level
      // Levels below fillRatio are "filled" (high opacity), above are "empty" (low opacity)
      const levelBottomRatio = i / levels;
      const levelTopRatio = (i + 1) / levels;
      const levelMidRatio = (levelBottomRatio + levelTopRatio) / 2;

      const opacity = levelMidRatio <= fillRatio ? 0.95 : 0.05;

      gradientLevels.push({
        y: levelY,
        height: levelHeight,
        color: color,
        opacity: opacity
      });
    }

    return {
      levels: gradientLevels,
      fillPercentage
    };
  }

  /**
   * Render gradient rectangles for tank visualization
   */
  private renderGradientRects(levels: Array<{ y: number; height: number; color: string; opacity: number }>) {
    // Use svg template literal to render rects as direct SVG children
    const rects = [];
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      rects.push(svg`<rect x="15" y="${level.y}" width="60" height="${level.height}" fill="${level.color}" opacity="${level.opacity}"></rect>`);
    }
    return rects;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    // Handle CSS color names
    const colorNames: Record<string, string> = {
      'black': '#000000', 'white': '#FFFFFF', 'red': '#FF0000', 'green': '#008000',
      'blue': '#0000FF', 'yellow': '#FFFF00', 'cyan': '#00FFFF', 'magenta': '#FF00FF',
      'orange': '#FFA500', 'purple': '#800080', 'pink': '#FFC0CB', 'brown': '#A52A2A',
      'gray': '#808080', 'grey': '#808080'
    };

    // Convert color name to hex if needed
    const color = colorNames[hex.toLowerCase()] || hex;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  private interpolateColor(color1: string, color2: string, ratio: number): string {
    // Clamp ratio between 0 and 1
    ratio = Math.max(0, Math.min(1, ratio));

    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private getHeatPumpColor(state: HeatPumpState): string {
    const cfg = this.config.heat_pump_visual!;

    // Priority: defrost > mode > power
    if (state.defrost) {
      return cfg.defrost_color!;
    }

    // Check if heat pump is powered on
    if (state.power <= 0) {
      return cfg.off_color!;
    }

    // Determine color based on mode (use modeDisplay as fallback if mode not configured)
    const mode = (state.mode || state.modeDisplay)?.toLowerCase();
    if (mode?.includes('heat')) {
      return cfg.heating_color!;
    } else if (mode?.includes('cool')) {
      return cfg.cooling_color!;
    } else if (mode?.includes('dhw') || mode?.includes('hot water')) {
      return cfg.dhw_color!;
    }

    // Default to off color if mode unknown but power is low
    return cfg.off_color!;
  }

  private getDisplayMode(hpState: HeatPumpState, g2ValveState: G2ValveState): string {
    // If mode is explicitly configured, use it
    if (hpState.mode) {
      return hpState.mode.toUpperCase();
    }

    // If mode display is configured, use it
    if (hpState.modeDisplay) {
      return hpState.modeDisplay.toUpperCase();
    }

    // Infer mode from system state
    if (hpState.defrost) {
      return 'DEFROST';
    }

    if (hpState.power <= 0 && hpState.thermal <= 0) {
      return 'OFF';
    }

    // If power is on, infer from G2 valve position
    if (hpState.power > 0) {
      if (g2ValveState.isActive) {
        return 'DHW';
      } else {
        return 'HEATING';
      }
    }

    return 'OFF';
  }

  private getContrastTextColor(bgColor: string): string {
    // Convert hex color to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate relative luminance using WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Account for semi-transparent background (opacity 0.2 over light background)
    // Effective luminance is much higher due to background showing through
    // Use lower threshold (0.35) so medium-luminance colors get dark text
    // This ensures red (#e74c3c, luminance ~0.47) gets dark text for readability
    return luminance > 0.35 ? '#2c3e50' : '#ffffff';
  }

  /**
   * Renders an icon that supports both URLs and MDI icons (mdi:icon-name format)
   * Uses foreignObject to embed ha-icon for MDI icons, or image tag for URLs
   */
  private renderIcon(iconOrUrl: string, x: number, y: number, width: number, height: number, opacity: number = 0.8, color?: string) {
    if (iconOrUrl.startsWith('mdi:')) {
      // Render MDI icon using Home Assistant's ha-icon component
      // Add padding to foreignObject to prevent clipping
      const padding = 5;
      return svg`
        <foreignObject x="${x - padding}" y="${y - padding}" width="${width + padding * 2}" height="${height + padding * 2}">
          <ha-icon
            icon="${iconOrUrl}"
            style="
              --mdc-icon-size: ${width}px;
              width: ${width}px;
              height: ${height}px;
              display: block;
              color: ${color || 'var(--primary-text-color)'};
              opacity: ${opacity};
              padding: ${padding}px;
            "
          ></ha-icon>
        </foreignObject>
      `;
    } else {
      // Render regular image URL
      return svg`
        <image
          x="${x}"
          y="${y}"
          width="${width}"
          height="${height}"
          href="${iconOrUrl}"
          opacity="${opacity}"
        />
      `;
    }
  }

  private getAnimationDuration(flowRate: number): number {
    const cfg = this.config.animation!;
    if (flowRate <= 0) return cfg.min_flow_rate!;  // No flow = slowest (longest duration)

    // Normalize flow rate based on configured maximum
    const normalized = Math.min(flowRate / cfg.max_flow_rate_value!, 1);

    // Interpolate: higher flow = shorter duration (faster animation)
    // At normalized=0 (low flow): use min_flow_rate (slow, e.g., 5 seconds)
    // At normalized=1 (high flow): use max_flow_rate (fast, e.g., 1 second)
    return cfg.min_flow_rate! - (normalized * (cfg.min_flow_rate! - cfg.max_flow_rate!));
  }

  // Old animation methods removed - CSS handles all animations now!

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const hpState = this.getHeatPumpState();
    const bufferState = this.getBufferTankState();
    const hvacState = this.getHVACState();
    const dhwState = this.getDHWTankState();
    const dhwTank2State = this.getDHWTank2State();
    const g2ValveState = this.getG2ValveState();
    const auxHeaterState = this.getAuxHeaterState();

    // Calculate pipe colors based on temperature delta
    const hpPipeColors = this.getPipeColors(hpState.outletTemp, hpState.inletTemp, hpState.flowRate);
    const hvacPipeColors = this.getPipeColors(bufferState.supplyTemp, hvacState.returnTemp, hvacState.flowRate);

    // Extract individual pipe colors
    const hpOutletColor = hpPipeColors.hotPipe;
    const hpInletColor = hpPipeColors.coldPipe;
    const bufferSupplyColor = hvacPipeColors.hotPipe;
    const hvacReturnColor = hvacPipeColors.coldPipe;

    // Check if there's active flow (for valve element coloring)
    const hasFlow = hpState.flowRate > this.config.animation!.idle_threshold!;

    // DHW pipes always use hot/cold colors when active (not calculated from delta)
    // to match the fixed-color flow gradient animations
    const dhwCoilColor = this.config.temperature!.hot_color!;
    const dhwReturnColor = this.config.temperature!.cold_color!;

    // DHW coil inlet/outlet temperature indicator colors (heat exchanger circuit)
    const dhwInletColor = this.config.dhw_tank?.inlet_color || this.config.temperature!.hot_color!;  // Red for inlet (hot from HP)
    const dhwOutletColor = this.config.dhw_tank?.outlet_color || this.config.temperature!.cold_color!; // Blue for outlet (cooler return to HP)

    // DHW tank inlet/outlet colors (street water and house hot water)
    const dhwTankInletColor = this.config.dhw_tank?.tank_inlet_color || '#3498db';  // Light blue for cold street water
    const dhwTankOutletColor = this.config.dhw_tank?.tank_outlet_color || '#e74c3c'; // Red for hot output

    // DHW Tank 2 colors (connection between tanks and final outlet)
    const dhwTank2ConnectionColor = '#e74c3c'; // Red for hot water from tank 1 to tank 2
    const dhwTank2OutletColor = this.config.dhw_tank_2?.tank_outlet_color || '#e74c3c'; // Red for final hot output

    // Generate tank gradients
    const bufferIsHeating = bufferState.supplyTemp > bufferState.returnTemp;
    const bufferCurrentTemp = bufferState.supplyTemp; // Use supply temp as indicator of tank heat
    const bufferGradientData = this.generateTankGradient('buffer', bufferCurrentTemp, bufferIsHeating);
    const bufferGradient = bufferGradientData.levels;
    const bufferFillPercentage = bufferGradientData.fillPercentage;

    const dhwCurrentTemp = dhwState.tankTemp ?? dhwState.inletTemp; // Use tank temp if available, otherwise inlet
    const dhwGradientData = this.generateTankGradient('dhw', dhwCurrentTemp, true); // DHW always heating
    const dhwGradient = dhwGradientData.levels;
    const dhwFillPercentage = dhwGradientData.fillPercentage;

    // DHW Tank 2 gradient (if enabled)
    let dhwTank2Gradient: Array<{ y: number; height: number; color: string; opacity: number }> = [];
    let dhwTank2FillPercentage = 0;
    if (dhwTank2State.enabled) {
      const dhw2CurrentTemp = dhwTank2State.tankTemp ?? dhwTank2State.inletTemp;
      const dhw2GradientData = this.generateTankGradient('dhw_tank_2', dhw2CurrentTemp, true);
      dhwTank2Gradient = dhw2GradientData.levels;
      dhwTank2FillPercentage = dhw2GradientData.fillPercentage;
    }

    // Calculate metrics text colors and positioning
    const hpBgColor = this.getHeatPumpColor(hpState);
    const hpTextColor = this.getContrastTextColor(hpBgColor);
    const metricsTextColor = 'var(--primary-text-color)'; // Use theme-aware color for metrics panel
    const metricsY = hpState.error ? 126 : 111;

    // Calculate aux heater dynamic colors and glow
    const auxIntensity = auxHeaterState.intensity;
    // Color transition: gray -> orange -> red-orange based on intensity
    // Match G2 valve gray color (#bdc3c7) when off
    let auxCylinderColor = '#bdc3c7'; // Warm gray when off (matches G2 valve)
    if (auxIntensity > 0) {
      // Interpolate between gray (#bdc3c7 = rgb(189,195,199)) and red-orange (#ff4422)
      const grayR = 189, grayG = 195, grayB = 199;
      const hotR = 255, hotG = 68, hotB = 34;
      const r = Math.round(grayR + (hotR - grayR) * auxIntensity);
      const g = Math.round(grayG + (hotG - grayG) * auxIntensity);
      const b = Math.round(grayB + (hotB - grayB) * auxIntensity);
      auxCylinderColor = `rgb(${r}, ${g}, ${b})`;
    }
    // Glow intensity - stronger blur radius from 0 to 20 for SVG filter
    const auxGlowBlur = auxIntensity * 20;
    // Glow opacity for filter - boosted for visibility
    const auxGlowOpacity = Math.min(auxIntensity * 1.5, 1.0);

    // Calculate glow layer sizes based on config (default 8px extension)
    const glowSize = this.config.aux_heater?.glow_size ?? 8;
    // Main cylinder dimensions (centered at x=254, y=180)
    const cylX = 224, cylY = 172, cylW = 60, cylH = 16;
    // Glow layers extend VERTICALLY only (not horizontally past flanges)
    const outerGlow = {
      x: cylX,  // Same x as cylinder - no horizontal extension
      y: cylY - glowSize,  // Extend upward
      width: cylW,  // Same width as cylinder
      height: cylH + 2 * glowSize,  // Extend up and down
      rx: 2,  // Match cylinder corner radius
      ry: 2
    };
    const middleGlow = {
      x: cylX,
      y: cylY - glowSize * 0.75,
      width: cylW,
      height: cylH + 2 * glowSize * 0.75,
      rx: 2,
      ry: 2
    };
    const innerGlow = {
      x: cylX,
      y: cylY - glowSize * 0.5,
      width: cylW,
      height: cylH + 2 * glowSize * 0.5,
      rx: 2,
      ry: 2
    };

    // Calculate animation speed based on power (higher power = faster pulsing)
    // At 0% power: 2.0s (slow), at 100% power: 0.6s (fast)
    const animSpeed = auxIntensity > 0 ? (2.0 - auxIntensity * 1.4) : 2.0;

    // Calculate flow animation speed based on flow rate (higher flow = faster animation)
    // At 0 L/min: 4s (slow), at 10 L/min: 2s (medium), at 15+ L/min: 1.2s (fast)
    const flowAnimSpeed = Math.max(1.2, Math.min(4.0, 4.0 - (hpState.flowRate * 0.18)));

    // Get shadow blur multiplier from config (default: 1.0)
    const shadowBlur = this.config.aux_heater?.shadow_blur ?? 1.0;

    // Determine CSS classes for glow layers based on aux heater intensity
    const outerClass = auxIntensity > 0 ? 'aux-glow-outer' : 'aux-heater-layer';
    const middleClass = auxIntensity > 0 ? 'aux-glow-middle' : 'aux-heater-layer';
    const innerClass = auxIntensity > 0 ? 'aux-glow-inner' : 'aux-heater-layer';
    // Main cylinder always visible (just gray when off), only animates when active
    const cylinderClass = auxIntensity > 0 ? 'aux-cylinder-pulse' : '';

    const logoSize = this.config.logo_size || 40;
    const showLogo = this.config.show_logo !== false; // Default to true
    const logoPath = this.config.logo_path || '/local/heat-pump-flow.png';
    const logoUrl = this.config.logo_url || 'https://github.com/jasipsw/heat-pump-flow-card#readme';

    return html`
      <ha-card style="--logo-size: ${logoSize}px">
        ${this.config.title || showLogo ? html`
          <h1 class="card-header">
            <span>${this.config.title || ''}</span>
            ${showLogo ? html`
              <a href="${logoUrl}" target="_blank" rel="noopener noreferrer" class="card-logo-link">
                <img src="${logoPath}" class="card-logo" alt="Heat Pump Flow Card" />
              </a>
            ` : ''}
          </h1>
        ` : ''}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG Filter Definitions -->
            <defs>
              <!-- Drop shadow filter for aux heater -->
              <filter id="aux-heater-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.5"/>
              </filter>

              <!-- Drop shadow filter for main entities (stronger for better depth) -->
              <filter id="entity-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
              </filter>

              <!-- Subtle shadow filter for temperature indicators (softer, more circular) -->
              <filter id="circle-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
              </filter>

              <!-- Blur filters for aux heater glow layers -->
              <filter id="aux-glow-outer">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
              </filter>
              <filter id="aux-glow-middle">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
              </filter>
              <filter id="aux-glow-inner">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4"/>
              </filter>

              <!-- Flow gradients defined inline with each path for unique staggered timing -->
            </defs>

            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Pipes with 10px gaps from entities for clean appearance -->
            <!-- CONVENTIONAL: Supply on top (hot), Return on bottom (cold) -->

            <!-- HEATING MODE PIPES (shown when G2 valve is OFF - heating mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: Buffer to HP (cold return) - BOTTOM - Connects to DHW return junction at x=330 - BEHIND -->
            <path id="buffer-to-hp-path"
                  d="M 390 220 L 330 220"
                  stroke="${g2ValveState.isActive ? (this.config.temperature?.neutral_color || '#95a5a6') : hpInletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '0.3' : '1'}"/>

            <!-- Pipe: Junction to HP (cold return continuation) - heating mode only -->
            <path id="junction-to-hp-path"
                  d="M 330 220 L 180 220"
                  stroke="${hpInletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '0' : '1'}"/>

            <!-- Pipe: HP to aux heater (first segment) -->
            <!-- Shows water at HP outlet temperature before aux heater boost -->
            <path id="hp-to-aux-heating-path"
                  d="M 180 180 L 254 180"
                  stroke="${hpOutletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${auxIntensity > 0 ? '0.5' : '1'}"/>

            <!-- Pipe: Aux heater to G2 valve (second segment) -->
            <!-- Shows boosted temperature after aux heater adds energy -->
            <!-- Hidden when flow animation is active to prevent color visibility issues -->
            <path id="aux-to-g2-heating-path"
                  d="M 254 180 L 328 180"
                  stroke="${auxIntensity > 0 ? (this.config.temperature?.hot_color || '#e74c3c') : hpOutletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${hpState.flowRate > this.config.animation!.idle_threshold ? '0' : '1'}"/>

            <!-- Pipe: G2 to Buffer (continuation) - only active in heating mode -->
            <path id="g2-to-buffer-path"
                  d="M 367 180 L 390 180"
                  stroke="${g2ValveState.isActive ? (this.config.temperature?.neutral_color || '#95a5a6') : hpOutletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '0.3' : '1'}"/>

            <!-- DHW MODE PIPES (shown when G2 valve is ON - DHW mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: DHW outlet to HP return (BOTTOM) - Separated horizontally at x=330 (left of G2 pipe) - BEHIND -->
            <!-- Always visible: gray when inactive, colored when active -->
            <path id="dhw-to-hp-return-path"
                  d="M 418 470 L 330 470 L 330 220 L 180 220"
                  stroke="${g2ValveState.isActive ? dhwReturnColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: G2 valve down to DHW tank inlet (supply to coil) - At x=348, horizontally separated from return -->
            <!-- Always visible: gray when inactive, colored when active -->
            <path id="g2-to-dhw-path"
                  d="M 348 195 L 348 370 L 418 370"
                  stroke="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- DHW coil spiral path (for flow animation) - Matches actual tank coil position -->
            <path id="dhw-coil-path"
                  d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="none"
                  stroke-width="0"
                  fill="none"
                  opacity="0"/>

            <!-- DHW TANK INLET/OUTLET PIPES (street water in, hot water out) -->
            <!-- Pipe: Street water inlet to DHW tank (cold water supply to vertical center) -->
            <path id="dhw-tank-inlet-path"
                  d="M 305 420 L 435 420"
                  stroke="${dhwTankInletColor}"
                  stroke-width="8"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Water source icon (e.g., water tower) at inlet start - rendered after pipe for z-order -->
            ${this.renderIcon(
              this.config.dhw_tank?.tank_inlet_icon_url || 'mdi:water-pump',
              245, 390, 60, 60, 0.9, this.config.dhw_tank?.tank_inlet_icon_color
            )}

            <!-- Pipe: DHW tank outlet (hot water) -->
            ${dhwTank2State.enabled ? svg`
              <!-- Pipe from DHW tank 1 to DHW tank 2 -->
              <path id="dhw-tank-outlet-path"
                    d="M 470 380 L 560 380"
                    stroke="${dhwTank2ConnectionColor}"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="butt"/>
            ` : svg`
              <!-- Pipe from DHW tank 1 to house (when tank 2 is disabled) -->
              <path id="dhw-tank-outlet-path"
                    d="M 470 380 L 550 380"
                    stroke="${dhwTankOutletColor}"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="butt"/>
            `}

            <!-- Pipe: DHW tank 2 outlet to house (only when tank 2 is enabled) -->
            ${dhwTank2State.enabled ? svg`
              <path id="dhw-tank-2-outlet-path"
                    d="M 630 380 L 710 380"
                    stroke="${dhwTank2OutletColor}"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Faucet icon at final outlet -->
              ${this.renderIcon(
                this.config.dhw_tank_2?.tank_outlet_icon_url || 'mdi:faucet-variant',
                705, 350, 60, 60, 0.9, this.config.dhw_tank_2?.tank_outlet_icon_color
              )}
            ` : svg`
              <!-- Faucet icon at DHW tank 1 outlet (when tank 2 is disabled) -->
              ${this.renderIcon(
                this.config.dhw_tank?.tank_outlet_icon_url || 'mdi:faucet-variant',
                545, 350, 60, 60, 0.9, this.config.dhw_tank?.tank_outlet_icon_color
              )}
            `}

            <!-- Z-ORDER: Return first (behind), supply on top -->
            <!-- Pipe: HVAC to Buffer (cold return) - 10px gap from buffer - BEHIND -->
            <path id="hvac-to-buffer-path"
                  d="M 620 220 L 480 220"
                  stroke="${hvacReturnColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: Buffer to HVAC (hot supply) - 10px gap from buffer - ON TOP -->
            <path id="buffer-to-hvac-path"
                  d="M 480 180 L 620 180"
                  stroke="${bufferSupplyColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Animated Flow Overlays (shimmer effect on pipes) -->
            <!-- Note: Adding tiny kinks to straight paths for gradient rendering -->
            <!-- Note: Animations use smooth constant flow gradients with staggered timing -->
            <!-- Note: Visibility controlled by opacity (always rendered for proper SVG structure) -->

            <!-- HP to Buffer continuous animation (heating mode) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 180 180 L 283.5 180 L 283.5 180.01 L 390 180"
                  stroke="${hpOutletColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-hp-to-buffer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 180 180 L 283.5 180 L 283.5 180.01 L 390 180"
                  stroke="url(#flow-grad-hp-to-buffer)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- HP to G2 continuous animation (DHW mode) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 180 180 L 254 180 L 254 180.01 L 328 180"
                  stroke="${hpOutletColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-hp-to-g2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 180 180 L 254 180 L 254 180.01 L 328 180"
                  stroke="url(#flow-grad-hp-to-g2)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>


            <!-- Buffer to HVAC (horizontal hot) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 480 180 L 550 180 L 550 180.01 L 620 180"
                  stroke="${bufferSupplyColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${hvacState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${flowAnimSpeed}s" begin="0.9s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${flowAnimSpeed}s" begin="0.9s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 480 180 L 550 180 L 550 180.01 L 620 180"
                  stroke="url(#flow-grad-4)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${hvacState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- Buffer to HP return continuous animation (heating mode) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 390 220 L 285 220 L 285 220.01 L 180 220"
                  stroke="${hpInletColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-buffer-to-hp-return" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${flowAnimSpeed}s" begin="1.2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${flowAnimSpeed}s" begin="1.2s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 390 220 L 285 220 L 285 220.01 L 180 220"
                  stroke="url(#flow-grad-buffer-to-hp-return)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${!g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- HVAC to buffer return (horizontal cold) -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 620 220 L 550 220 L 550 220.01 L 480 220"
                  stroke="${hvacReturnColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${hvacState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-6" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${flowAnimSpeed}s" begin="1.5s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${flowAnimSpeed}s" begin="1.5s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 620 220 L 550 220 L 550 220.01 L 480 220"
                  stroke="url(#flow-grad-6)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${hvacState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- Z-ORDER: Return paths first (behind), then supply paths (on top) -->

            <!-- DHW to HP return - horizontal segment 1 (cold) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 418 470 L 374 470 L 374 470.01 L 330 470"
                  stroke="${dhwReturnColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-9a" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 418 470 L 374 470 L 374 470.01 L 330 470"
                  stroke="url(#flow-grad-9a)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- DHW to HP return - vertical segment (cold) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 330 470 L 330 345 L 330 345.01 L 330 220"
                  stroke="${dhwReturnColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-9b" x1="330" y1="470" x2="330" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="y1" values="345;95" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="y2" values="595;345" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 330 470 L 330 345 L 330 345.01 L 330 220"
                  stroke="url(#flow-grad-9b)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- DHW to HP return - horizontal segment 2 (cold) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 330 220 L 255 220 L 255 220.01 L 180 220"
                  stroke="${dhwReturnColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-9c" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(50, 100, 180, 0.6)" />
                <stop offset="40%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="50%" stop-color="rgba(110, 170, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(80, 140, 220, 0.9)" />
                <stop offset="100%" stop-color="rgba(50, 100, 180, 0.6)" />
                <animate attributeName="x1" values="50%;-50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="150%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 330 220 L 255 220 L 255 220.01 L 180 220"
                  stroke="url(#flow-grad-9c)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- G2 to DHW - vertical segment (hot) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 348 195 L 348 282.5 L 348 282.51 L 348 370"
                  stroke="${dhwCoilColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-7a" x1="348" y1="195" x2="348" y2="370" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="y1" values="107;282" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="y2" values="282;457" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 348 195 L 348 282.5 L 348 282.51 L 348 370"
                  stroke="url(#flow-grad-7a)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- G2 to DHW - horizontal segment (hot) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 348 370 L 383 370 L 383 370.01 L 418 370"
                  stroke="${dhwCoilColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-7b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 348 370 L 383 370 L 383 370.01 L 418 370"
                  stroke="url(#flow-grad-7b)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- DHW coil spiral (vertical hot) - DHW mode only -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="${dhwCoilColor}"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-8" x1="438" y1="370" x2="438" y2="478" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="y1" values="316;424" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="y2" values="424;532" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="url(#flow-grad-8)"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- DHW Tank Inlet (street water) - horizontal cold -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 360 420 L 397.5 420 L 397.5 420.01 L 435 420"
                  stroke="${dhwTankInletColor}"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(dhwState.tankInletFlow ?? 0) > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-dhw-inlet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(52, 152, 219, 0.6)" />
                <stop offset="40%" stop-color="rgba(72, 172, 239, 0.9)" />
                <stop offset="50%" stop-color="rgba(92, 192, 255, 1.0)" />
                <stop offset="60%" stop-color="rgba(72, 172, 239, 0.9)" />
                <stop offset="100%" stop-color="rgba(52, 152, 219, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 360 420 L 397.5 420 L 397.5 420.01 L 435 420"
                  stroke="url(#flow-grad-dhw-inlet)"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(dhwState.tankInletFlow ?? 0) > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- DHW Tank Outlet (hot water to house) - horizontal hot -->
            <!-- Solid backing to prevent color bleeding through gradient -->
            <path d="M 470 380 L 510 380 L 510 380.01 L 550 380"
                  stroke="${dhwTankOutletColor}"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(dhwState.tankInletFlow ?? 0) > this.config.animation!.idle_threshold ? '1' : '0'}"></path>
            <!-- Animated gradient overlay -->
            <defs>
              <linearGradient id="flow-grad-dhw-outlet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(200, 60, 40, 0.6)" />
                <stop offset="40%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="50%" stop-color="rgba(255, 130, 90, 1.0)" />
                <stop offset="60%" stop-color="rgba(240, 100, 70, 0.9)" />
                <stop offset="100%" stop-color="rgba(200, 60, 40, 0.6)" />
                <animate attributeName="x1" values="-50%;50%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="x2" values="50%;150%" dur="${flowAnimSpeed}s" begin="0s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <path class="flow-gradient"
                  d="M 470 380 L 510 380 L 510 380.01 L 550 380"
                  stroke="url(#flow-grad-dhw-outlet)"
                  stroke-width="6"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${(dhwState.tankInletFlow ?? 0) > this.config.animation!.idle_threshold ? '1' : '0'}"></path>

            <!-- Pipe corner elbows to hide animation seams - DHW mode only -->
            <!-- Corner at G2 to DHW (348, 370) - vertical to horizontal -->
            <rect x="341" y="363"
                  width="14" height="14"
                  fill="${this.config.temperature?.neutral_color || '#95a5a6'}"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></rect>

            <!-- Corner at DHW to HP return first turn (330, 470) - horizontal to vertical -->
            <rect x="323" y="463"
                  width="14" height="14"
                  fill="${this.config.temperature?.neutral_color || '#95a5a6'}"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></rect>

            <!-- Corner at DHW to HP return second turn (330, 220) - vertical to horizontal -->
            <rect x="323" y="213"
                  width="14" height="14"
                  fill="${this.config.temperature?.neutral_color || '#95a5a6'}"
                  opacity="${g2ValveState.isActive && hpState.flowRate > this.config.animation!.idle_threshold ? '1' : '0'}"></rect>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)" filter="url(#entity-shadow)">
              <!-- Heat pump body with state-based color -->
              <rect width="120" height="150" rx="10" fill="${this.getHeatPumpColor(hpState)}" fill-opacity="0.2" stroke="${this.getHeatPumpColor(hpState)}" stroke-width="3"/>

              <!-- Fan housing (moved down to make room for brand name) -->
              <circle cx="60" cy="51" r="30" fill="#34495e" stroke="${this.getHeatPumpColor(hpState)}" stroke-width="2"/>

              <!-- Fan blades (will be animated) -->
              <g id="fan-blades">
                <!-- 4 fan blades -->
                <path d="M 60 21 Q 70 41, 60 51 Q 50 41, 60 21" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 90 51 Q 70 61, 60 51 Q 70 41, 90 51" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 60 81 Q 50 61, 60 51 Q 70 61, 60 81" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 30 51 Q 50 41, 60 51 Q 50 61, 30 51" fill="#7f8c8d" opacity="0.8"/>
                <!-- Center cap -->
                <circle cx="60" cy="51" r="8" fill="#2c3e50"/>
              </g>

              <!-- Brand name with logo (upper left corner) -->
              <!-- Background for logo/text (configurable to match logo background) -->
              <rect x="3" y="3" width="114" height="20" rx="4"
                    fill="${this.config.heat_pump?.logo_background_color || 'transparent'}"
                    opacity="${this.config.heat_pump?.logo_background_color ? '1' : '0'}"/>
              <!-- Logo (16x16px favicon size) -->
              <image x="5" y="4" width="16" height="16"
                     href="${this.config.heat_pump?.logo_url || ''}"
                     opacity="${this.config.heat_pump?.logo_url ? '0.9' : '0'}"/>
              <!-- Brand text (center-aligned vertically with logo) -->
              <text x="25" y="14" text-anchor="start"
                    fill="${this.config.heat_pump?.logo_text_color || this.getHeatPumpColor(hpState)}"
                    font-size="12"
                    font-weight="bold">
                ${this.config.heat_pump?.display_name || ''}
              </text>

              <!-- Heat pump label -->
              <text x="60" y="96" text-anchor="middle" fill="${this.getHeatPumpColor(hpState)}" font-size="10" font-weight="bold">
                ${this.getDisplayMode(hpState, g2ValveState)}
              </text>

              <!-- Error indicator -->
              ${hpState.error ? html`
                <text x="60" y="111" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${hpState.error}
                </text>
              ` : ''}

              <!-- Temperature Setpoint Indicators (3 circles below mode text, styled like pipe temp sensors) -->
              ${(() => {
                // Determine which setpoints are active based on current mode
                const displayMode = this.getDisplayMode(hpState, g2ValveState).toLowerCase();
                const isHeating = displayMode.includes('heat');
                const isDhw = displayMode.includes('dhw');
                const isCooling = displayMode.includes('cool');
                const isOff = displayMode === 'off' || displayMode === 'defrost';

                // Gray out inactive setpoints (opacity 0.3 for grayed, 0.95 for active)
                const heatingOpacity = (isHeating || isOff) ? 0.95 : 0.3;
                const dhwOpacity = (isDhw || isOff) ? 0.95 : 0.3;
                const coolingOpacity = (isCooling || isOff) ? 0.95 : 0.3;

                const radius = this.config.temperature_status?.circle_radius || 12;
                const heatingColor = '#e74c3c';
                const dhwColor = '#e74c3c';
                const coolingColor = '#3498db';

                return svg`
                  <g id="hp-setpoints" transform="translate(0, 115)">
                    <!-- Setpoints label above circles -->
                    <text x="60" y="-8" text-anchor="middle"
                          fill="${hpTextColor}" font-size="5" opacity="0.5"
                          letter-spacing="0.5" font-family="Arial, sans-serif">
                      SETPOINTS
                    </text>

                    <!-- Heating Target Temperature (red circle, left position) -->
                    ${hpState.heatingTargetTemp !== undefined ? svg`
                      <circle cx="24" cy="8" r="${radius}"
                              fill="white" stroke="${heatingColor}" stroke-width="2"
                              opacity="${heatingOpacity}"
                              filter="url(#circle-shadow)"/>
                      <text x="24" y="9" text-anchor="middle" dominant-baseline="middle"
                            fill="${heatingColor}" font-size="7.5" font-weight="bold"
                            letter-spacing="-0.5" font-family="Arial, sans-serif"
                            opacity="${heatingOpacity}">
                        ${this.formatValue(hpState.heatingTargetTemp, 0)}°
                      </text>
                      <text x="24" y="27" text-anchor="middle"
                            fill="${hpTextColor}" font-size="6" opacity="${heatingOpacity * 0.7}">
                        HEAT
                      </text>
                    ` : ''}

                    <!-- DHW Target Temperature (red circle, center position) -->
                    ${hpState.dhwTargetTemp !== undefined ? svg`
                      <circle cx="60" cy="8" r="${radius}"
                              fill="white" stroke="${dhwColor}" stroke-width="2"
                              opacity="${dhwOpacity}"
                              filter="url(#circle-shadow)"/>
                      <text x="60" y="9" text-anchor="middle" dominant-baseline="middle"
                            fill="${dhwColor}" font-size="7.5" font-weight="bold"
                            letter-spacing="-0.5" font-family="Arial, sans-serif"
                            opacity="${dhwOpacity}">
                        ${this.formatValue(hpState.dhwTargetTemp, 0)}°
                      </text>
                      <text x="60" y="27" text-anchor="middle"
                            fill="${hpTextColor}" font-size="6" opacity="${dhwOpacity * 0.7}">
                        DHW
                      </text>
                    ` : ''}

                    <!-- Cooling Target Temperature (blue circle, right position) -->
                    ${hpState.coolingTargetTemp !== undefined ? svg`
                      <circle cx="96" cy="8" r="${radius}"
                              fill="white" stroke="${coolingColor}" stroke-width="2"
                              opacity="${coolingOpacity}"
                              filter="url(#circle-shadow)"/>
                      <text x="96" y="9" text-anchor="middle" dominant-baseline="middle"
                            fill="${coolingColor}" font-size="7.5" font-weight="bold"
                            letter-spacing="-0.5" font-family="Arial, sans-serif"
                            opacity="${coolingOpacity}">
                        ${this.formatValue(hpState.coolingTargetTemp, 0)}°
                      </text>
                      <text x="96" y="27" text-anchor="middle"
                            fill="${hpTextColor}" font-size="6" opacity="${coolingOpacity * 0.7}">
                        COOL
                      </text>
                    ` : ''}
                  </g>
                `;
              })()}
            </g>

            <!-- Detailed Metrics Panel (always shown, includes core metrics + optional detailed metrics) -->
            <!-- Position below the heat pump box (box is 150px tall, so start at y=255) -->
            <g id="hp-detailed-metrics" transform="translate(50, 255)">
                <!-- Divider line -->
                <line x1="8" y1="0" x2="112" y2="0" stroke="${metricsTextColor}" stroke-width="0.5" opacity="0.3"/>

                <!-- Core Metrics Row 1: Power In, Thermal Out, COP -->
                ${this.config.heat_pump?.power_entity ? svg`
                  <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.power_entity!)}">
                    <text x="8" y="8" fill="${metricsTextColor}" font-size="7" opacity="0.7">IN</text>
                    <text x="8" y="15" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                      ${this.formatValue(hpState.power/1000, 1)}kW
                    </text>
                  </g>
                ` : ''}

                ${this.config.heat_pump?.thermal_entity ? svg`
                  <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.thermal_entity!)}">
                    <text x="42" y="8" fill="${metricsTextColor}" font-size="7" opacity="0.7">OUT</text>
                    <text x="42" y="15" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                      ${this.formatValue(hpState.thermal/1000, 1)}kW
                    </text>
                  </g>
                ` : ''}

                ${this.config.heat_pump?.cop_entity ? svg`
                  <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.cop_entity!)}">
                    <text x="76" y="8" fill="${metricsTextColor}" font-size="7" opacity="0.7">COP</text>
                    <text x="76" y="15" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                      ${this.formatValue(hpState.cop, 2)}
                    </text>
                  </g>
                ` : ''}

                <!-- Core Metrics Row 2: Flow Rate, Amps, Volts -->
                ${this.config.heat_pump?.flow_rate_entity ? svg`
                  <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.flow_rate_entity!)}">
                    <text x="8" y="26" fill="${metricsTextColor}" font-size="7" opacity="0.7">Flow</text>
                    <text x="8" y="33" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                      ${this.formatValue(hpState.flowRate, 1)}${this.getStateUnit(this.config.heat_pump?.flow_rate_entity) || 'L/m'}
                    </text>
                  </g>
                ` : ''}

                ${hpState.amps !== undefined && this.config.heat_pump?.amps_entity ? svg`
                  <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.amps_entity!)}">
                    <text x="42" y="26" fill="${metricsTextColor}" font-size="7" opacity="0.7">Amps</text>
                    <text x="42" y="33" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                      ${this.formatValue(hpState.amps, 1)}A
                    </text>
                  </g>
                ` : ''}

                ${hpState.volts !== undefined && this.config.heat_pump?.volts_entity ? svg`
                  <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.volts_entity!)}">
                    <text x="76" y="26" fill="${metricsTextColor}" font-size="7" opacity="0.7">Volts</text>
                    <text x="76" y="33" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                      ${this.formatValue(hpState.volts, 0)}V
                    </text>
                  </g>
                ` : ''}

                <!-- Optional Detailed Metrics (shown only if enabled) -->
                ${this.config.heat_pump?.show_detailed_metrics ? svg`
                  <!-- Divider line before detailed metrics -->
                  <line x1="8" y1="42" x2="112" y2="42" stroke="${metricsTextColor}" stroke-width="0.5" opacity="0.3"/>

                  <!-- Detailed Row 1: Compressor, Discharge, Ambient -->
                  ${hpState.compressorFrequency !== undefined && this.config.heat_pump?.compressor_frequency_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.compressor_frequency_entity!)}">
                      <text x="8" y="50" fill="${metricsTextColor}" font-size="7" opacity="0.7">Comp</text>
                      <text x="8" y="57" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.compressorFrequency, 0)}Hz
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.dischargeTemp !== undefined && this.config.heat_pump?.discharge_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.discharge_temp_entity!)}">
                      <text x="42" y="50" fill="${metricsTextColor}" font-size="7" opacity="0.7">Disch</text>
                      <text x="42" y="57" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.dischargeTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.ambientTemp !== undefined && this.config.heat_pump?.ambient_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.ambient_temp_entity!)}">
                      <text x="76" y="50" fill="${metricsTextColor}" font-size="7" opacity="0.7">Amb</text>
                      <text x="76" y="57" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.ambientTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  <!-- Detailed Row 2: DHW, Outdoor Coil, Suction -->
                  ${hpState.dhwTemp !== undefined && this.config.heat_pump?.dhw_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.dhw_temp_entity!)}">
                      <text x="8" y="68" fill="${metricsTextColor}" font-size="7" opacity="0.7">DHW</text>
                      <text x="8" y="75" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.dhwTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.outdoorCoilTemp !== undefined && this.config.heat_pump?.outdoor_coil_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.outdoor_coil_temp_entity!)}">
                      <text x="42" y="68" fill="${metricsTextColor}" font-size="7" opacity="0.7">O-Coil</text>
                      <text x="42" y="75" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.outdoorCoilTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.suctionTemp !== undefined && this.config.heat_pump?.suction_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.suction_temp_entity!)}">
                      <text x="76" y="68" fill="${metricsTextColor}" font-size="7" opacity="0.7">Suct</text>
                      <text x="76" y="75" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.suctionTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  <!-- Detailed Row 3: Heat Exchanger, Plate Exchange -->
                  ${hpState.heatExchangerTemp !== undefined && this.config.heat_pump?.heat_exchanger_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.heat_exchanger_temp_entity!)}">
                      <text x="8" y="86" fill="${metricsTextColor}" font-size="7" opacity="0.7">HX</text>
                      <text x="8" y="93" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.heatExchangerTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.plateExchangeTemp !== undefined && this.config.heat_pump?.plate_exchange_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.plate_exchange_temp_entity!)}">
                      <text x="42" y="86" fill="${metricsTextColor}" font-size="7" opacity="0.7">Plate</text>
                      <text x="42" y="93" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.plateExchangeTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.ipmTemp !== undefined && this.config.heat_pump?.ipm_temp_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.ipm_temp_entity!)}">
                      <text x="76" y="86" fill="${metricsTextColor}" font-size="7" opacity="0.7">IPM</text>
                      <text x="76" y="93" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.ipmTemp, 0)}°
                      </text>
                    </g>
                  ` : ''}

                  <!-- Detailed Row 4: Fan Motors -->
                  ${hpState.ecFanMotor1Speed !== undefined && this.config.heat_pump?.ec_fan_motor_1_speed_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.ec_fan_motor_1_speed_entity!)}">
                      <text x="8" y="104" fill="${metricsTextColor}" font-size="7" opacity="0.7">Fan1</text>
                      <text x="8" y="111" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.ecFanMotor1Speed, 0)}
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.ecFanMotor2Speed !== undefined && this.config.heat_pump?.ec_fan_motor_2_speed_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.ec_fan_motor_2_speed_entity!)}">
                      <text x="42" y="104" fill="${metricsTextColor}" font-size="7" opacity="0.7">Fan2</text>
                      <text x="42" y="111" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.ecFanMotor2Speed, 0)}
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.busLineVoltage !== undefined && this.config.heat_pump?.bus_line_voltage_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.bus_line_voltage_entity!)}">
                      <text x="76" y="104" fill="${metricsTextColor}" font-size="7" opacity="0.7">Bus V</text>
                      <text x="76" y="111" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.busLineVoltage, 0)}V
                      </text>
                    </g>
                  ` : ''}

                  <!-- Detailed Row 5: Additional metrics -->
                  ${hpState.eHeaterPower !== undefined && this.config.heat_pump?.e_heater_power_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.e_heater_power_entity!)}">
                      <text x="8" y="122" fill="${metricsTextColor}" font-size="7" opacity="0.7">E-Htr</text>
                      <text x="8" y="129" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.eHeaterPower, 0)}W
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.compressorRunningTime !== undefined && this.config.heat_pump?.compressor_running_time_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.compressor_running_time_entity!)}">
                      <text x="42" y="122" fill="${metricsTextColor}" font-size="7" opacity="0.7">Comp H</text>
                      <text x="42" y="129" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.compressorRunningTime, 0)}h
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.compressorMaxPercentage !== undefined && this.config.heat_pump?.compressor_max_percentage_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.compressor_max_percentage_entity!)}">
                      <text x="76" y="122" fill="${metricsTextColor}" font-size="7" opacity="0.7">MaxC%</text>
                      <text x="76" y="129" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.compressorMaxPercentage, 0)}%
                      </text>
                    </g>
                  ` : ''}

                  <!-- Detailed Row 6: Status indicators -->
                  ${hpState.pumpEnabled !== undefined && this.config.heat_pump?.pump_enabled_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.pump_enabled_entity!)}">
                      <text x="8" y="140" fill="${metricsTextColor}" font-size="7" opacity="0.7">Pump</text>
                      <text x="8" y="147" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${hpState.pumpEnabled ? 'ON' : 'OFF'}
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.fanShutdownCode !== undefined && hpState.fanShutdownCode !== 0 && this.config.heat_pump?.fan_shutdown_code_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.fan_shutdown_code_entity!)}">
                      <text x="42" y="140" fill="${metricsTextColor}" font-size="7" opacity="0.7">F-Code</text>
                      <text x="42" y="147" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.fanShutdownCode, 0)}
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.din6ModeSwitch !== undefined && this.config.heat_pump?.din6_mode_switch_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.din6_mode_switch_entity!)}">
                      <text x="76" y="140" fill="${metricsTextColor}" font-size="7" opacity="0.7">DIN6</text>
                      <text x="76" y="147" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${this.formatValue(hpState.din6ModeSwitch, 0)}
                      </text>
                    </g>
                  ` : ''}

                  <!-- Detailed Row 7: Defrost and Error Status -->
                  ${hpState.defrost !== undefined && this.config.heat_pump?.defrost_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.defrost_entity!)}">
                      <text x="8" y="158" fill="${metricsTextColor}" font-size="7" opacity="0.7">Defrost</text>
                      <text x="8" y="165" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                        ${hpState.defrost ? 'ON' : 'OFF'}
                      </text>
                    </g>
                  ` : ''}

                  ${hpState.error && this.config.heat_pump?.error_entity ? svg`
                    <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.heat_pump!.error_entity!)}">
                      <text x="42" y="158" fill="#e74c3c" font-size="7" opacity="0.7">Error</text>
                      <text x="42" y="165" fill="#e74c3c" font-size="8" font-weight="bold">
                        ${hpState.error}
                      </text>
                    </g>
                  ` : ''}
                ` : ''}

                <!-- Custom Metrics Section -->
                ${this.config.metrics && this.config.metrics.length > 0 ? (() => {
                  // Calculate starting Y position based on whether detailed metrics are shown
                  const baseY = this.config.heat_pump?.show_detailed_metrics ? 176 : 44;
                  const dividerY = this.config.heat_pump?.show_detailed_metrics ? 168 : 36;

                  // Organize metrics into rows of 3 columns
                  const rows: Array<Array<{entity: string, label: string, unit?: string, decimals?: number}>> = [];
                  for (let i = 0; i < this.config.metrics.length; i += 3) {
                    rows.push(this.config.metrics.slice(i, i + 3));
                  }

                  return svg`
                    <!-- Divider line before custom metrics -->
                    <line x1="8" y1="${dividerY}" x2="112" y2="${dividerY}" stroke="${metricsTextColor}" stroke-width="0.5" opacity="0.3"/>

                    ${rows.map((row, rowIndex) => {
                      const labelY = baseY + (rowIndex * 18);
                      const valueY = labelY + 7;
                      const columns = [8, 42, 76]; // Three column x-positions

                      return svg`
                        ${row.map((metric, colIndex) => {
                          const value = this.getStateValue(metric.entity);
                          if (value === undefined) return '';

                          const x = columns[colIndex];
                          const decimals = metric.decimals !== undefined ? metric.decimals : 1;
                          const unit = metric.unit || this.getStateUnit(metric.entity) || '';

                          return svg`
                            <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, metric.entity)}">
                              <text x="${x}" y="${labelY}" fill="${metricsTextColor}" font-size="7" opacity="0.7">${metric.label}</text>
                              <text x="${x}" y="${valueY}" fill="${metricsTextColor}" font-size="8" font-weight="bold">
                                ${this.formatValue(value, decimals)}${unit}
                              </text>
                            </g>
                          `;
                        })}
                      `;
                    })}
                  `;
                })() : ''}
              </g>

            <!-- Heat Pump Metrics (legacy - now moved inside HP box, keeping for optional extra data) -->
            <g id="hp-metrics-external" transform="translate(50, 265)" opacity="0">
              <!-- Metrics display in compact 2-column layout -->
              <!-- Left column -->
              <text x="0" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels!.power_in}:</text>
              <text x="0" y="16" fill="#3498db" font-size="12">${this.formatValue(hpState.power, 0)} W</text>

              <text x="0" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels!.thermal_out}:</text>
              <text x="0" y="52" fill="#e74c3c" font-size="12">${this.formatValue(hpState.thermal, 0)} W</text>

              <text x="0" y="72" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels!.cop}:</text>
              <text x="0" y="88" fill="#f1c40f" font-size="12">${this.formatValue(hpState.cop, 2)}</text>

              <text x="0" y="108" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels!.flow}:</text>
              <text x="0" y="124" fill="#9b59b6" font-size="12">${this.formatValue(hpState.flowRate, 1)} ${this.getStateUnit(this.config.heat_pump?.flow_rate_entity) || 'L/min'}</text>

              <!-- Right column -->
              ${hpState.energy !== undefined ? html`
                <text x="80" y="0" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels!.energy}:</text>
                <text x="80" y="16" fill="#16a085" font-size="12">${this.formatValue(hpState.energy, 2)} kWh</text>
              ` : ''}

              ${hpState.cost !== undefined ? html`
                <text x="80" y="36" fill="#95a5a6" font-size="11" font-weight="bold">${this.config.labels!.cost}:</text>
                <text x="80" y="52" fill="#27ae60" font-size="12">$${this.formatValue(hpState.cost, 2)}</text>
              ` : ''}
            </g>

            <!-- DHW Heating Diverter Valve (3-way valve between HP and tanks) -->
            <g id="g2-valve" transform="translate(360, 180) scale(0.7)"
               style="${this.config.g2_valve?.state_entity ? 'cursor: pointer;' : ''}"
               @click="${this.config.g2_valve?.state_entity ? (e: Event) => this.handleTemperatureClick(e, this.config.g2_valve!.state_entity!) : null}">
              <!-- Valve body - cylindrical with flanges (matching valve idea graphic) -->
              <!-- Left inlet flange -->
              <rect x="-45" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Main body cylinder -->
              <rect x="-35" y="-12" width="35" height="24" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Right outlet flange (to buffer/heating) -->
              <rect x="0" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Bottom outlet flange (to DHW) - adjusted for better alignment -->
              <rect x="-25" y="12" width="16" height="10" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>

              <!-- 3-Way Valve Symbol (hydronic standard: triangles at flanges with connecting lines) -->
              <g id="valve-symbol" opacity="0.8">
                <!-- Center circle (ball/switching mechanism) - bigger and flow-colored -->
                <circle cx="-17" cy="0" r="5"
                        fill="${hasFlow ? hpOutletColor : '#7f8c8d'}"
                        stroke="${hasFlow ? '#2c3e50' : '#7f8c8d'}"
                        stroke-width="0.8"/>

                <!-- Left port: line and larger centered triangle at flange (from HP inlet) - always active when flow -->
                <line x1="-17" y1="0" x2="-36" y2="0"
                      stroke="${hasFlow ? hpOutletColor : '#7f8c8d'}"
                      stroke-width="2"/>
                <path d="M -44 0 L -36 -6 L -36 6 Z"
                      fill="${hasFlow ? hpOutletColor : '#7f8c8d'}"
                      stroke="${hasFlow ? hpOutletColor : '#7f8c8d'}"
                      stroke-width="0.5"/>

                <!-- Right port: line and larger centered triangle at flange (to buffer/heating) -->
                <line x1="-17" y1="0" x2="1" y2="0"
                      stroke="${hasFlow ? (g2ValveState.isActive ? '#7f8c8d' : hpOutletColor) : '#7f8c8d'}"
                      stroke-width="2"/>
                <path d="M 9 0 L 1 -6 L 1 6 Z"
                      fill="${hasFlow ? (g2ValveState.isActive ? '#7f8c8d' : hpOutletColor) : '#7f8c8d'}"
                      stroke="${hasFlow ? (g2ValveState.isActive ? '#7f8c8d' : hpOutletColor) : '#7f8c8d'}"
                      stroke-width="0.5"/>

                <!-- Bottom port: line and larger centered triangle at flange (to DHW) -->
                <line x1="-17" y1="0" x2="-17" y2="13"
                      stroke="${hasFlow ? (g2ValveState.isActive ? hpOutletColor : '#7f8c8d') : '#7f8c8d'}"
                      stroke-width="2"/>
                <path d="M -17 21 L -23 13 L -11 13 Z"
                      fill="${hasFlow ? (g2ValveState.isActive ? hpOutletColor : '#7f8c8d') : '#7f8c8d'}"
                      stroke="${hasFlow ? (g2ValveState.isActive ? hpOutletColor : '#7f8c8d') : '#7f8c8d'}"
                      stroke-width="0.5"/>
              </g>

              <!-- Internal flow path visualization with animations -->
              ${g2ValveState.isActive ? html`
                <!-- DHW Mode: Flow DOWN (from left inlet to bottom outlet) -->
                <!-- Active path matching hot flow color -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L -17 0 L -17 12"
                      stroke="${hpOutletColor}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="butt"
                      stroke-linejoin="round"/>
                <!-- Inactive path (to right) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -17 -8 L 0 8 M -17 8 L 0 -8"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              ` : html`
                <!-- Heating Mode: Flow ACROSS (from left inlet to right outlet) -->
                <!-- Active path matching hot flow color -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L 0 0"
                      stroke="${hpOutletColor}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="butt"/>
                <!-- Inactive path (to bottom) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -25 4 L -9 20 M -9 4 L -25 20"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `}

              <!-- Valve label -->
              <text x="-17" y="-20" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">
                DHW Valve
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(390, 100)" filter="url(#entity-shadow)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              ${bufferGradient.length > 0 ? this.renderGradientRects(bufferGradient) : html`
                <!-- Thermal stratification (fallback - 4 zones) -->
                <rect x="15" y="25" width="60" height="30" fill="${bufferSupplyColor}" opacity="0.9"/>
                <rect x="15" y="55" width="60" height="35" fill="${bufferSupplyColor}" opacity="0.7"/>
                <rect x="15" y="90" width="60" height="35" fill="${hvacReturnColor}" opacity="0.7"/>
                <rect x="15" y="125" width="60" height="30" fill="${hvacReturnColor}" opacity="0.9"/>

                <!-- Structural bands (fallback only) -->
                <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
                <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
                <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>
              `}

              <!-- Tank label centered in top cap -->
              <text x="45" y="20" text-anchor="middle" dominant-baseline="middle"
                    fill="${this.config.buffer_tank?.label_color || 'white'}"
                    font-size="${this.config.buffer_tank?.label_font_size || 12}"
                    font-weight="bold">
                ${this.config.buffer_tank?.name || 'BUFFER'}
              </text>

              <!-- Brand logo centered above tank -->
              ${this.config.buffer_tank?.logo_url ? svg`
                <image
                  x="${45 - 10}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.buffer_tank.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              ` : ''}

              <!-- Fill percentage display (always shown) -->
              <text x="45" y="173" text-anchor="middle" fill="${bufferIsHeating ? '#e74c3c' : '#3498db'}" font-size="11" font-weight="bold">
                ${bufferFillPercentage}%
              </text>

              <!-- Tank temperature indicator (optional, centered in tank) -->
              ${this.renderTankTempIndicator(
                45,  // x center of tank
                90,  // y center of tank body
                bufferState.tankTemp,
                this.config.buffer_tank?.tank_temp_entity,
                this.config.buffer_tank?.show_temp_indicator,
                this.config.buffer_tank?.temp_indicator_radius,
                bufferIsHeating ? '#e74c3c' : '#3498db'
              )}
            </g>

            <!-- DHW (Domestic Hot Water) Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(390, 330)" filter="url(#entity-shadow)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              ${dhwGradient.length > 0 ? this.renderGradientRects(dhwGradient) : html`
                <!-- Inner cylinder (DHW water - fallback to simple blue) -->
                <rect x="15" y="25" width="60" height="130" fill="#3498db" opacity="0.3"/>
              `}

              <!-- Heating coil inside tank (spiral) - complete path from inlet to outlet -->
              <!-- Outer glow layer - pulsing when active -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${dhwCoilColor}"
                    stroke-width="10"
                    fill="none"
                    class="${g2ValveState.isActive ? 'dhw-coil-glow-outer' : 'dhw-coil-glow-layer'}"
                    pointer-events="none"/>
              <!-- Inner glow layer - pulsing when active -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${dhwCoilColor}"
                    stroke-width="7"
                    fill="none"
                    class="${g2ValveState.isActive ? 'dhw-coil-glow-inner' : 'dhw-coil-glow-layer'}"
                    pointer-events="none"/>
              <!-- Main coil path -->
              <path d="M 28 40 Q 45 48, 62 40 Q 45 60, 28 60 Q 45 76, 62 60 Q 45 92, 28 92 Q 45 108, 62 92 Q 45 124, 28 124 Q 45 132, 62 124 Q 45 140, 28 140"
                    stroke="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                    stroke-width="4"
                    fill="none"
                    opacity="${g2ValveState.isActive ? '0.9' : '0.3'}"/>

              <!-- Coil inlet/outlet markers - 100px vertical span -->
              <circle cx="28" cy="40" r="3" fill="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"/>
              <circle cx="28" cy="140" r="3" fill="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"/>

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label centered in top cap -->
              <text x="45" y="20" text-anchor="middle" dominant-baseline="middle"
                    fill="${this.config.dhw_tank?.label_color || 'white'}"
                    font-size="${this.config.dhw_tank?.label_font_size || 12}"
                    font-weight="bold">
                ${this.config.dhw_tank?.name || 'DHW'}
              </text>

              <!-- Brand logo centered above tank -->
              ${this.config.dhw_tank?.logo_url ? svg`
                <image
                  x="${45 - 10}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.dhw_tank.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              ` : ''}

              <!-- Fill percentage display (always shown) -->
              <text x="45" y="173" text-anchor="middle" fill="#e74c3c" font-size="11" font-weight="bold">
                ${dhwFillPercentage}%
              </text>

              <!-- Tank temperature indicator (optional, centered in tank) -->
              ${this.renderTankTempIndicator(
                45,  // x center of tank
                90,  // y center of tank body
                dhwState.tankTemp,
                this.config.dhw_tank?.tank_temp_entity,
                this.config.dhw_tank?.show_temp_indicator,
                this.config.dhw_tank?.temp_indicator_radius,
                '#e74c3c'  // Red for DHW (always heating)
              )}
            </g>

            <!-- DHW Tank 2 (Secondary/Finishing Heater) - Optional -->
            ${dhwTank2State.enabled ? svg`
            <g id="dhw-tank-2" transform="translate(550, 330)" filter="url(#entity-shadow)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              ${dhwTank2Gradient.length > 0 ? this.renderGradientRects(dhwTank2Gradient) : svg`
                <!-- Inner cylinder (DHW water - fallback to simple red) -->
                <rect x="15" y="25" width="60" height="130" fill="#e74c3c" opacity="0.3"/>
              `}

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label centered in top cap -->
              <text x="45" y="20" text-anchor="middle" dominant-baseline="middle"
                    fill="${this.config.dhw_tank_2?.label_color || 'white'}"
                    font-size="${this.config.dhw_tank_2?.label_font_size || 12}"
                    font-weight="bold">
                ${this.config.dhw_tank_2?.name || 'DHW 2'}
              </text>

              <!-- Brand logo centered above tank -->
              ${this.config.dhw_tank_2?.logo_url ? svg`
                <image
                  x="${45 - 10}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.dhw_tank_2.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              ` : ''}

              <!-- Fill percentage display (always shown) -->
              <text x="45" y="173" text-anchor="middle" fill="#e74c3c" font-size="11" font-weight="bold">
                ${dhwTank2FillPercentage}%
              </text>

              <!-- Tank temperature indicator (optional, centered in tank) -->
              ${this.renderTankTempIndicator(
                45,  // x center of tank
                90,  // y center of tank body
                dhwTank2State.tankTemp,
                this.config.dhw_tank_2?.tank_temp_entity,
                this.config.dhw_tank_2?.show_temp_indicator,
                this.config.dhw_tank_2?.temp_indicator_radius,
                '#e74c3c'  // Red for DHW (always heating)
              )}
            </g>
            ` : ''}

            <!-- HVAC Load (right side) -->
            <g id="hvac-load" transform="translate(630, 150)" filter="url(#entity-shadow)">
              <!-- Logo centered above HVAC box -->
              ${this.config.hvac?.logo_url ? svg`
                <image
                  x="${60 - 10}"
                  y="-25"
                  width="20"
                  height="20"
                  href="${this.config.hvac.logo_url}"
                  opacity="0.9"
                  preserveAspectRatio="xMidYMid meet" />
              ` : ''}

              <rect width="120" height="100" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="2"/>
              <text x="60" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                HVAC LOAD
              </text>
              ${this.config.hvac?.thermal_entity ? svg`
                <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.hvac!.thermal_entity!)}">
                  <text x="60" y="55" text-anchor="middle" fill="#e74c3c" font-size="20" font-weight="bold">
                    ${this.formatValue(hvacState.thermal, 0)} W
                  </text>
                </g>
              ` : svg`
                <text x="60" y="55" text-anchor="middle" fill="#e74c3c" font-size="20" font-weight="bold">
                  ${this.formatValue(hvacState.thermal, 0)} W
                </text>
              `}
              <!-- Flow rate display at bottom -->
              ${this.config.hvac?.flow_rate_entity ? svg`
                <g style="cursor: pointer;" @click="${(e: Event) => this.handleTemperatureClick(e, this.config.hvac!.flow_rate_entity!)}">
                  <text x="60" y="85" text-anchor="middle" fill="white" font-size="10">
                    ${this.formatValue(hvacState.flowRate, 1)} ${this.getStateUnit(this.config.hvac?.flow_rate_entity) || 'L/m'}
                  </text>
                </g>
              ` : svg`
                <text x="60" y="85" text-anchor="middle" fill="white" font-size="10">
                  ${this.formatValue(hvacState.flowRate, 1)} ${this.getStateUnit(this.config.hvac?.flow_rate_entity) || 'L/m'}
                </text>
              `}
            </g>

            <!-- Auxiliary Heater - Glowing cylinder with animated pulsing glow -->
            <!-- Centered between HP outlet (180) and G2 inlet (328) = 254 -->
            <!-- Glow size configurable via aux_heater.glow_size (default: 8px) -->
            <!-- Animation speed increases with power level for visual feedback -->
            <!-- Shadow blur configurable via aux_heater.shadow_blur (default: 1.0) -->
            <g id="aux-heater"
               opacity="${auxHeaterState.enabled ? '1' : '0'}"
               style="--aux-anim-speed: ${animSpeed}s; --aux-shadow-blur: ${shadowBlur};">
              <!-- Glow layers - simple solid colors with CSS pulsing animation -->
              <!-- Outermost glow layer - size based on config -->
              ${svg`<rect x="${outerGlow.x}" y="${outerGlow.y}"
                    width="${outerGlow.width}" height="${outerGlow.height}"
                    rx="${outerGlow.rx}" ry="${outerGlow.ry}"
                    class="${outerClass}"
                    fill="#ff4422"
                    pointer-events="none"></rect>`}

              <!-- Middle glow layer - size based on config -->
              ${svg`<rect x="${middleGlow.x}" y="${middleGlow.y}"
                    width="${middleGlow.width}" height="${middleGlow.height}"
                    rx="${middleGlow.rx}" ry="${middleGlow.ry}"
                    class="${middleClass}"
                    fill="#ff6644"
                    pointer-events="none"></rect>`}

              <!-- Inner glow layer - size based on config -->
              ${svg`<rect x="${innerGlow.x}" y="${innerGlow.y}"
                    width="${innerGlow.width}" height="${innerGlow.height}"
                    rx="${innerGlow.rx}" ry="${innerGlow.ry}"
                    class="${innerClass}"
                    fill="#ff8855"
                    pointer-events="none"></rect>`}

              <!-- Main heated cylinder body (centered at x=254) -->
              ${svg`<rect x="${cylX}" y="${cylY}" width="${cylW}" height="${cylH}" rx="2" ry="2"
                    class="${cylinderClass}"
                    fill="${auxCylinderColor}"
                    stroke="#7f8c8d"
                    stroke-width="1.5"></rect>`}

              <!-- Left flange (pipe connection) -->
              ${svg`<rect x="${cylX - 6}" y="${cylY + 2}" width="6" height="12"
                    fill="#95a5a6"
                    stroke="#7f8c8d"
                    stroke-width="1.5"></rect>`}

              <!-- Right flange (pipe connection) -->
              ${svg`<rect x="${cylX + cylW}" y="${cylY + 2}" width="6" height="12"
                    fill="#95a5a6"
                    stroke="#7f8c8d"
                    stroke-width="1.5"></rect>`}

              <!-- Label and logo (inside the heater cylinder) -->
              <!-- Brand logo (if configured) - left-aligned within cylinder, vertically centered -->
              ${this.config.aux_heater?.logo_url ? svg`<image x="${cylX + 3}"
                       y="${cylY + 3}"
                       width="10"
                       height="10"
                       href="${this.config.aux_heater.logo_url}"
                       opacity="0.9"></image>` : ''}

              <!-- Label text (if show_label is not false and displayName exists) - horizontally centered in cylinder, vertically centered -->
              ${this.config.aux_heater?.show_label !== false && auxHeaterState.displayName ? svg`<text x="${cylX + cylW/2}"
                      y="${cylY + cylH/2}"
                      text-anchor="middle"
                      dominant-baseline="middle"
                      fill="${this.config.aux_heater?.label_color || '#2c3e50'}"
                      font-size="9"
                      font-weight="bold">${auxHeaterState.displayName}</text>` : ''}
            </g>

            <!-- Version display (upper right corner) -->
            <text x="790" y="15" text-anchor="end" fill="#95a5a6" font-size="10" opacity="0.7">
              v${CARD_VERSION}
            </text>

            <!-- Temperature Status Indicators - Rendered last to appear on top -->
            <!-- HP outlet (on supply pipe at y=180) -->
            ${this.renderTemperatureIndicator(
              185,
              180,
              this.config.temperature_status?.points?.hp_outlet?.entity || this.config.heat_pump?.outlet_temp_entity,
              hpState.outletTemp,
              this.config.temperature_status?.points?.hp_outlet,
              hpOutletColor
            )}

            <!-- HP inlet (on return pipe at y=220) -->
            ${this.renderTemperatureIndicator(
              185,
              220,
              this.config.temperature_status?.points?.hp_inlet?.entity || this.config.heat_pump?.inlet_temp_entity,
              hpState.inletTemp,
              this.config.temperature_status?.points?.hp_inlet,
              hpInletColor
            )}

            <!-- Buffer supply (on supply pipe at y=180, outside buffer tank) -->
            ${this.renderTemperatureIndicator(
              385,
              180,
              this.config.temperature_status?.points?.buffer_supply?.entity || this.config.buffer_tank?.supply_temp_entity,
              bufferState.supplyTemp,
              this.config.temperature_status?.points?.buffer_supply,
              bufferSupplyColor
            )}

            <!-- HVAC supply (on supply pipe at y=180, near HVAC load) -->
            ${this.renderTemperatureIndicator(
              615,
              180,
              this.config.temperature_status?.points?.hvac_supply?.entity || this.config.hvac?.supply_temp_entity,
              hvacState.supplyTemp,
              this.config.temperature_status?.points?.hvac_supply,
              bufferSupplyColor
            )}

            <!-- Buffer return (on return pipe at y=220, outside buffer tank) -->
            ${this.renderTemperatureIndicator(
              385,
              220,
              this.config.temperature_status?.points?.buffer_return?.entity || this.config.buffer_tank?.return_temp_entity,
              bufferState.returnTemp,
              this.config.temperature_status?.points?.buffer_return,
              hvacReturnColor
            )}

            <!-- HVAC return (on return pipe at y=220, near HVAC load) -->
            ${this.renderTemperatureIndicator(
              615,
              220,
              this.config.temperature_status?.points?.hvac_return?.entity || this.config.hvac?.return_temp_entity,
              hvacState.returnTemp,
              this.config.temperature_status?.points?.hvac_return,
              hvacReturnColor
            )}

            <!-- DHW Tank Inlet (on pipe outside tank) -->
            ${this.renderTemperatureIndicator(
              385,
              370,
              this.config.temperature_status?.points?.dhw_inlet?.entity || this.config.dhw_tank?.inlet_temp_entity,
              dhwState.inletTemp,
              this.config.temperature_status?.points?.dhw_inlet,
              dhwInletColor
            )}

            <!-- DHW Tank Outlet (on pipe outside tank) -->
            ${this.renderTemperatureIndicator(
              385,
              470,
              this.config.temperature_status?.points?.dhw_outlet?.entity || this.config.dhw_tank?.outlet_temp_entity,
              dhwState.outletTemp,
              this.config.temperature_status?.points?.dhw_outlet,
              dhwOutletColor
            )}

            <!-- DHW Tank Street Water Inlet (cold water supply) -->
            ${this.renderTemperatureIndicator(
              370,
              420,
              this.config.temperature_status?.points?.dhw_tank_inlet?.entity || this.config.dhw_tank?.tank_inlet_temp_entity,
              dhwState.tankInletTemp ?? 0,
              this.config.temperature_status?.points?.dhw_tank_inlet,
              dhwTankInletColor
            )}

            <!-- DHW Tank Hot Water Outlet (to house or to tank 2) -->
            ${this.renderTemperatureIndicator(
              510,
              380,
              this.config.temperature_status?.points?.dhw_tank_outlet?.entity || this.config.dhw_tank?.tank_outlet_temp_entity,
              dhwState.tankOutletTemp ?? 0,
              this.config.temperature_status?.points?.dhw_tank_outlet,
              dhwTankOutletColor
            )}

            <!-- DHW Tank 2 Temperature Indicator (only when tank 2 is enabled) -->
            <!-- DHW Tank 2 Outlet (to house) -->
            ${dhwTank2State.enabled ? this.renderTemperatureIndicator(
              670,
              380,
              this.config.temperature_status?.points?.dhw_tank_2_outlet?.entity || this.config.dhw_tank_2?.outlet_temp_entity,
              dhwTank2State.outletTemp,
              this.config.temperature_status?.points?.dhw_tank_2_outlet,
              dhwTank2OutletColor
            ) : ''}
          </svg>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return cardStyles;
  }

  public getCardSize(): number {
    return 5;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'heat-pump-flow-card',
  name: 'Heat Pump Flow Card',
  description: 'Animated heat pump flow visualization card',
  preview: true,
  documentationURL: 'https://github.com/YOUR_USERNAME/heat-pump-flow-card',
});

// Debug helper: Add findHeatPumpCard to window for console debugging
(window as any).findHeatPumpCard = function(root: Document | ShadowRoot = document): HeatPumpFlowCard | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node: Node | null;
  while (node = walker.nextNode()) {
    if ((node as Element).tagName === 'HEAT-PUMP-FLOW-CARD') {
      return node as HeatPumpFlowCard;
    }
    if ((node as Element).shadowRoot) {
      const found = (window as any).findHeatPumpCard((node as Element).shadowRoot);
      if (found) return found;
    }
  }
  return null;
};

declare global {
  interface HTMLElementTagNameMap {
    'heat-pump-flow-card': HeatPumpFlowCard;
  }
}
