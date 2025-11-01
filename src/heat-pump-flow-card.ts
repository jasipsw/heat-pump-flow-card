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
      ...config,
    };
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this.updateAnimations();
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
    };
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
    const animations = group.querySelectorAll('animateMotion');

    animations.forEach((anim, index) => {
      // Stagger the dots
      const delay = (index * this.config.animation!.dot_spacing!) / 100;
      anim.setAttribute('dur', `${duration}s`);
      anim.setAttribute('begin', `${delay}s`);

      // Pause if no flow
      if (flowRate <= 0) {
        (anim as any).endElement();
      } else {
        (anim as any).beginElement();
      }
    });
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
            <g id="heat-pump" transform="translate(50, 150)">
              <rect width="120" height="100" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="2"/>
              <text x="60" y="30" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                HEAT PUMP
              </text>
              <text x="60" y="55" text-anchor="middle" fill="#3498db" font-size="20" font-weight="bold">
                ${this.formatValue(hpState.thermal, 0)} W
              </text>
              <text x="60" y="75" text-anchor="middle" fill="#95a5a6" font-size="12">
                COP: ${this.formatValue(hpState.cop, 2)}
              </text>
              <text x="60" y="90" text-anchor="middle" fill="${hpOutletColor}" font-size="11">
                Out: ${this.formatValue(hpState.outletTemp, 1)}°
              </text>
            </g>

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
            <g id="hp-to-buffer">
              <path id="hp-to-buffer-path"
                    d="M 170 180 L 350 180"
                    stroke="${hpOutletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="round"/>
              ${this.renderFlowDots('hp-to-buffer-flow', 'hp-to-buffer-path', hpOutletColor)}
            </g>

            <!-- Pipe: Buffer to HP (cold return) -->
            <g id="buffer-to-hp">
              <path id="buffer-to-hp-path"
                    d="M 350 220 L 170 220"
                    stroke="${hpInletColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="round"/>
              ${this.renderFlowDots('buffer-to-hp-flow', 'buffer-to-hp-path', hpInletColor)}
            </g>

            <!-- Pipe: Buffer to HVAC (hot) -->
            <g id="buffer-to-hvac">
              <path id="buffer-to-hvac-path"
                    d="M 450 180 L 630 180"
                    stroke="${bufferSupplyColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="round"/>
              ${this.renderFlowDots('buffer-to-hvac-flow', 'buffer-to-hvac-path', bufferSupplyColor)}
            </g>

            <!-- Pipe: HVAC to Buffer (cold return) -->
            <g id="hvac-to-buffer">
              <path id="hvac-to-buffer-path"
                    d="M 630 220 L 450 220"
                    stroke="${hvacReturnColor}"
                    stroke-width="12"
                    fill="none"
                    stroke-linecap="round"/>
              ${this.renderFlowDots('hvac-to-buffer-flow', 'hvac-to-buffer-path', hvacReturnColor)}
            </g>
          </svg>
        </div>
      </ha-card>
    `;
  }

  private renderFlowDots(id: string, pathId: string, color: string) {
    const dotCount = 5;
    const dots = [];

    for (let i = 0; i < dotCount; i++) {
      dots.push(html`
        <circle r="${this.config.animation!.dot_size}" fill="${color}" opacity="0.9">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="${i * 0.6}s">
            <mpath href="#${pathId}"/>
          </animateMotion>
        </circle>
      `);
    }

    return html`<g id="${id}">${dots}</g>`;
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
