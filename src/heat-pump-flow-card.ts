import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HeatPumpFlowCardConfig, HeatPumpState, BufferTankState, HVACState, DHWTankState, G2ValveState } from './types';
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
        dot_stroke_width: 1.5,
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
  private lastG2State: boolean | null = null;
  private lastHpMode: string | null = null;
  private initialLogDone = false;

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

    // DEBUG: Log initial state once on first render
    if (!this.initialLogDone) {
      console.log('╔═══════════════════════════════════════╗');
      console.log('║     INITIAL STATE (First Render)     ║');
      console.log('╚═══════════════════════════════════════╝');
      console.log('🔄 G2 Valve:');
      console.log('   - isActive:', g2ValveState.isActive);
      console.log('   - Entity:', this.config.g2_valve?.state_entity || '(not configured)');
      console.log('   - Will render:', g2ValveState.isActive ? '🔵 DHW pipes' : '🔴 Heating pipes');
      console.log('⚡ Heat Pump:');
      console.log('   - Mode:', hpState.mode || '(undefined)');
      console.log('   - Mode Entity:', this.config.heat_pump?.mode_entity || '(not configured)');
      console.log('   - Power:', hpState.power, 'W');
      console.log('   - Flow Rate:', hpState.flowRate, 'L/min');
      console.log('   - Outlet Temp:', hpState.outletTemp, '°C');
      console.log('   - Inlet Temp:', hpState.inletTemp, '°C');
      console.log('═══════════════════════════════════════\n');
      this.initialLogDone = true;
      this.lastG2State = g2ValveState.isActive;
      this.lastHpMode = hpState.mode || null;
    }

    // DEBUG: Only log when G2 state or HP mode changes (not on every render)
    if (this.lastG2State !== g2ValveState.isActive) {
      console.log('═══════════════════════════════════════');
      console.log('🔄 G2 VALVE STATE CHANGED');
      console.log('G2 isActive:', g2ValveState.isActive);
      console.log('Will render:', g2ValveState.isActive ? '🔵 DHW pipes' : '🔴 Heating pipes');
      this.lastG2State = g2ValveState.isActive;
      console.log('═══════════════════════════════════════');
    }

    if (this.lastHpMode !== hpState.mode) {
      console.log('═══════════════════════════════════════');
      console.log('⚡ HP MODE CHANGED');
      console.log('HP Mode:', hpState.mode || '(undefined)');
      console.log('HP Power:', hpState.power, 'W');
      this.lastHpMode = hpState.mode || null;
      console.log('═══════════════════════════════════════');
    }

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

    return html`
      <ha-card>
        ${this.config.title ? html`<h1 class="card-header">${this.config.title}</h1>` : ''}

        <div class="card-content">
          <svg viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            <!-- Pipes with 10px gaps from entities for clean appearance -->
            <!-- SWAPPED: Return on top, Supply on bottom for cleaner DHW routing -->

            <!-- HEATING MODE PIPES (visible when G2 valve is in heating mode) -->
            ${!g2ValveState.isActive ? html`
              <!-- Pipe: Buffer to HP (cold return) - TOP - 10px gap from HP -->
              <path id="buffer-to-hp-path"
                    d="M 350 180 L 180 180"
                    stroke="${hpInletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: HP to Buffer (hot supply) - BOTTOM - 10px gap from HP -->
              <path id="hp-to-buffer-path"
                    d="M 180 220 L 350 220"
                    stroke="${hpOutletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>
            ` : html`
              <!-- DHW MODE PIPES (visible when G2 valve is in DHW mode) -->

              <!-- Pipe: HP to G2 valve (hot supply) -->
              <path id="hp-to-g2-path"
                    d="M 180 220 L 240 220 L 240 200"
                    stroke="${hpOutletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: G2 valve down to DHW tank inlet -->
              <path id="g2-to-dhw-path"
                    d="M 240 200 L 240 370 L 350 370 L 350 420 L 380 420"
                    stroke="${dhwCoilColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- DHW coil spiral path (for flow animation) -->
              <path id="dhw-coil-path"
                    d="M 380 420 Q 400 425, 420 420 Q 400 428, 380 435 Q 400 440, 420 435 Q 400 448, 380 455 Q 400 460, 420 455 Q 400 468, 380 475 Q 400 480, 420 475 Q 400 488, 380 495 Q 400 500, 420 495 Q 400 508, 380 515 Q 400 520, 420 515 Q 400 528, 380 535"
                    stroke="none"
                    stroke-width="0"
                    fill="none"
                    opacity="0"/>

              <!-- Pipe: DHW outlet up to HP return merge -->
              <path id="dhw-to-hp-return-path"
                    d="M 380 535 L 350 535 L 350 180 L 240 180 L 180 180"
                    stroke="${hpInletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>
            `}

            <!-- Pipe: Buffer to HVAC (hot) - 10px gap from HVAC -->
            <path id="buffer-to-hvac-path"
                  d="M 450 180 L 620 180"
                  stroke="${bufferSupplyColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Pipe: HVAC to Buffer (cold return) - 10px gap from HVAC -->
            <path id="hvac-to-buffer-path"
                  d="M 620 220 L 450 220"
                  stroke="${hvacReturnColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="butt"/>

            <!-- Temperature labels (swapped to match pipe positions) -->
            <text x="260" y="170" text-anchor="middle" fill="${hpInletColor}" font-size="11" font-weight="bold">
              ${this.config.labels!.hp_return}: ${this.formatValue(hpState.inletTemp, 1)}°${this.config.temperature?.unit || 'C'}
            </text>

            <text x="260" y="240" text-anchor="middle" fill="${hpOutletColor}" font-size="11" font-weight="bold">
              ${this.config.labels!.hp_supply}: ${this.formatValue(hpState.outletTemp, 1)}°${this.config.temperature?.unit || 'C'}
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

              <!-- Heat pump label -->
              <text x="60" y="85" text-anchor="middle" fill="${this.getHeatPumpColor(hpState)}" font-size="10" font-weight="bold">
                ${hpState.mode?.toUpperCase() || 'OFF'}
              </text>

              <!-- Error indicator -->
              ${hpState.error ? html`
                <text x="60" y="100" text-anchor="middle" fill="#e74c3c" font-size="10" font-weight="bold">
                  ⚠ ${hpState.error}
                </text>
              ` : ''}
            </g>

            <!-- Heat Pump Metrics (always visible - Lit conditional rendering doesn't work for SVG text) -->
            <g id="hp-metrics" transform="translate(50, 265)">
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

            <!-- G2 Diverter Valve (between HP and tanks) -->
            <g id="g2-valve" transform="translate(240, 200)">
              <!-- Valve body (rounded rectangle for realistic valve appearance) -->
              <rect x="-20" y="-12" width="40" height="24" rx="6"
                    fill="#34495e"
                    stroke="#2c3e50"
                    stroke-width="3"/>

              <!-- Valve inlet port (left) -->
              <rect x="-22" y="-6" width="4" height="12" fill="#2c3e50"/>

              <!-- Valve outlet ports (right and bottom) -->
              <rect x="18" y="-6" width="4" height="12" fill="#2c3e50"/>
              <rect x="-6" y="10" width="12" height="4" fill="#2c3e50"/>

              <!-- Rotating handle/actuator on top -->
              ${g2ValveState.isActive ? html`
                <!-- DHW Mode: Handle vertical (pointing down) -->
                <g transform="rotate(90 0 0)">
                  <rect x="-4" y="-28" width="8" height="18" rx="2"
                        fill="${this.config.heat_pump_visual?.dhw_color || '#e67e22'}"
                        stroke="#2c3e50"
                        stroke-width="2"/>
                  <circle cx="0" cy="-28" r="5"
                          fill="${this.config.heat_pump_visual?.dhw_color || '#e67e22'}"
                          stroke="#2c3e50"
                          stroke-width="2"/>
                </g>
              ` : html`
                <!-- Heating Mode: Handle horizontal (pointing right) -->
                <g>
                  <rect x="-4" y="-28" width="8" height="18" rx="2"
                        fill="#16a085"
                        stroke="#2c3e50"
                        stroke-width="2"/>
                  <circle cx="0" cy="-28" r="5"
                          fill="#16a085"
                          stroke="#2c3e50"
                          stroke-width="2"/>
                </g>
              `}

              <!-- Flow indicator arrow inside valve body -->
              ${g2ValveState.isActive ? html`
                <!-- DHW Mode: Arrow pointing DOWN -->
                <path d="M 0 -6 L 0 6 M -4 2 L 0 6 L 4 2"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      fill="none"/>
              ` : html`
                <!-- Heating Mode: Arrow pointing RIGHT -->
                <path d="M -8 0 L 8 0 M 4 -4 L 8 0 L 4 4"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      fill="none"/>
              `}

              <!-- Valve label above -->
              <text x="0" y="-40" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">
                G2
              </text>
              <text x="0" y="-28" text-anchor="end" fill="${g2ValveState.isActive ? (this.config.heat_pump_visual?.dhw_color || '#e67e22') : '#16a085'}" font-size="9" font-weight="bold" transform="translate(-25, 0)">
                ${g2ValveState.isActive ? 'DHW' : 'HEAT'}
              </text>
            </g>

            <!-- Improved Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(350, 100)">
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
            <g id="dhw-tank" transform="translate(350, 370)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="160" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="15" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>

              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="180" rx="40" ry="15" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>

              <!-- Inner cylinder (DHW water - always blue/cold) -->
              <rect x="15" y="25" width="70" height="150" fill="#3498db" opacity="0.3"/>

              <!-- Heating coil inside tank (spiral) -->
              <path d="M 30 50 Q 50 55, 70 50 Q 50 58, 30 65 Q 50 70, 70 65 Q 50 78, 30 85 Q 50 90, 70 85 Q 50 98, 30 105 Q 50 110, 70 105 Q 50 118, 30 125 Q 50 130, 70 125 Q 50 138, 30 145 Q 50 150, 70 145 Q 50 158, 30 165"
                    stroke="${dhwCoilColor}"
                    stroke-width="4"
                    fill="none"
                    opacity="0.9"/>

              <!-- Coil inlet/outlet markers -->
              <circle cx="30" cy="50" r="3" fill="${dhwCoilColor}"/>
              <circle cx="30" cy="165" r="3" fill="${dhwCoilColor}"/>

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

declare global {
  interface HTMLElementTagNameMap {
    'heat-pump-flow-card': HeatPumpFlowCard;
  }
}
