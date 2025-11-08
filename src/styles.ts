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

  /* CSS-based flow dot animations (hardware-accelerated) */
  .flow-dot {
    offset-path: var(--dot-path);
    offset-rotate: 0deg;
    animation: flow-along-path linear infinite;
    animation-duration: var(--dot-duration, 5s);
    animation-delay: var(--dot-delay, 0s);
    opacity: var(--dot-opacity, 1);
    filter: drop-shadow(0 0 4px currentColor);
  }

  @keyframes flow-along-path {
    from {
      offset-distance: 0%;
    }
    to {
      offset-distance: 100%;
    }
  }

  /* Fan rotation animation */
  .fan-rotating {
    transform-origin: 60px 51px;
    animation: fan-spin linear infinite;
    animation-duration: var(--fan-duration, 1s);
  }

  @keyframes fan-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* G2 Valve animations */
  .g2-valve-path {
    transition: stroke 0.5s ease, stroke-width 0.3s ease, opacity 0.5s ease;
  }

  .g2-valve-active-path {
    animation: valve-flow-pulse 2s ease-in-out infinite;
  }

  @keyframes valve-flow-pulse {
    0%, 100% {
      stroke-width: 6;
      opacity: 1;
    }
    50% {
      stroke-width: 7;
      opacity: 0.8;
    }
  }

  .g2-valve-label {
    transition: fill 0.3s ease;
  }

  /* Aux heater pulsing animations - CSS keyframes for reliable animation */
  @keyframes aux-glow-outer {
    0%, 100% {
      opacity: calc(var(--aux-intensity, 0) * 0.4);
    }
    50% {
      opacity: calc(var(--aux-intensity, 0) * 0.6);
    }
  }

  @keyframes aux-glow-middle {
    0%, 100% {
      opacity: calc(var(--aux-intensity, 0) * 0.6);
    }
    50% {
      opacity: calc(var(--aux-intensity, 0) * 0.8);
    }
  }

  @keyframes aux-glow-inner {
    0%, 100% {
      opacity: calc(var(--aux-intensity, 0) * 0.8);
    }
    50% {
      opacity: calc(var(--aux-intensity, 0) * 1.0);
    }
  }

  @keyframes aux-cylinder-pulse {
    0%, 100% {
      opacity: 0.9;
    }
    50% {
      opacity: 1.0;
    }
  }

  .aux-glow-outer {
    animation: aux-glow-outer 2s ease-in-out infinite;
  }

  .aux-glow-middle {
    animation: aux-glow-middle 1.5s ease-in-out infinite;
  }

  .aux-glow-inner {
    animation: aux-glow-inner 1s ease-in-out infinite;
  }

  .aux-cylinder-pulse {
    animation: aux-cylinder-pulse 2s ease-in-out infinite;
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
