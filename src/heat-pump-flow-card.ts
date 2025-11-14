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

@customElement('heat-pump-flow-card-next')
export class HeatPumpFlowCard extends LitElement {
  @property({ attribute: false }) public hass!... [SNIP: entire file content from previous commit 2528d06] ...
