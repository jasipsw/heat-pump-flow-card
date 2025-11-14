import { LitElement } from 'lit';
import './heat-pump-flow-card'; // Ensure base card side-effects (styles, helpers) load

// We assume the original card exports HeatPumpFlowCard. If not, adjust this import accordingly.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseClass: any = customElements.get('heat-pump-flow-card');

// Fallback in case original element not yet defined when this module executes.
class PlaceholderBase extends LitElement {}

const ResolvedBase = BaseClass || PlaceholderBase;

export class HeatPumpFlowCardNext extends (ResolvedBase as typeof LitElement) {
  private _nextVariant = true;

  connectedCallback(): void {
    super.connectedCallback();
    this._logNextBanner();
  }

  private _logNextBanner(): void {
    // Try to reuse global version metadata if original script set it.
    const v = (window as any).HEAT_PUMP_FLOW_CARD_VERSION || 'unknown';
    const ts = (window as any).HEAT_PUMP_FLOW_CARD_BUILD_TIMESTAMP || 'unknown';
    // Distinct banner
    console.log(
      '%cHEAT-PUMP-FLOW-CARD-NEXT\nPerformance test variant loaded\nVersion: ' +
        v +
        '\nBuilt: ' +
        ts,
      'background:#222;color:#ffcc66;padding:8px 12px;border-radius:4px;font-weight:600;' 
    );
  }
}

if (!customElements.get('heat-pump-flow-card-next')) {
  customElements.define('heat-pump-flow-card-next', HeatPumpFlowCardNext);
}

// Register with Home Assistant customCards so it appears in the UI.
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'heat-pump-flow-card-next',
  name: 'Heat Pump Flow Card Next',
  description: 'Animated heat pump flow visualization card (NEXT performance test variant)',
  preview: true,
  documentationURL: 'https://github.com/jasipsw/heat-pump-flow-card',
});

// Debug helper to locate NEXT card instance
(window as any).findHeatPumpCardNext = function (root: Document | ShadowRoot = document): HeatPumpFlowCardNext | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if ((node as Element).tagName === 'HEAT-PUMP-FLOW-CARD-NEXT') {
      return node as HeatPumpFlowCardNext;
    }
    if ((node as Element).shadowRoot) {
      const found = (window as any).findHeatPumpCardNext((node as Element).shadowRoot);
      if (found) return found;
    }
  }
  return null;
};

// TypeScript global declaration
declare global {
  interface HTMLElementTagNameMap {
    'heat-pump-flow-card-next': HeatPumpFlowCardNext;
  }
}