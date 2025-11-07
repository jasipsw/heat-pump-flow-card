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
        dot_size: 8,
        dot_spacing: 30,
        use_temp_color: true,
        dot_color: '#3498db',
        dot_stroke_color: 'white',
        dot_stroke_width: 1.0,  // Reduced from 1.5 for less prominent stroke
        dot_stroke_opacity: 0.8,  // New: control stroke opacity separately
        dot_opacity: 1,
        dot_shadow: true,
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
    // Only create dots if animations enabled (CSS handles animation automatically)
    if (this.config.animation.enabled) {
      this.createFlowDots();
      // Initial animation variable setup
      setTimeout(() => {
        this.updateAnimationVariables();
      }, 100);
    }
  }

  // No more JavaScript animation loops - CSS handles everything!

  private createFlowDots(): void {
    const svg = this.shadowRoot?.querySelector('svg');
    if (!svg) return;

    const hpState = this.getHeatPumpState();
    const bufferState = this.getBufferTankState();
    const hvacState = this.getHVACState();
    const dhwState = this.getDHWTankState();

    // Create dots for ALL paths (heating and DHW mode)
    // They'll be shown/hidden based on active mode
    const pathConfigs = [
      // Heating mode paths
      {
        id: 'hp-to-buffer-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'heating'
      },
      {
        id: 'buffer-to-hp-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'heating'
      },
      {
        id: 'buffer-to-hvac-path',
        flowRate: hvacState.flowRate,
        supplyTemp: bufferState.supplyTemp,
        returnTemp: hvacState.returnTemp,
        mode: 'both'  // Always visible
      },
      {
        id: 'hvac-to-buffer-path',
        flowRate: hvacState.flowRate,
        supplyTemp: bufferState.supplyTemp,
        returnTemp: hvacState.returnTemp,
        mode: 'both'  // Always visible
      },
      // DHW mode paths
      {
        id: 'hp-to-g2-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'dhw'
      },
      {
        id: 'g2-to-dhw-path',
        flowRate: hpState.flowRate,
        supplyTemp: dhwState.inletTemp,
        returnTemp: dhwState.outletTemp,
        mode: 'dhw'
      },
      {
        id: 'dhw-coil-path',
        flowRate: hpState.flowRate,
        supplyTemp: dhwState.inletTemp,
        returnTemp: dhwState.outletTemp,
        mode: 'dhw'
      },
      {
        id: 'dhw-to-hp-return-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'dhw'
      }
    ];

    pathConfigs.forEach((pathConfig, pathIndex) => {
      const pathElement = this.shadowRoot?.querySelector(`#${pathConfig.id}`) as SVGPathElement;
      if (!pathElement) return;

      // Get path data for CSS offset-path
      const pathData = pathElement.getAttribute('d');
      if (!pathData) return;

      // Calculate color and duration
      const pipeColors = this.getPipeColors(pathConfig.supplyTemp, pathConfig.returnTemp, pathConfig.flowRate);
      const isHotPipe = pathIndex % 2 === 0; // Even indices are hot pipes
      const dotColor = this.config.animation.use_temp_color
        ? (isHotPipe ? pipeColors.hotPipe : pipeColors.coldPipe)
        : this.config.animation.dot_color;

      const duration = this.getAnimationDuration(pathConfig.flowRate);
      const isFlowing = pathConfig.flowRate > 0;

      // Create 3 dots per path (reduced from 5 for better performance)
      for (let i = 0; i < 3; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        // Add CSS class for animation
        circle.classList.add('flow-dot');
        circle.setAttribute('data-path-id', pathConfig.id);

        // Position at origin (CSS offset-path will move it)
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', this.config.animation.dot_size.toString());
        circle.setAttribute('fill', dotColor!);
        circle.setAttribute('stroke', this.config.animation.dot_stroke_color!);
        circle.setAttribute('stroke-width', this.config.animation.dot_stroke_width!.toString());
        circle.setAttribute('stroke-opacity', this.config.animation.dot_stroke_opacity!.toString());

        // Set CSS variables for animation control
        const delay = (i / 3) * duration; // Space dots evenly
        circle.style.setProperty('--dot-path', `path('${pathData}')`);
        circle.style.setProperty('--dot-duration', `${duration}s`);
        circle.style.setProperty('--dot-delay', `${delay}s`);
        circle.style.setProperty('--dot-opacity', isFlowing ? this.config.animation.dot_opacity!.toString() : '0');

        svg.appendChild(circle);
      }
    });
  }

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
      // Heating mode paths (only visible when G2 valve not active)
      {
        id: 'hp-to-buffer-path',
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
        id: 'hp-to-g2-path',
        flowRate: hpState.flowRate,
        supplyTemp: hpState.outletTemp,
        returnTemp: hpState.inletTemp,
        mode: 'dhw',
        visible: g2ValveState.isActive
      },
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
      const isHotPipe = pathIndex % 2 === 0;
      const dotColor = this.config.animation.use_temp_color
        ? (isHotPipe ? pipeColors.hotPipe : pipeColors.coldPipe)
        : this.config.animation.dot_color;

      const duration = this.getAnimationDuration(pathConfig.flowRate);
      const isFlowing = pathConfig.flowRate > 0;

      // Hide dots if this path is not visible in current mode, or if not flowing
      const shouldShow = pathConfig.visible && isFlowing;

      dots.forEach((dot) => {
        (dot as SVGCircleElement).setAttribute('fill', dotColor!);
        (dot as SVGCircleElement).style.setProperty('--dot-duration', `${duration}s`);
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
    const displayName = cfg.display_name || 'AUX'; // Default to "AUX"
    return {
      enabled,
      power,
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

    // Return black for light backgrounds, white for dark backgrounds
    return luminance > 0.5 ? '#2c3e50' : '#ffffff';
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
    const metricsY = hpState.error ? 115 : 100;

    return html`
      <ha-card>
        ${this.config.title ? html`<h1 class="card-header">${this.config.title}</h1>` : ''}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
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

            <!-- Pipe: HP to Buffer (hot supply) - TOP - 10px gap from HP - ON TOP -->
            <path id="hp-to-buffer-path"
                  d="M 180 180 L 390 180"
                  stroke="${g2ValveState.isActive ? (this.config.temperature?.neutral_color || '#95a5a6') : hpOutletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '0.3' : '1'}"/>

            <!-- DHW MODE PIPES (shown when G2 valve is ON - DHW mode) -->
            <!-- Z-ORDER: Return pipes first (behind), then supply pipes (on top) -->

            <!-- Pipe: DHW outlet to HP return (BOTTOM) - routed away from buffer tank - BEHIND -->
            <path id="dhw-to-hp-return-path"
                  d="M 420 575 L 300 575 L 300 220 L 180 220"
                  stroke="${g2ValveState.isActive ? hpInletColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '1' : '0.3'}"/>

            <!-- Pipe: HP to G2 valve (hot supply from TOP) - leaves room for aux heater - ON TOP -->
            <path id="hp-to-g2-path"
                  d="M 180 180 L 280 180 L 280 190 L 275 190"
                  stroke="${g2ValveState.isActive ? hpOutletColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '1' : '0.3'}"/>

            <!-- Auxiliary Heater Coil (wraps around HP to G2 supply pipe) -->
            ${auxHeaterState.enabled ? html`
              <!-- Heating coil visualization - wraps around pipe from x=200 to x=270 -->
              <g id="aux-heater" opacity="${auxHeaterState.intensity > 0 ? '1' : '0.3'}">
                <!-- Coil wraps (spiral pattern) -->
                <path d="M 200 175 Q 205 170, 210 175 Q 215 180, 220 175 Q 225 170, 230 175 Q 235 180, 240 175 Q 245 170, 250 175 Q 255 180, 260 175 Q 265 170, 270 175"
                      stroke="${auxHeaterState.intensity > 0 ? '#ff4444' : '#95a5a6'}"
                      stroke-width="${2 + auxHeaterState.intensity * 2}"
                      fill="none"
                      opacity="0.7"
                      filter="drop-shadow(0 0 ${2 + auxHeaterState.intensity * 8}px ${auxHeaterState.intensity > 0 ? '#ff0000' : '#666666'})"/>
                <!-- Lower coil wrap -->
                <path d="M 200 185 Q 205 190, 210 185 Q 215 180, 220 185 Q 225 190, 230 185 Q 235 180, 240 185 Q 245 190, 250 185 Q 255 180, 260 185 Q 265 190, 270 185"
                      stroke="${auxHeaterState.intensity > 0 ? '#ff4444' : '#95a5a6'}"
                      stroke-width="${2 + auxHeaterState.intensity * 2}"
                      fill="none"
                      opacity="0.7"
                      filter="drop-shadow(0 0 ${2 + auxHeaterState.intensity * 8}px ${auxHeaterState.intensity > 0 ? '#ff0000' : '#666666'})"/>
                <!-- Power indicator label with custom display name -->
                ${auxHeaterState.power > 0 ? html`
                  <text x="235" y="165" text-anchor="middle" fill="#ff4444" font-size="9" font-weight="bold"
                        filter="drop-shadow(0 0 4px #ff0000)">
                    ${auxHeaterState.displayName}: ${this.formatValue(auxHeaterState.power / 1000, 1)} kW
                  </text>
                ` : ''}
              </g>
            ` : ''}

            <!-- Pipe: G2 valve down to DHW tank inlet (supply to coil) -->
            <path id="g2-to-dhw-path"
                  d="M 320 202 L 320 460 L 420 460"
                  stroke="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"
                  opacity="${g2ValveState.isActive ? '1' : '0.3'}"/>

            <!-- DHW coil spiral path (for flow animation) -->
            <path id="dhw-coil-path"
                  d="M 420 460 Q 440 465, 460 460 Q 440 468, 420 475 Q 440 480, 460 475 Q 440 488, 420 495 Q 440 500, 460 495 Q 440 508, 420 515 Q 440 520, 460 515 Q 440 528, 420 535 Q 440 540, 460 535 Q 440 548, 420 555 Q 440 560, 460 555 Q 440 568, 420 575"
                  stroke="none"
                  stroke-width="0"
                  fill="none"
                  opacity="0"/>

            <!-- Z-ORDER: Return first (behind), supply on top -->
            <!-- Pipe: HVAC to Buffer (cold return) - 10px gap from HVAC - BEHIND -->
            <path id="hvac-to-buffer-path"
                  d="M 620 220 L 490 220"
                  stroke="${hvacReturnColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: Buffer to HVAC (hot supply) - 10px gap from HVAC - ON TOP -->
            <path id="buffer-to-hvac-path"
                  d="M 490 180 L 620 180"
                  stroke="${bufferSupplyColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Temperature labels (hot supply on top, cold return on bottom) -->
            <text x="260" y="170" text-anchor="middle" fill="${hpOutletColor}" font-size="11" font-weight="bold">
              ${this.config.labels!.hp_supply}: ${this.formatValue(hpState.outletTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <text x="260" y="240" text-anchor="middle" fill="${hpInletColor}" font-size="11" font-weight="bold">
              ${this.config.labels!.hp_return}: ${this.formatValue(hpState.inletTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <text x="540" y="170" text-anchor="middle" fill="${bufferSupplyColor}" font-size="11" font-weight="bold">
              ${this.config.labels!.hvac_supply}: ${this.formatValue(bufferState.supplyTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <text x="540" y="240" text-anchor="middle" fill="${hvacReturnColor}" font-size="11" font-weight="bold">
              ${this.config.labels!.hvac_return}: ${this.formatValue(hvacState.returnTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)">
              <!-- Heat pump body with state-based color -->
              <rect width="120" height="150" rx="10" fill="${this.getHeatPumpColor(hpState)}" fill-opacity="0.2" stroke="${this.getHeatPumpColor(hpState)}" stroke-width="3"/>

              <!-- Fan housing -->
              <circle cx="60" cy="40" r="30" fill="#34495e" stroke="${this.getHeatPumpColor(hpState)}" stroke-width="2"/>

              <!-- Fan blades (will be animated) -->
              <g id="fan-blades">
                <!-- 4 fan blades -->
                <path d="M 60 10 Q 70 30, 60 40 Q 50 30, 60 10" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 90 40 Q 70 50, 60 40 Q 70 30, 90 40" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 60 70 Q 50 50, 60 40 Q 70 50, 60 70" fill="#7f8c8d" opacity="0.8"/>
                <path d="M 30 40 Q 50 30, 60 40 Q 50 50, 30 40" fill="#7f8c8d" opacity="0.8"/>
                <!-- Center cap -->
                <circle cx="60" cy="40" r="8" fill="#2c3e50"/>
              </g>

              <!-- Brand name (rendered after fan so it appears on top) -->
              ${this.config.heat_pump?.display_name ? html`
                <text x="60" y="10" text-anchor="middle" fill="${hpTextColor}" font-size="10" font-weight="bold">
                  ${this.config.heat_pump.display_name}
                </text>
              ` : ''}

              <!-- Heat pump label -->
              <text x="60" y="85" text-anchor="middle" fill="${this.getHeatPumpColor(hpState)}" font-size="10" font-weight="bold">
                ${this.getDisplayMode(hpState, g2ValveState)}
              </text>

              <!-- Error indicator -->
              ${hpState.error ? html`
                <text x="60" y="100" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${hpState.error}
                </text>
              ` : ''}

              <!-- Critical metrics inside HP box (2-column: Input | Output) -->
              <!-- Left column: INPUT parameters -->
              <text x="8" y="${metricsY}" fill="${hpTextColor}" font-size="10" font-weight="bold">IN</text>
              <text x="8" y="${metricsY + 14}" fill="${hpTextColor}" font-size="10">${this.formatValue(hpState.power/1000, 1)} kW</text>
              <text x="8" y="${metricsY + 28}" fill="${hpTextColor}" font-size="9">${this.formatValue(hpState.flowRate, 1)} L/m</text>

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
            <g id="g2-valve" transform="translate(320, 190) scale(1.0)">
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

              <!-- Valve label with smooth color transition -->
              <text x="-17" y="-20" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">
                G2
              </text>
              <text class="g2-valve-label"
                    x="-17" y="35"
                    text-anchor="middle"
                    fill="${g2ValveState.isActive ? (this.config.heat_pump_visual?.dhw_color || '#e74c3c') : '#16a085'}"
                    font-size="9"
                    font-weight="bold">
                ${g2ValveState.isActive ? 'DHW' : 'HEAT'}
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(390, 100)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="160" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="180" rx="40" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Thermal stratification (tank is 100% full, hot rises to top) -->
              <!-- Top section (hottest - supply temp) -->
              <rect x="15" y="25" width="70" height="35" fill="${bufferSupplyColor}" opacity="0.9"/>

              <!-- Upper-middle section (warm) -->
              <rect x="15" y="60" width="70" height="40" fill="${bufferSupplyColor}" opacity="0.7"/>

              <!-- Lower-middle section (cooling) -->
              <rect x="15" y="100" width="70" height="40" fill="${hvacReturnColor}" opacity="0.7"/>

              <!-- Bottom section (coldest - return temp) -->
              <rect x="15" y="140" width="70" height="35" fill="${hvacReturnColor}" opacity="0.9"/>

              <!-- Structural bands -->
              <line x1="10" y1="60" x2="90" y2="60" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="100" x2="90" y2="100" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="140" x2="90" y2="140" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="50" y="45" text-anchor="middle" fill="white" font-size="13" font-weight="bold">
                ${this.config.labels!.buffer_tank}
              </text>
            </g>

            <!-- DHW (Domestic Hot Water) Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(390, 410)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="160" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="180" rx="40" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Inner cylinder (DHW water - always blue/cold) -->
              <rect x="15" y="25" width="70" height="150" fill="#3498db" opacity="0.3"/>

              <!-- Heating coil inside tank (spiral) - gray when no flow, hot when flowing -->
              <path d="M 30 50 Q 50 55, 70 50 Q 50 58, 30 65 Q 50 70, 70 65 Q 50 78, 30 85 Q 50 90, 70 85 Q 50 98, 30 105 Q 50 110, 70 105 Q 50 118, 30 125 Q 50 130, 70 125 Q 50 138, 30 145 Q 50 150, 70 145 Q 50 158, 30 165"
                    stroke="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"
                    stroke-width="4"
                    fill="none"
                    opacity="${g2ValveState.isActive ? '0.9' : '0.3'}"/>

              <!-- Coil inlet/outlet markers -->
              <circle cx="30" cy="50" r="3" fill="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"/>
              <circle cx="30" cy="165" r="3" fill="${g2ValveState.isActive ? dhwCoilColor : (this.config.temperature?.neutral_color || '#95a5a6')}"/>

              <!-- Structural bands -->
              <line x1="10" y1="60" x2="90" y2="60" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="100" x2="90" y2="100" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="140" x2="90" y2="140" stroke="#2c3e50" stroke-width="2"/>

              <!-- Tank label inside top section -->
              <text x="50" y="45" text-anchor="middle" fill="white" font-size="13" font-weight="bold">
                ${this.config.labels!.dhw_tank}
              </text>

              <!-- Tank temperature if available -->
              ${dhwState.tankTemp ? html`
                <text x="50" y="200" text-anchor="middle" fill="#3498db" font-size="11" font-weight="bold">
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
              <text x="60" y="75" text-anchor="middle" fill="#95a5a6" font-size="12">
                Flow: ${this.formatValue(hvacState.flowRate, 1)} L/min
              </text>
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
