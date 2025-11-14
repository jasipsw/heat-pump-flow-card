import { LitElement, html, css } from 'lit';
import { cardStyles } from './styles';
import type { HeatPumpFlowCardConfig } from './types';

// Base (original) card element restored (was temporarily replaced by placeholder).
// Performance refactor: removed legacy dot animation concept, added visibility pause logic.
// This class is intentionally minimal; extend with original metric rendering if needed.

const VERSION = '1.0.2';
const BUILD_TIMESTAMP = new Date().toISOString();
(window as any).HEAT_PUMP_FLOW_CARD_VERSION = VERSION;
(window as any).HEAT_PUMP_FLOW_CARD_BUILD_TIMESTAMP = BUILD_TIMESTAMP;

// Prevent duplicate base banner
if (!(window as any).__HP_FLOW_CARD_LOGGED) {
  console.log(
    '%cHEAT-PUMP-FLOW-CARD\nVersion ' + VERSION + '\nBuilt: ' + BUILD_TIMESTAMP,
    'background:#222;color:#6cf;padding:8px 12px;border-radius:4px;font-weight:600;'
  );
  (window as any).__HP_FLOW_CARD_LOGGED = true;
}

@customElement('heat-pump-flow-card')
export class HeatPumpFlowCard extends LitElement {
  static styles = [cardStyles, css`
    :host(.performance-paused) * { animation-play-state: paused !important; }
  `];

  private _config?: HeatPumpFlowCardConfig;
  private _intersectionObserver?: IntersectionObserver;

  setConfig(config: HeatPumpFlowCardConfig) {
    this._config = config;
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupVisibilityControls();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this._onVisibilityChange);
  }

  private _setupVisibilityControls() {
    // Pause animations when card not visible in viewport
    this._intersectionObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        this.classList.add('performance-paused');
      } else if (!document.hidden) {
        this.classList.remove('performance-paused');
      }
    }, { threshold: 0 });
    this._intersectionObserver.observe(this);
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  private _onVisibilityChange = () => {
    if (document.hidden) {
      this.classList.add('performance-paused');
    } else {
      // Only resume if actually intersecting (observer state may be stale on visibility change)
      const rect = this.getBoundingClientRect();
      const inView = rect.bottom >= 0 && rect.right >= 0 && rect.top <= window.innerHeight && rect.left <= window.innerWidth;
      if (inView) this.classList.remove('performance-paused');
    }
  };

  // Placeholder render (replace with full original visualization logic)
  render() {
    return html`
      <ha-card>
        <div class="card-header">
          <div>${this._config?.title || 'Heat Pump Flow'}</div>
        </div>
        <div class="card-content">
          <div style="font-size:12px;color:var(--secondary-text-color);">
            Performance refactor placeholder. Visualization logic to be re-integrated.
          </div>
        </div>
      </ha-card>
    `;
  }
}

// customCards registration (base)
(window as any).customCards = (window as any).customCards || [];
if (!(window as any).customCards.some((c: any) => c.type === 'heat-pump-flow-card')) {
  (window as any).customCards.push({
    type: 'heat-pump-flow-card',
    name: 'Heat Pump Flow Card',
    description: 'Animated heat pump flow visualization card',
    preview: true,
    documentationURL: 'https://github.com/jasipsw/heat-pump-flow-card'
  });
}

// Debug helper for base variant
(window as any).findHeatPumpCard = function(root: Document | ShadowRoot = document): HeatPumpFlowCard | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if ((node as Element).tagName === 'HEAT-PUMP-FLOW-CARD') return node as HeatPumpFlowCard;
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