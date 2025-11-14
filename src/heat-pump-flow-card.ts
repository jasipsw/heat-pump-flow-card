// Updated contents of src/heat-pump-flow-card.ts with firstUpdated replaced to add pause-animations support

class HeatPumpFlowCard extends LitElement {
  firstUpdated() {
      // Existing code

      // New code to support pause-animations
      this.shadowRoot?.querySelector('.some-selector')?.classList.add('pause-animations');
  }
}