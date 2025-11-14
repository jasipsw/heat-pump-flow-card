// Change the decorator:
@customElement('heat-pump-flow-card-next')
export class HeatPumpFlowCard extends LitElement {
  ...
}

// At the card registration near the bottom, change to:
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'heat-pump-flow-card-next',
  name: 'Heat Pump Flow Card Next',
  description: 'Animated heat pump flow visualization card (performance test version)',
  preview: true,
  documentationURL: 'https://github.com/jasipsw/heat-pump-flow-card',
});

// And update the debug helper function to:
(window as any).findHeatPumpCardNext = function(root: Document | ShadowRoot = document): HeatPumpFlowCard | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let node: Node | null;
  while (node = walker.nextNode()) {
    if ((node as Element).tagName === 'HEAT-PUMP-FLOW-CARD-NEXT') {
      return node as HeatPumpFlowCard;
    }
    if ((node as Element).shadowRoot) {
      const found = (window as any).findHeatPumpCardNext((node as Element).shadowRoot);
      if (found) return found;
    }
  }
  return null;
};

// And update the global declaration:
declare global {
  interface HTMLElementTagNameMap {
    'heat-pump-flow-card-next': HeatPumpFlowCard;
  }
}
