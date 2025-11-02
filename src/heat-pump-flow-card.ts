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
    const { animation, temperature, display, heat_pump_visual, ...restConfig } = config;

    this.config = {
      ...restConfig,
      animation: {
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
    };
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this.updateAnimations();

      // Update cached values for animation performance (avoid reading state 60fps)
      const hpState = this.getHeatPumpState();
      const hvacState = this.getHVACState();
      const bufferState = this.getBufferTankState();

      this.cachedFanSpeed = hpState.fanSpeed || 0;

      // Cache flow configuration for each path
      // Calculate pipe colors based on temperature delta
      const useTempColor = this.config.animation.use_temp_color;
      const fixedColor = this.config.animation.dot_color;

      const hpPipeColors = this.getPipeColors(hpState.outletTemp, hpState.inletTemp, hpState.flowRate);
      const hvacPipeColors = this.getPipeColors(bufferState.supplyTemp, hvacState.returnTemp, hvacState.flowRate);
      const dhwState = this.getDHWTankState();
      const dhwPipeColors = this.getPipeColors(dhwState.inletTemp, dhwState.outletTemp, hpState.flowRate);

      // Cache config for all possible paths (both heating and DHW modes)
      this.cachedFlowConfig = {
        // Common path
        'hp-to-g2-path': {
          flowRate: hpState.flowRate,
          temp: hpState.outletTemp,
          duration: this.getAnimationDuration(hpState.flowRate),
          color: useTempColor ? hpPipeColors.hotPipe : fixedColor!
        },
        // Heating mode paths
        'g2-to-buffer-path': {
          flowRate: hpState.flowRate,
          temp: hpState.outletTemp,
          duration: this.getAnimationDuration(hpState.flowRate),
          color: useTempColor ? hpPipeColors.hotPipe : fixedColor!
        },
        'buffer-to-hp-path': {
          flowRate: hpState.flowRate,
          temp: hpState.inletTemp,
          duration: this.getAnimationDuration(hpState.flowRate),
          color: useTempColor ? hpPipeColors.coldPipe : fixedColor!
        },
        'buffer-to-hvac-path': {
          flowRate: hvacState.flowRate,
          temp: bufferState.supplyTemp,
          duration: this.getAnimationDuration(hvacState.flowRate),
          color: useTempColor ? hvacPipeColors.hotPipe : fixedColor!
        },
        'hvac-to-buffer-path': {
          flowRate: hvacState.flowRate,
          temp: hvacState.returnTemp,
          duration: this.getAnimationDuration(hvacState.flowRate),
          color: useTempColor ? hvacPipeColors.coldPipe : fixedColor!
        },
        // DHW mode paths
        'g2-to-dhw-path': {
          flowRate: hpState.flowRate,
          temp: dhwState.inletTemp,
          duration: this.getAnimationDuration(hpState.flowRate),
          color: useTempColor ? dhwPipeColors.hotPipe : fixedColor!
        },
        'dhw-to-hp-path': {
          flowRate: hpState.flowRate,
          temp: dhwState.outletTemp,
          duration: this.getAnimationDuration(hpState.flowRate),
          color: useTempColor ? dhwPipeColors.coldPipe : fixedColor!
        }
      };
    }
  }

  protected firstUpdated(): void {
    // Create circles using DOM manipulation instead of Lit templates
    this.createFlowDots();

    // Start animations
    setTimeout(() => {
      this.startAnimationLoop();
      if (this.config.heat_pump_visual?.animate_fan) {
        this.startFanAnimation();
      }
    }, 100);
  }

  private fanRotation = 0;
  private cachedFanSpeed = 0;
  private cachedFlowConfig: Record<string, { flowRate: number; temp: number; duration: number; color: string }> = {};

  private startFanAnimation(): void {
    const animate = () => {
      const fanBlades = this.shadowRoot?.querySelector('#fan-blades');
      if (!fanBlades) {
        requestAnimationFrame(animate);
        return;
      }

      // Only rotate if fan is running (speed > 0)
      if (this.cachedFanSpeed > 0) {
        // Rotation speed based on fan speed (0-100%)
        // At 100% fan speed, complete rotation every ~1 second (360deg/s)
        // At 50% fan speed, every ~2 seconds (180deg/s)
        const rotationSpeed = (this.cachedFanSpeed / 100) * 6; // degrees per frame at 60fps
        this.fanRotation = (this.fanRotation + rotationSpeed) % 360;

        fanBlades.setAttribute('transform', `rotate(${this.fanRotation} 60 40)`);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  private createFlowDots(): void {
    const svg = this.shadowRoot?.querySelector('svg');
    if (!svg) return;

    const hpState = this.getHeatPumpState();
    const bufferState = this.getBufferTankState();
    const hvacState = this.getHVACState();
    const dhwState = this.getDHWTankState();

    // Determine dot colors based on configuration
    const useTempColor = this.config.animation.use_temp_color;
    const fixedColor = this.config.animation.dot_color;

    const hpPipeColors = this.getPipeColors(hpState.outletTemp, hpState.inletTemp, hpState.flowRate);
    const hvacPipeColors = this.getPipeColors(bufferState.supplyTemp, hvacState.returnTemp, hvacState.flowRate);
    const dhwPipeColors = this.getPipeColors(dhwState.inletTemp, dhwState.outletTemp, hpState.flowRate);

    // Create dots for all possible paths (both heating and DHW modes)
    // The animation loop will only animate paths that exist in the DOM
    const paths = [
      // Common path
      { id: 'hp-to-g2-path', color: useTempColor ? hpPipeColors.hotPipe : fixedColor },

      // Heating mode paths
      { id: 'g2-to-buffer-path', color: useTempColor ? hpPipeColors.hotPipe : fixedColor },
      { id: 'buffer-to-hp-path', color: useTempColor ? hpPipeColors.coldPipe : fixedColor },
      { id: 'buffer-to-hvac-path', color: useTempColor ? hvacPipeColors.hotPipe : fixedColor },
      { id: 'hvac-to-buffer-path', color: useTempColor ? hvacPipeColors.coldPipe : fixedColor },

      // DHW mode paths
      { id: 'g2-to-dhw-path', color: useTempColor ? dhwPipeColors.hotPipe : fixedColor },
      { id: 'dhw-to-hp-path', color: useTempColor ? dhwPipeColors.coldPipe : fixedColor }
    ];

    paths.forEach(pathInfo => {
      for (let i = 0; i < 5; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('data-path-id', pathInfo.id);
        circle.setAttribute('data-index', i.toString());
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');

        // Apply configured styling
        circle.setAttribute('r', this.config.animation.dot_size.toString());
        circle.setAttribute('fill', pathInfo.color!);
        circle.setAttribute('stroke', this.config.animation.dot_stroke_color!);
        circle.setAttribute('stroke-width', this.config.animation.dot_stroke_width!.toString());
        circle.setAttribute('opacity', this.config.animation.dot_opacity!.toString());

        // Conditionally add shadow
        if (this.config.animation.dot_shadow) {
          circle.setAttribute('filter', 'drop-shadow(0px 0px 2px rgba(0,0,0,0.3))');
        }

        svg.appendChild(circle);
      }
    });
  }

  private animationFrameId?: number;
  private frameCount = 0;

  private startAnimationLoop(): void {
    const animate = () => {
      const circles = this.shadowRoot?.querySelectorAll('circle[data-path-id]');
      if (!circles || circles.length === 0) {
        this.animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const time = Date.now() / 1000;

      circles.forEach((circle) => {
        const pathId = (circle as SVGCircleElement).dataset.pathId;
        const index = parseInt((circle as SVGCircleElement).dataset.index || '0');

        if (!pathId) return;

        // Use cached config (updated only when HA state changes, not 60fps)
        const config = this.cachedFlowConfig[pathId];
        if (!config) return;

        const path = this.shadowRoot?.querySelector(`#${pathId}`) as SVGPathElement;
        if (!path) return;

        const pathLength = path.getTotalLength();

        // Update color only if it changed (avoid expensive setAttribute calls at 60fps)
        const currentColor = circle.getAttribute('fill');
        if (currentColor !== config.color) {
          circle.setAttribute('fill', config.color);
        }

        // Hide/show dots based on flow (use configured opacity when visible)
        const currentOpacity = circle.getAttribute('opacity');
        const targetOpacity = config.flowRate <= 0 ? '0' : this.config.animation.dot_opacity!.toString();
        if (currentOpacity !== targetOpacity) {
          circle.setAttribute('opacity', targetOpacity);
        }

        // Space dots evenly as a percentage of duration (20% apart for 5 dots)
        const delay = index * 0.2 * config.duration;
        const progress = ((time + delay) % config.duration) / config.duration;
        const distance = progress * pathLength;

        const point = path.getPointAtLength(distance);

        circle.setAttribute('cx', point.x.toString());
        circle.setAttribute('cy', point.y.toString());
      });

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
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

    // Determine color based on mode
    const mode = state.mode?.toLowerCase();
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

  private updateAnimations(): void {
    const hpState = this.getHeatPumpState();
    const hvacState = this.getHVACState();

    // Update flow speeds based on flow rates
    this.updateFlowSpeed(this.hpToBufferFlow, hpState.flowRate);
    this.updateFlowSpeed(this.bufferToHpFlow, hpState.flowRate);
    this.updateFlowSpeed(this.bufferToHvacFlow, hvacState.flowRate);
    this.updateFlowSpeed(this.hvacToBufferFlow, hvacState.flowRate);
  }

  private updateFlowSpeed(group: SVGGElement | undefined, flowRate: number): void {
    if (!group) return;

    const duration = this.getAnimationDuration(flowRate);
    const circles = group.querySelectorAll('circle');

    circles.forEach((circle, index) => {
      // Control visibility based on flow rate
      if (flowRate <= 0) {
        circle.style.opacity = '0';
      } else {
        circle.style.opacity = '0.9';
      }
    });

    // Note: Changing animation duration dynamically doesn't work well with declarative SVG
    // The animations will run at the speed defined in the template
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const hpState = this.getHeatPumpState();
    const bufferState = this.getBufferTankState();
    const hvacState = this.getHVACState();
    const dhwState = this.getDHWTankState();
    const g2ValveState = this.getG2ValveState();

    // Calculate pipe colors based on temperature delta
    const hpPipeColors = this.getPipeColors(hpState.outletTemp, hpState.inletTemp, hpState.flowRate);
    const hvacPipeColors = this.getPipeColors(bufferState.supplyTemp, hvacState.returnTemp, hvacState.flowRate);
    const dhwPipeColors = this.getPipeColors(dhwState.inletTemp, dhwState.outletTemp, hpState.flowRate);

    // Extract individual pipe colors for buffer/HVAC loop
    const hpOutletColor = hpPipeColors.hotPipe;
    const hpInletColor = hpPipeColors.coldPipe;
    const bufferSupplyColor = hvacPipeColors.hotPipe;
    const hvacReturnColor = hvacPipeColors.coldPipe;

    // Extract pipe colors for DHW loop
    const dhwInletColor = dhwPipeColors.hotPipe;
    const dhwOutletColor = dhwPipeColors.coldPipe;

    return html`
      <ha-card>
        ${this.config.title ? html`<h1 class="card-header">${this.config.title}</h1>` : ''}

        <div class="card-content">
          <svg viewBox="0 0 800 650" xmlns="http://www.w3.org/2000/svg">
            <!-- Flow Pipes (rendered first so they appear behind entities) -->

            ${g2ValveState.isActive ? html`
              <!-- DHW Mode: HP → G2 Valve → DHW Tank → HP -->
              <!-- Pipe: HP to G2 Valve (hot outlet) -->
              <path id="hp-to-g2-path"
                    d="M 170 180 L 220 180"
                    stroke="${dhwInletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: G2 Valve to DHW Tank (hot to coil) -->
              <path id="g2-to-dhw-path"
                    d="M 220 195 L 220 380 L 350 380"
                    stroke="${dhwInletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: DHW Tank to HP (cold return from coil) -->
              <path id="dhw-to-hp-path"
                    d="M 350 420 L 220 420 L 220 240 L 170 240"
                    stroke="${dhwOutletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Temperature labels for DHW mode -->
              <text x="195" y="170" text-anchor="middle" fill="${dhwInletColor}" font-size="11" font-weight="bold">
                Supply: ${this.formatValue(hpState.outletTemp, 1)}°
              </text>
              <text x="195" y="260" text-anchor="middle" fill="${dhwOutletColor}" font-size="11" font-weight="bold">
                Return: ${this.formatValue(hpState.inletTemp, 1)}°
              </text>

            ` : html`
              <!-- Heating Mode: HP → G2 Valve → Buffer Tank → HVAC → Buffer → HP -->
              <!-- Pipe: HP to G2 Valve (hot outlet) -->
              <path id="hp-to-g2-path"
                    d="M 170 180 L 220 180"
                    stroke="${hpOutletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: G2 Valve to Buffer (hot) -->
              <path id="g2-to-buffer-path"
                    d="M 235 180 L 350 180"
                    stroke="${hpOutletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: Buffer to HP (cold return) -->
              <path id="buffer-to-hp-path"
                    d="M 350 220 L 220 220 L 220 240 L 170 240"
                    stroke="${hpInletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: Buffer to HVAC (hot) -->
              <path id="buffer-to-hvac-path"
                    d="M 450 180 L 630 180"
                    stroke="${bufferSupplyColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Pipe: HVAC to Buffer (cold return) -->
              <path id="hvac-to-buffer-path"
                    d="M 630 220 L 450 220"
                    stroke="${hvacReturnColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="butt"/>

              <!-- Temperature labels for heating mode -->
              <!-- Heat Pump Supply (hot) - above pipe -->
              <text x="280" y="170" text-anchor="middle" fill="${hpOutletColor}" font-size="11" font-weight="bold">
                HP Supply: ${this.formatValue(hpState.outletTemp, 1)}°
              </text>

              <!-- Heat Pump Return (cold) - below pipe -->
              <text x="280" y="260" text-anchor="middle" fill="${hpInletColor}" font-size="11" font-weight="bold">
                HP Return: ${this.formatValue(hpState.inletTemp, 1)}°
              </text>

              <!-- HVAC Supply (hot from buffer) - above pipe -->
              <text x="540" y="170" text-anchor="middle" fill="${bufferSupplyColor}" font-size="11" font-weight="bold">
                HVAC Supply: ${this.formatValue(bufferState.supplyTemp, 1)}°
              </text>

              <!-- HVAC Return (cold to buffer) - below pipe -->
              <text x="540" y="240" text-anchor="middle" fill="${hvacReturnColor}" font-size="11" font-weight="bold">
                HVAC Return: ${this.formatValue(hvacState.returnTemp, 1)}°
              </text>
            `}

            <!-- Heat Pump (left side) -->
            <g id="heat-pump" transform="translate(50, 100)">
              <!-- Heat pump body with state-based color -->
              <rect width="120" height="150" rx="10" fill="${this.getHeatPumpColor(hpState)}" fill-opacity="0.2" stroke="${this.getHeatPumpColor(hpState)}" stroke-width="3"/>

              <!-- Fan housing -->
              <circle cx="60" cy="40" r="30" fill="#34495e" stroke="${this.getHeatPumpColor(hpState)}" stroke-width="2"/>

              <!-- Fan blades (will be animated) -->
              <g id="fan-blades" transform-origin="60 40">
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

            <!-- Heat Pump Mode Display (below heat pump) -->
            ${hpState.modeDisplay ? html`
              <g id="hp-mode-display" transform="translate(50, 250)">
                <rect x="0" y="0" width="120" height="30" rx="5" fill="#2c3e50" opacity="0.8"/>
                <text x="60" y="20" text-anchor="middle" fill="#f1c40f" font-size="12" font-weight="bold">
                  ${hpState.modeDisplay}
                </text>
              </g>
            ` : ''}

            <!-- Heat Pump Metrics (always visible - Lit conditional rendering doesn't work for SVG text) -->
            <g id="hp-metrics" transform="translate(50, 285)">
              <!-- Metrics display in compact 2-column layout -->
              <!-- Left column -->
              <text x="0" y="0" fill="#95a5a6" font-size="11" font-weight="bold">Power In:</text>
              <text x="0" y="16" fill="#3498db" font-size="12">${this.formatValue(hpState.power, 0)} W</text>

              <text x="0" y="36" fill="#95a5a6" font-size="11" font-weight="bold">Thermal Out:</text>
              <text x="0" y="52" fill="#e74c3c" font-size="12">${this.formatValue(hpState.thermal, 0)} W</text>

              <text x="0" y="72" fill="#95a5a6" font-size="11" font-weight="bold">COP:</text>
              <text x="0" y="88" fill="#f1c40f" font-size="12">${this.formatValue(hpState.cop, 2)}</text>

              <text x="0" y="108" fill="#95a5a6" font-size="11" font-weight="bold">Flow:</text>
              <text x="0" y="124" fill="#9b59b6" font-size="12">${this.formatValue(hpState.flowRate, 1)} L/min</text>

              <!-- Right column -->
              ${hpState.energy !== undefined ? html`
                <text x="80" y="0" fill="#95a5a6" font-size="11" font-weight="bold">Energy:</text>
                <text x="80" y="16" fill="#16a085" font-size="12">${this.formatValue(hpState.energy, 2)} kWh</text>
              ` : ''}

              ${hpState.cost !== undefined ? html`
                <text x="80" y="36" fill="#95a5a6" font-size="11" font-weight="bold">Cost:</text>
                <text x="80" y="52" fill="#27ae60" font-size="12">$${this.formatValue(hpState.cost, 2)}</text>
              ` : ''}
            </g>

            <!-- G2 Valve (diverter valve after HP) -->
            <g id="g2-valve" transform="translate(220, 180)">
              <!-- Valve body -->
              <circle cx="0" cy="0" r="15" fill="${g2ValveState.isActive ? this.config.heat_pump_visual?.dhw_color : this.config.heat_pump_visual?.heating_color}" stroke="#2c3e50" stroke-width="2"/>
              <!-- Valve indicator arrow -->
              ${g2ValveState.isActive ? html`
                <!-- Arrow pointing down (DHW mode) -->
                <path d="M 0 -8 L 0 8 M -5 3 L 0 8 L 5 3" stroke="white" stroke-width="2" fill="none"/>
              ` : html`
                <!-- Arrow pointing right (Heating mode) -->
                <path d="M -8 0 L 8 0 M 3 -5 L 8 0 L 3 5" stroke="white" stroke-width="2" fill="none"/>
              `}
              <!-- Valve label -->
              <text x="0" y="-25" text-anchor="middle" fill="#95a5a6" font-size="10" font-weight="bold">
                G2 ${g2ValveState.isActive ? 'DHW' : 'HEAT'}
              </text>
            </g>

            <!-- Improved Buffer Tank (center-top) -->
            <g id="buffer-tank" transform="translate(350, 80)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="120" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>
              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="20" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>
              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="140" rx="40" ry="20" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>
              <!-- Inner cylinder (water) -->
              <rect x="15" y="25" width="70" height="110" fill="#7f8c8d"/>
              <!-- Water level indicator with color -->
              <rect x="15" y="80" width="70" height="55" fill="${bufferSupplyColor}" opacity="0.8"/>
              <!-- Structural bands -->
              <line x1="10" y1="50" x2="90" y2="50" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="80" x2="90" y2="80" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="110" x2="90" y2="110" stroke="#2c3e50" stroke-width="2"/>
              <!-- Tank label -->
              <text x="50" y="15" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                BUFFER
              </text>
            </g>

            <!-- DHW Tank with Coil (center-bottom) -->
            <g id="dhw-tank" transform="translate(350, 330)">
              <!-- Tank cylinder body -->
              <rect x="10" y="20" width="80" height="120" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>
              <!-- Top rounded cap -->
              <ellipse cx="50" cy="20" rx="40" ry="20" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>
              <!-- Bottom rounded cap -->
              <ellipse cx="50" cy="140" rx="40" ry="20" fill="#2c3e50" stroke="#2c3e50" stroke-width="3"/>
              <!-- Inner cylinder (DHW water) -->
              <rect x="15" y="25" width="70" height="110" fill="#3498db" opacity="0.3"/>
              <!-- Heating coil inside tank (spiral) -->
              <path d="M 30 40 Q 50 45, 70 40 Q 50 48, 30 55 Q 50 60, 70 55 Q 50 63, 30 70 Q 50 75, 70 70 Q 50 78, 30 85 Q 50 90, 70 85 Q 50 93, 30 100 Q 50 105, 70 100 Q 50 108, 30 115 Q 50 120, 70 115"
                    stroke="${dhwInletColor}"
                    stroke-width="4"
                    fill="none"
                    opacity="0.8"/>
              <!-- Coil inlet/outlet connection points (small circles) -->
              <circle cx="30" cy="40" r="3" fill="${dhwInletColor}"/>
              <circle cx="70" cy="115" r="3" fill="${dhwOutletColor}"/>
              <!-- Structural bands -->
              <line x1="10" y1="50" x2="90" y2="50" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="80" x2="90" y2="80" stroke="#2c3e50" stroke-width="2"/>
              <line x1="10" y1="110" x2="90" y2="110" stroke="#2c3e50" stroke-width="2"/>
              <!-- Tank label -->
              <text x="50" y="15" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                DHW
              </text>
              <!-- Tank temperature if available -->
              ${dhwState.tankTemp ? html`
                <text x="50" y="170" text-anchor="middle" fill="#3498db" font-size="11" font-weight="bold">
                  Tank: ${this.formatValue(dhwState.tankTemp, 1)}°
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
