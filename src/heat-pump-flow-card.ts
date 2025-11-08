import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HeatPumpFlowCardConfig, HeatPumpState, BufferTankState, HVACState, DHWTankState, G2ValveState, AuxHeaterState, HousePerformanceState } from './types';
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
    const { animation, temperature, display, heat_pump_visual, labels, ...restConfig } = config;

    this.config = {
      ...restConfig,
      animation: {
        enabled: true,
        min_flow_rate: 5,
        max_flow_rate: 1,
        max_flow_rate_value: 50,
        dot_size: 1.5,  // Small particles for water effect (increased from 1.0 for better visibility)
        dot_spacing: 30,
        use_temp_color: false,  // Use single color for visibility on all pipe colors
        dot_color: 'rgba(255, 255, 255, 0.75)',  // White - visible on red, blue, and gray pipes
        dot_opacity: 1.0,  // Full opacity (transparency in rgba color)
        // Note: stroke/border removed for clean particles
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
  }

  // Flow animation now uses animated stroke-dasharray on pipe overlays (CSS-based)

  // Update CSS animation variables when state changes (CSS handles the actual animation)
  private updateAnimationVariables(): void {
    if (!this.config.animation.enabled) return;

    const hpState = this.getHeatPumpState();
    const bufferState = this.getBufferTankState();
    const hvacState = this.getHVACState();
    const dhwState = this.getDHWTankState();
    const g2ValveState = this.getG2ValveState();

    // Define all path configs with mode flags
    const pathConfigs = [
      // HP to aux heater - always flowing
      {
        id: 'hp-to-aux-heating-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'both',
        visible: true
      },
      // Aux heater to G2 - always flowing
      {
        id: 'aux-to-g2-heating-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'both',
        visible: true
      },
      // G2 to buffer - heating mode only
      {
        id: 'g2-to-buffer-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'heating',
        visible: !g2ValveState.isActive
      },
      {
        id: 'buffer-to-hp-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'heating',
        visible: !g2ValveState.isActive
      },
      // HVAC paths (always visible)
      {
        id: 'buffer-to-hvac-path',
        flowRate: hvacState.flowRate,
        supplyTemp: bufferState.supplyTemp,
        returnTemp: hvacState.returnTemp,
        mode: 'both',
        visible: true
      },
      {
        id: 'hvac-to-buffer-path',
        flowRate: hvacState.flowRate,
        supplyTemp: bufferState.supplyTemp,
        returnTemp: hvacState.returnTemp,
        mode: 'both',
        visible: true
      },
      // DHW mode paths (only visible when G2 valve active)
      {
        id: 'g2-to-dhw-path',
        flowRate: hpState.flowRate,
        supplyTemp: dhwState.inletTemp,
        returnTemp: dhwState.outletTemp,
        mode: 'dhw',
        visible: g2ValveState.isActive
      },
      {
        id: 'dhw-coil-path',
        flowRate: hpState.flowRate,
        supplyTemp: dhwState.inletTemp,
        returnTemp: dhwState.outletTemp,
        mode: 'dhw',
        visible: g2ValveState.isActive
      },
      {
        id: 'dhw-to-hp-return-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'dhw',
        visible: g2ValveState.isActive
      }
    ];

    pathConfigs.forEach((pathConfig, pathIndex) => {
      const dots = this.shadowRoot?.querySelectorAll(`.flow-dot[data-path-id="${pathConfig.id}"]`);
      if (!dots) return;

      const pipeColors = this.getPipeColors(pathConfig.supplyTemp, pathConfig.returnTemp, pathConfig.flowRate);

      // Determine if this is a supply (hot) or return (cold) pipe based on path name
      const isReturnPipe = pathConfig.id.includes('-to-hp-') ||
                           pathConfig.id.includes('hvac-to-buffer') ||
                           pathConfig.id.includes('dhw-to-hp');
      const dotColor = this.config.animation.use_temp_color
        ? (isReturnPipe ? pipeColors.coldPipe : pipeColors.hotPipe)
        : this.config.animation.dot_color;

      const duration = this.getAnimationDuration(pathConfig.flowRate);
      const isFlowing = pathConfig.flowRate > 0;

      // Hide dots if this path is not visible in current mode, or if not flowing
      const shouldShow = pathConfig.visible && isFlowing;

      // Update each dot with new duration, delay (for proper spacing), and color
      const dotCount = dots.length;
      dots.forEach((dot, index) => {
        const delay = (index / dotCount) * duration; // Recalculate delay for even spacing
        (dot as SVGCircleElement).setAttribute('fill', dotColor!);
        (dot as SVGCircleElement).style.setProperty('--dot-duration', `${duration}s`);
        (dot as SVGCircleElement).style.setProperty('--dot-delay', `${delay}s`);  // Update delay!
        (dot as SVGCircleElement).style.setProperty('--dot-opacity', shouldShow ? this.config.animation.dot_opacity!.toString() : '0');
      });
    });

    // Update fan animation speed
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
   * Calculate pipe colors based on temperature delta between supply and return
   * Returns {hotPipe, coldPipe} colors based on delta threshold
   */
  private getPipeColors(hotTemp: number, coldTemp: number, flowRate: number): { hotPipe: string; coldPipe: string } {
    const cfg = this.config.temperature!;
    const delta = Math.abs(hotTemp - coldTemp);

    // If no flow or delta below threshold, both pipes are neutral
    if (flowRate <= 0 || delta < cfg.delta_threshold!) {
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
    const g2ValveState = this.getG2ValveState();
    const auxHeaterState = this.getAuxHeaterState();

    // Calculate pipe colors based on temperature delta
    const hpPipeColors = this.getPipeColors(hpState.outletTemp, hpState.inletTemp, hpState.flowRate);
    const hvacPipeColors = this.getPipeColors(bufferState.supplyTemp, hvacState.returnTemp, hvacState.flowRate);
    const dhwPipeColors = this.getPipeColors(dhwState.inletTemp, dhwState.outletTemp, hpState.flowRate);

    // Extract individual pipe colors
    const hpOutletColor = hpPipeColors.hotPipe;
    const hpInletColor = hpPipeColors.coldPipe;
    const bufferSupplyColor = hvacPipeColors.hotPipe;
    const hvacReturnColor = hvacPipeColors.coldPipe;
    const dhwCoilColor = dhwPipeColors.hotPipe;

    // Calculate metrics text colors and positioning
    const hpBgColor = this.getHeatPumpColor(hpState);
    const hpTextColor = this.getContrastTextColor(hpBgColor);
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

    // Get shadow blur multiplier from config (default: 1.0)
    const shadowBlur = this.config.aux_heater?.shadow_blur ?? 1.0;

    // Determine CSS classes for glow layers based on aux heater intensity
    const outerClass = auxIntensity > 0 ? 'aux-glow-outer' : 'aux-heater-layer';
    const middleClass = auxIntensity > 0 ? 'aux-glow-middle' : 'aux-heater-layer';
    const innerClass = auxIntensity > 0 ? 'aux-glow-inner' : 'aux-heater-layer';
    // Main cylinder always visible (just gray when off), only animates when active
    const cylinderClass = auxIntensity > 0 ? 'aux-cylinder-pulse' : '';

    return html`
      <ha-card>
        ${this.config.title ? html`<h1 class="card-header">${this.config.title}</h1>` : ''}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
            <!-- SVG Filter Definitions -->
            <defs>
              <!-- Drop shadow filter for aux heater -->
              <filter id="aux-heater-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000000" flood-opacity="0.5"/>
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

              <!-- Flow gradients for animated shimmer effect -->
              <!-- Using objectBoundingBox (default) so gradient scales to each path -->
              <!-- Hot water flow gradient (red/orange shimmer) - repeating pattern -->
              <linearGradient id="flow-gradient-hot" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
                <stop offset="20%" stop-color="rgba(255, 200, 150, 0.6)" />
                <stop offset="40%" stop-color="rgba(255, 255, 255, 1)" />
                <stop offset="60%" stop-color="rgba(255, 200, 150, 0.6)" />
                <stop offset="80%" stop-color="rgba(255, 255, 255, 0)" />
                <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1 0"
                  to="1 0"
                  dur="3s"
                  repeatCount="indefinite" />
              </linearGradient>

              <!-- Cold water flow gradient (blue/cyan shimmer) - repeating pattern -->
              <linearGradient id="flow-gradient-cold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
                <stop offset="20%" stop-color="rgba(150, 200, 255, 0.6)" />
                <stop offset="40%" stop-color="rgba(255, 255, 255, 1)" />
                <stop offset="60%" stop-color="rgba(150, 200, 255, 0.6)" />
                <stop offset="80%" stop-color="rgba(255, 255, 255, 0)" />
                <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1 0"
                  to="1 0"
                  dur="3s"
                  repeatCount="indefinite" />
              </linearGradient>

              <!-- Neutral flow gradient (white shimmer for inactive pipes) -->
              <linearGradient id="flow-gradient-neutral" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
                <stop offset="20%" stop-color="rgba(255, 255, 255, 0.4)" />
                <stop offset="40%" stop-color="rgba(255, 255, 255, 0.8)" />
                <stop offset="60%" stop-color="rgba(255, 255, 255, 0.4)" />
                <stop offset="80%" stop-color="rgba(255, 255, 255, 0)" />
                <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1 0"
                  to="1 0"
                  dur="4s"
                  repeatCount="indefinite" />
              </linearGradient>
            </defs>

            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Pipes with 10px gaps from entities for clean appearance -->
            <!-- CONVENTIONAL: Supply on top (hot), Return on bottom (cold) -->

            <!-- HEATING MODE PIPES (shown when G2 valve is OFF - heating mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: Buffer to HP (cold return) - BOTTOM - 10px gap from HP - BEHIND -->
            <path id="buffer-to-hp-path"
                  d="M 390 220 L 180 220"
                  stroke="${g2ValveState.isActive ? (this.config.temperature?.neutral_color || '#95a5a6') : hpInletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '0.3' : '1'}"/>

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
            <path id="aux-to-g2-heating-path"
                  d="M 254 180 L 328 180"
                  stroke="${auxIntensity > 0 ? (this.config.temperature?.hot_color || '#e74c3c') : hpOutletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="1"/>

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

            <!-- Pipe: DHW outlet to HP return (BOTTOM) - Separated horizontally at x=370 - BEHIND -->
            <path id="dhw-to-hp-return-path"
                  d="M 418 470 L 370 470 L 370 220 L 180 220"
                  stroke="${g2ValveState.isActive ? hpInletColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '1' : '0.3'}"/>

            <!-- Pipe: G2 valve down to DHW tank inlet (supply to coil) - At x=348, horizontally separated from return -->
            <path id="g2-to-dhw-path"
                  d="M 348 195 L 348 370 L 418 370"
                  stroke="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '1' : '0.3'}"/>

            <!-- DHW coil spiral path (for flow animation) - Matches actual tank coil position -->
            <path id="dhw-coil-path"
                  d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                  stroke="none"
                  stroke-width="0"
                  fill="none"
                  opacity="0"/>

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
            ${this.config.animation?.enabled !== false ? html`
              <!-- Hot pipe flows (HP to buffer/DHW) -->
              <path class="flow-gradient"
                    d="M 180 180 L 254 180"
                    stroke="url(#flow-gradient-hot)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"></path>

              <path class="flow-gradient"
                    d="M 254 180 L 328 180"
                    stroke="url(#flow-gradient-hot)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"
                    opacity="${g2ValveState.isActive ? '0.3' : '1'}"></path>

              <path class="flow-gradient"
                    d="M 367 180 L 390 180"
                    stroke="url(#flow-gradient-hot)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"
                    opacity="${g2ValveState.isActive ? '0.3' : '1'}"></path>

              <path class="flow-gradient"
                    d="M 480 180 L 620 180"
                    stroke="url(#flow-gradient-hot)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"></path>

              <!-- Cold pipe flows (return to HP) -->
              <path class="flow-gradient"
                    d="M 390 220 L 180 220"
                    stroke="url(#flow-gradient-cold)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"
                    opacity="${g2ValveState.isActive ? '0.3' : '1'}"></path>

              <path class="flow-gradient"
                    d="M 620 220 L 480 220"
                    stroke="url(#flow-gradient-cold)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"></path>

              <!-- DHW mode flows -->
              <path class="flow-gradient"
                    d="M 348 195 L 348 370 L 418 370"
                    stroke="url(#flow-gradient-hot)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"
                    opacity="${g2ValveState.isActive ? '1' : '0.3'}"></path>

              <!-- DHW coil spiral flow -->
              <path class="flow-gradient"
                    d="M 418 370 Q 438 378, 458 370 Q 438 390, 418 390 Q 438 406, 458 390 Q 438 422, 418 422 Q 438 438, 458 422 Q 438 454, 418 454 Q 438 470, 458 454 Q 438 478, 418 470"
                    stroke="url(#flow-gradient-hot)"
                    stroke-width="8"
                    fill="none"
                    stroke-linecap="round"
                    opacity="${g2ValveState.isActive ? '1' : '0'}"></path>

              <path class="flow-gradient"
                    d="M 418 470 L 370 470 L 370 220 L 180 220"
                    stroke="url(#flow-gradient-cold)"
                    stroke-width="10"
                    fill="none"
                    stroke-linecap="round"
                    opacity="${g2ValveState.isActive ? '1' : '0.3'}"></path>
            ` : ''}

            <!-- Temperature and flow rate labels (configurable styling) -->
            <!-- Top row: supply temperatures and flow rate -->
            <text x="260" y="170" text-anchor="middle" fill="${hpOutletColor}"
                  font-size="${this.config.text_style?.font_size || 11}"
                  font-family="${this.config.text_style?.font_family || 'Courier New, monospace'}"
                  font-weight="${this.config.text_style?.font_weight || 'bold'}">
              ${this.config.text_style?.show_labels ? `${this.config.labels!.hp_supply}: ` : ''}${this.formatValue(hpState.outletTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <!-- Flow rate between pipes (HP to G2/Buffer) -->
            <text x="277" y="205" text-anchor="middle" fill="#95a5a6"
                  font-size="${(this.config.text_style?.font_size || 11) - 1}"
                  font-family="${this.config.text_style?.font_family || 'Courier New, monospace'}"
                  font-weight="normal">
              ${this.formatValue(hpState.flowRate, 1)} L/m
            </text>

            <text x="260" y="240" text-anchor="middle" fill="${hpInletColor}"
                  font-size="${this.config.text_style?.font_size || 11}"
                  font-family="${this.config.text_style?.font_family || 'Courier New, monospace'}"
                  font-weight="${this.config.text_style?.font_weight || 'bold'}">
              ${this.config.text_style?.show_labels ? `${this.config.labels!.hp_return}: ` : ''}${this.formatValue(hpState.inletTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <!-- Supply temp (top) - above supply pipe, centered horizontally -->
            <text x="550" y="170" text-anchor="middle" fill="${bufferSupplyColor}"
                  font-size="${this.config.text_style?.font_size || 11}"
                  font-family="${this.config.text_style?.font_family || 'Courier New, monospace'}"
                  font-weight="${this.config.text_style?.font_weight || 'bold'}">
              ${this.config.text_style?.show_labels ? `${this.config.labels!.hvac_supply}: ` : ''}${this.formatValue(bufferState.supplyTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <!-- Flow rate - centered vertically between pipes, centered horizontally -->
            <text x="550" y="205" text-anchor="middle" fill="#95a5a6"
                  font-size="${(this.config.text_style?.font_size || 11) - 1}"
                  font-family="${this.config.text_style?.font_family || 'Courier New, monospace'}"
                  font-weight="normal">
              ${this.formatValue(hvacState.flowRate, 1)} L/m
            </text>

            <!-- Return temp (bottom) - below return pipe, centered horizontally -->
            <text x="550" y="240" text-anchor="middle" fill="${hvacReturnColor}"
                  font-size="${this.config.text_style?.font_size || 11}"
                  font-family="${this.config.text_style?.font_family || 'Courier New, monospace'}"
                  font-weight="${this.config.text_style?.font_weight || 'bold'}">
              ${this.config.text_style?.show_labels ? `${this.config.labels!.hvac_return}: ` : ''}${this.formatValue(hvacState.returnTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)">
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

              <!-- Critical metrics inside HP box (2-column: Input | Output) -->
              <!-- Left column: INPUT parameters -->
              <text x="8" y="${metricsY}" fill="${hpTextColor}" font-size="10" font-weight="bold">IN</text>
              <text x="8" y="${metricsY + 14}" fill="${hpTextColor}" font-size="10">${this.formatValue(hpState.power/1000, 1)} kW</text>

              <!-- Right column: OUTPUT parameters -->
              <text x="62" y="${metricsY}" fill="${hpTextColor}" font-size="10" font-weight="bold">OUT</text>
              <text x="62" y="${metricsY + 14}" fill="${hpTextColor}" font-size="10">${this.formatValue(hpState.thermal/1000, 1)} kW</text>
              <text x="62" y="${metricsY + 28}" fill="${hpTextColor}" font-size="9">COP ${this.formatValue(hpState.cop, 2)}</text>
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
              <text x="0" y="124" fill="#9b59b6" font-size="12">${this.formatValue(hpState.flowRate, 1)} L/min</text>

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

            <!-- G2 Diverter Valve (3-way valve between HP and tanks) -->
            <g id="g2-valve" transform="translate(360, 180) scale(0.7)">
              <!-- Valve body - cylindrical with flanges (matching valve idea graphic) -->
              <!-- Left inlet flange -->
              <rect x="-45" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Main body cylinder -->
              <rect x="-35" y="-12" width="35" height="24" fill="#bdc3c7" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Right outlet flange (to buffer/heating) -->
              <rect x="0" y="-8" width="10" height="16" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>
              <!-- Bottom outlet flange (to DHW) - adjusted for better alignment -->
              <rect x="-25" y="12" width="16" height="10" fill="#95a5a6" stroke="#7f8c8d" stroke-width="1.5"/>

              <!-- Internal flow path visualization with animations -->
              ${g2ValveState.isActive ? html`
                <!-- DHW Mode: Flow DOWN (from left inlet to bottom outlet) -->
                <!-- Active path in red with pulsing animation -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L -17 0 L -17 12"
                      stroke="${this.config.heat_pump_visual?.dhw_color || '#e74c3c'}"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                <!-- Inactive path (to right) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -17 -8 L 0 8 M -17 8 L 0 -8"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              ` : html`
                <!-- Heating Mode: Flow ACROSS (from left inlet to right outlet) -->
                <!-- Active path in green with pulsing animation -->
                <path class="g2-valve-path g2-valve-active-path"
                      d="M -35 0 L 0 0"
                      stroke="#16a085"
                      stroke-width="6"
                      fill="none"
                      stroke-linecap="round"/>
                <!-- Inactive path (to bottom) shown as X with transition -->
                <path class="g2-valve-path"
                      d="M -25 4 L -9 20 M -9 4 L -25 20"
                      stroke="#7f8c8d"
                      stroke-width="2"
                      opacity="0.4"/>
              `}

              <!-- Valve label -->
              <text x="-17" y="-20" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">
                G2
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(390, 100)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Thermal stratification (tank is 100% full, hot rises to top) -->
              <!-- Top section (hottest - supply temp) -->
              <rect x="15" y="25" width="60" height="30" fill="${bufferSupplyColor}" opacity="0.9"/>

              <!-- Upper-middle section (warm) -->
              <rect x="15" y="55" width="60" height="35" fill="${bufferSupplyColor}" opacity="0.7"/>

              <!-- Lower-middle section (cooling) -->
              <rect x="15" y="90" width="60" height="35" fill="${hvacReturnColor}" opacity="0.7"/>

              <!-- Bottom section (coldest - return temp) -->
              <rect x="15" y="125" width="60" height="30" fill="${hvacReturnColor}" opacity="0.9"/>

              <!-- Structural bands -->
              <line x1="10" y1="55" x2="80" y2="55" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="90" x2="80" y2="90" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="125" x2="80" y2="125" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="45" y="42" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                ${this.config.labels!.buffer_tank}
              </text>
            </g>

            <!-- DHW (Domestic Hot Water) Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(390, 330)">
              <!-- Tank cylinder body - reduced from 160 to 140 height -->
              <rect x="10" y="20" width="70" height="140" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap - reduced from rx=40 to rx=35 -->
              <ellipse cx="45" cy="20" rx="35" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="45" cy="160" rx="35" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Inner cylinder (DHW water - always blue/cold) -->
              <rect x="15" y="25" width="60" height="130" fill="#3498db" opacity="0.3"/>

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

              <!-- Tank label inside top section -->
              <text x="45" y="42" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                ${this.config.labels!.dhw_tank}
              </text>

              <!-- Tank temperature if available -->
              ${dhwState.tankTemp ? html`
                <text x="45" y="180" text-anchor="middle" fill="#3498db" font-size="11" font-weight="bold">
                  Tank: ${this.formatValue(dhwState.tankTemp, 1)}°${this.config.temperature?.unit || 'C'}
                </text>
              ` : ''}
            </g>

            <!-- HVAC Load (right side) -->
            <g id="hvac-load" transform="translate(630, 150)">
              <rect width="120" height="100" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="2"/>
              <text x="60" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                HVAC LOAD
              </text>
              <text x="60" y="55" text-anchor="middle" fill="#e74c3c" font-size="20" font-weight="bold">
                ${this.formatValue(hvacState.thermal, 0)} W
              </text>
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
              <rect x="${outerGlow.x}" y="${outerGlow.y}"
                    width="${outerGlow.width}" height="${outerGlow.height}"
                    rx="${outerGlow.rx}" ry="${outerGlow.ry}"
                    class="${outerClass}"
                    fill="#ff4422"
                    pointer-events="none"/>

              <!-- Middle glow layer - size based on config -->
              <rect x="${middleGlow.x}" y="${middleGlow.y}"
                    width="${middleGlow.width}" height="${middleGlow.height}"
                    rx="${middleGlow.rx}" ry="${middleGlow.ry}"
                    class="${middleClass}"
                    fill="#ff6644"
                    pointer-events="none"/>

              <!-- Inner glow layer - size based on config -->
              <rect x="${innerGlow.x}" y="${innerGlow.y}"
                    width="${innerGlow.width}" height="${innerGlow.height}"
                    rx="${innerGlow.rx}" ry="${innerGlow.ry}"
                    class="${innerClass}"
                    fill="#ff8855"
                    pointer-events="none"/>

              <!-- Main heated cylinder body (centered at x=254) -->
              <rect x="${cylX}" y="${cylY}" width="${cylW}" height="${cylH}" rx="2" ry="2"
                    class="${cylinderClass}"
                    fill="${auxCylinderColor}"
                    stroke="#7f8c8d"
                    stroke-width="1.5"/>

              <!-- Left flange (pipe connection) -->
              <rect x="${cylX - 6}" y="${cylY + 2}" width="6" height="12"
                    fill="#95a5a6"
                    stroke="#7f8c8d"
                    stroke-width="1.5"/>

              <!-- Right flange (pipe connection) -->
              <rect x="${cylX + cylW}" y="${cylY + 2}" width="6" height="12"
                    fill="#95a5a6"
                    stroke="#7f8c8d"
                    stroke-width="1.5"/>
            </g>

            <!-- Version display (upper right corner) -->
            <text x="790" y="15" text-anchor="end" fill="#95a5a6" font-size="10" opacity="0.7">
              v${CARD_VERSION}
            </text>

            <!-- Flow dots created programmatically in firstUpdated() -->
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
