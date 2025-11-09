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

  /* Animated gradient flow effect on pipes */
  /* Note: Animation is handled by SVG animateTransform on the gradient definitions */
  /* Note: Opacity controlled per-element via opacity attribute (0 = hidden, 1 = visible) */
  .flow-gradient {
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

  /* Aux heater pulsing animations - DRAMATIC pulsing with glow effects */
  /* Shadow blur sizes are scaled by --aux-shadow-blur CSS variable (default: 1.0) */
  @keyframes aux-glow-outer {
    0%, 100% {
      opacity: 0.2;
      filter: drop-shadow(0 0 calc(8px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 0.5));
    }
    50% {
      opacity: 0.7;
      filter: drop-shadow(0 0 calc(16px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 0.9));
    }
  }

  @keyframes aux-glow-middle {
    0%, 100% {
      opacity: 0.4;
      filter: drop-shadow(0 0 calc(6px * var(--aux-shadow-blur, 1)) rgba(255, 102, 68, 0.6));
    }
    50% {
      opacity: 0.9;
      filter: drop-shadow(0 0 calc(12px * var(--aux-shadow-blur, 1)) rgba(255, 102, 68, 1.0));
    }
  }

  @keyframes aux-glow-inner {
    0%, 100% {
      opacity: 0.6;
      filter: drop-shadow(0 0 calc(4px * var(--aux-shadow-blur, 1)) rgba(255, 136, 85, 0.7));
    }
    50% {
      opacity: 1.0;
      filter: drop-shadow(0 0 calc(10px * var(--aux-shadow-blur, 1)) rgba(255, 136, 85, 1.0));
    }
  }

  @keyframes aux-cylinder-pulse {
    0%, 100% {
      opacity: 0.7;
      filter: drop-shadow(0 0 calc(6px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 0.6));
    }
    50% {
      opacity: 1.0;
      filter: drop-shadow(0 0 calc(12px * var(--aux-shadow-blur, 1)) rgba(255, 68, 34, 1.0));
    }
  }

  /* Base state for aux heater elements - hidden by default */
  .aux-heater-layer {
    opacity: 0 !important;
    filter: none !important; /* Remove default rect drop-shadow */
  }

  /* DHW coil pulsing animations - similar to aux heater but for coil heating */
  @keyframes dhw-coil-glow-outer {
    0%, 100% {
      opacity: 0.15;
      filter: drop-shadow(0 0 6px rgba(255, 102, 68, 0.4));
    }
    50% {
      opacity: 0.4;
      filter: drop-shadow(0 0 12px rgba(255, 102, 68, 0.7));
    }
  }

  @keyframes dhw-coil-glow-inner {
    0%, 100% {
      opacity: 0.3;
      filter: drop-shadow(0 0 4px rgba(255, 136, 85, 0.5));
    }
    50% {
      opacity: 0.6;
      filter: drop-shadow(0 0 8px rgba(255, 136, 85, 0.9));
    }
  }

  /* Base state for DHW coil glow - hidden by default */
  .dhw-coil-glow-layer {
    opacity: 0 !important;
    filter: none !important;
  }

  /* DHW coil active state - show and animate when G2 valve sends water to DHW */
  .dhw-coil-glow-outer {
    opacity: 0.25;
    animation: dhw-coil-glow-outer 1.5s ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .dhw-coil-glow-inner {
    opacity: 0.45;
    animation: dhw-coil-glow-inner 1.2s ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  /* When active, show and animate - SPEED INCREASES WITH POWER LEVEL */
  .aux-glow-outer {
    opacity: 0.45;
    animation: aux-glow-outer var(--aux-anim-speed, 1s) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .aux-glow-middle {
    opacity: 0.65;
    animation: aux-glow-middle calc(var(--aux-anim-speed, 1s) * 0.8) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .aux-glow-inner {
    opacity: 0.8;
    animation: aux-glow-inner calc(var(--aux-anim-speed, 1s) * 0.6) ease-in-out infinite;
    filter: none; /* Will be set by animation */
  }

  .aux-cylinder-pulse {
    opacity: 0.85;
    animation: aux-cylinder-pulse var(--aux-anim-speed, 1s) ease-in-out infinite;
    filter: none; /* Will be set by animation */
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
