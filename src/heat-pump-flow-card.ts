import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { HeatPumpFlowCardConfig, HeatPumpState, BufferTankState, HVACState } from './types';
import { CARD_VERSION } from './const';
import { cardStyles } from './styles';

console.info(
  `%c  HEAT-PUMP-FLOW-CARD  \n%c  Version ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
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
    this.config = {
      animation: {
        min_flow_rate: 5,
        max_flow_rate: 1,
        dot_size: 8,
        dot_spacing: 30,
        ...config.animation,
      },
      temperature: {
        min_temp: 0,
        max_temp: 100,
        cold_color: '#0066FF',
        hot_color: '#FF3300',
        unit: 'C',
        ...config.temperature,
      },
      display: {
        show_values: true,
        show_labels: true,
        show_icons: true,
        compact: false,
        decimal_places: 1,
        ...config.display,
      },
      heat_pump_visual: {
        off_color: '#95a5a6',
        heating_color: '#e74c3c',
        cooling_color: '#3498db',
        dhw_color: '#e67e22',
        defrost_color: '#f1c40f',
        show_metrics: true,
        animate_fan: true,
        ...config.heat_pump_visual,
      },
      ...config,
    };
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this.updateAnimations();
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

  private startFanAnimation(): void {
    const animate = () => {
      const fanBlades = this.shadowRoot?.querySelector('#fan-blades');
      if (!fanBlades) {
        return;
      }

      const hpState = this.getHeatPumpState();
      const fanSpeed = hpState.fanSpeed || 0;

      // Only rotate if fan is running (speed > 0)
      if (fanSpeed > 0) {
        // Rotation speed based on fan speed (0-100%)
        // At 100% fan speed, complete rotation every ~1 second (360deg/s)
        // At 50% fan speed, every ~2 seconds (180deg/s)
        const rotationSpeed = (fanSpeed / 100) * 6; // degrees per frame at 60fps
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

    const paths = [
      { id: 'hp-to-buffer-path', color: this.getTempColor(hpState.outletTemp) },
      { id: 'buffer-to-hp-path', color: this.getTempColor(hpState.inletTemp) },
      { id: 'buffer-to-hvac-path', color: this.getTempColor(bufferState.supplyTemp) },
      { id: 'hvac-to-buffer-path', color: this.getTempColor(hvacState.returnTemp) }
    ];

    paths.forEach(pathInfo => {
      for (let i = 0; i < 5; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('data-path-id', pathInfo.id);
        circle.setAttribute('data-index', i.toString());
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', this.config.animation!.dot_size!.toString());
        circle.setAttribute('fill', pathInfo.color);
        circle.setAttribute('opacity', '0.9');
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
        return;
      }

      const time = Date.now() / 1000;

      circles.forEach((circle) => {
        const pathId = (circle as SVGCircleElement).dataset.pathId;
        const index = parseInt((circle as SVGCircleElement).dataset.index || '0');

        if (!pathId) return;

        const path = this.shadowRoot?.querySelector(`#${pathId}`) as SVGPathElement;
        if (!path) return;

        const pathLength = path.getTotalLength();
        const duration = 3;
        const delay = index * 0.6;
        const progress = ((time + delay) % duration) / duration;
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

  private getTempColor(temp: number): string {
    const cfg = this.config.temperature!;
    const normalized = (temp - cfg.min_temp!) / (cfg.max_temp! - cfg.min_temp!);
    const clamped = Math.max(0, Math.min(1, normalized));

    // Interpolate between cold and hot colors
    const cold = this.hexToRgb(cfg.cold_color!);
    const hot = this.hexToRgb(cfg.hot_color!);

    const r = Math.round(cold.r + (hot.r - cold.r) * clamped);
    const g = Math.round(cold.g + (hot.g - cold.g) * clamped);
    const b = Math.round(cold.b + (hot.b - cold.b) * clamped);

    return `rgb(${r}, ${g}, ${b})`;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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
    if (flowRate <= 0) return cfg.max_flow_rate!;

    // Normalize flow rate (assuming max ~50 L/min for heat pumps)
    const normalized = Math.min(flowRate / 50, 1);

    // Interpolate between min and max duration (faster flow = shorter duration)
    return cfg.max_flow_rate! - (normalized * (cfg.max_flow_rate! - cfg.min_flow_rate!));
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

    const hpOutletColor = this.getTempColor(hpState.outletTemp);
    const hpInletColor = this.getTempColor(hpState.inletTemp);
    const bufferSupplyColor = this.getTempColor(bufferState.supplyTemp);
    const bufferReturnColor = this.getTempColor(bufferState.returnTemp);
    const hvacSupplyColor = this.getTempColor(hvacState.supplyTemp);
    const hvacReturnColor = this.getTempColor(hvacState.returnTemp);

    return html`
      <ha-card>
        ${this.config.title ? html`<h1 class="card-header">${this.config.title}</h1>` : ''}

        <div class="card-content">
          <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
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

            <!-- Heat Pump Metrics -->
            ${this.config.heat_pump_visual?.show_metrics ? html`
              <g id="hp-metrics" transform="translate(50, 260)">
                <!-- Metrics display in compact 2-column layout -->
                <!-- Left column -->
                <text x="0" y="0" fill="#95a5a6" font-size="9" font-weight="bold">Power In:</text>
                <text x="0" y="12" fill="#3498db" font-size="10">${this.formatValue(hpState.power, 0)} W</text>

                <text x="0" y="28" fill="#95a5a6" font-size="9" font-weight="bold">Thermal Out:</text>
                <text x="0" y="40" fill="#e74c3c" font-size="10">${this.formatValue(hpState.thermal, 0)} W</text>

                <text x="0" y="56" fill="#95a5a6" font-size="9" font-weight="bold">COP:</text>
                <text x="0" y="68" fill="#f1c40f" font-size="10">${this.formatValue(hpState.cop, 2)}</text>

                <text x="0" y="84" fill="#95a5a6" font-size="9" font-weight="bold">Flow:</text>
                <text x="0" y="96" fill="#9b59b6" font-size="10">${this.formatValue(hpState.flowRate, 1)} L/min</text>

                <!-- Right column -->
                <text x="70" y="0" fill="#95a5a6" font-size="9" font-weight="bold">In Temp:</text>
                <text x="70" y="12" fill="${hpInletColor}" font-size="10">${this.formatValue(hpState.inletTemp, 1)}°</text>

                <text x="70" y="28" fill="#95a5a6" font-size="9" font-weight="bold">Out Temp:</text>
                <text x="70" y="40" fill="${hpOutletColor}" font-size="10">${this.formatValue(hpState.outletTemp, 1)}°</text>

                ${hpState.energy !== undefined ? html`
                  <text x="70" y="56" fill="#95a5a6" font-size="9" font-weight="bold">Energy:</text>
                  <text x="70" y="68" fill="#16a085" font-size="10">${this.formatValue(hpState.energy, 2)} kWh</text>
                ` : ''}

                ${hpState.cost !== undefined ? html`
                  <text x="70" y="84" fill="#95a5a6" font-size="9" font-weight="bold">Cost:</text>
                  <text x="70" y="96" fill="#27ae60" font-size="10">$${this.formatValue(hpState.cost, 2)}</text>
                ` : ''}
              </g>
            ` : ''}

            <!-- Buffer Tank (center) -->
            <g id="buffer-tank" transform="translate(350, 100)">
              <ellipse cx="50" cy="100" rx="60" ry="100" fill="#34495e" stroke="#2c3e50" stroke-width="3"/>
              <ellipse cx="50" cy="100" rx="55" ry="95" fill="#95a5a6"/>
              <!-- Water level indicator -->
              <rect x="5" y="110" width="90" height="80" fill="${bufferSupplyColor}" opacity="0.7"/>
              <text x="50" y="50" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                BUFFER
              </text>
              <text x="50" y="70" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                TANK
              </text>
              <text x="50" y="110" text-anchor="middle" fill="white" font-size="11">
                Supply: ${this.formatValue(bufferState.supplyTemp, 1)}°
              </text>
              <text x="50" y="125" text-anchor="middle" fill="white" font-size="11">
                Return: ${this.formatValue(bufferState.returnTemp, 1)}°
              </text>
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
              <text x="60" y="90" text-anchor="middle" fill="${hvacSupplyColor}" font-size="11">
                Supply: ${this.formatValue(hvacState.supplyTemp, 1)}°
              </text>
            </g>

            <!-- Pipe: HP to Buffer (hot) -->
            <path id="hp-to-buffer-path"
                  d="M 170 180 L 350 180"
                  stroke="${hpOutletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="round"/>

            <!-- Pipe: Buffer to HP (cold return) -->
            <path id="buffer-to-hp-path"
                  d="M 350 220 L 170 220"
                  stroke="${hpInletColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="round"/>

            <!-- Pipe: Buffer to HVAC (hot) -->
            <path id="buffer-to-hvac-path"
                  d="M 450 180 L 630 180"
                  stroke="${bufferSupplyColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="round"/>

            <!-- Pipe: HVAC to Buffer (cold return) -->
            <path id="hvac-to-buffer-path"
                  d="M 630 220 L 450 220"
                  stroke="${hvacReturnColor}"
                  stroke-width="12"
                  fill="none"
                  stroke-linecap="round"/>

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
