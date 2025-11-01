import { css } from 'lit';

export const cardStyles = css`
  ha-card {
    padding: 16px;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
  }

  .card-header {
    font-size: 24px;
    font-weight: 500;
    margin: 0 0 16px 0;
    color: var(--primary-text-color);
  }

  .card-content {
    width: 100%;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  text {
    font-family: var(--paper-font-body1_-_font-family);
  }

  /* Animation for dots */
  circle {
    filter: drop-shadow(0 0 4px currentColor);
  }

  /* CSS animations for flow dots */
  @keyframes flow {
    from {
      offset-distance: 0%;
    }
    to {
      offset-distance: 100%;
    }
  }

  .flow-dot {
    offset-path: var(--flow-path);
    animation: flow var(--flow-duration, 3s) linear infinite;
    animation-delay: var(--flow-delay, 0s);
  }

  /* Pipe styling */
  path {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }

  /* Component boxes */
  rect {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }

  ellipse {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
  }
`;
