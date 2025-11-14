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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-logo-link {
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .card-logo-link:hover {
    transform: scale(1.05);
  }

  .card-logo {
    height: var(--logo-size, 40px);
    width: auto;
    opacity: 0.9;
    transition: opacity 0.3s ease;
    border-radius: 8px;
    display: block;
  }

  .card-logo:hover {
    opacity: 1;
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
    will-change: transform;
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
    transform-origin: center;
    will-change: transform, opacity;
  }

  @keyframes valve-flow-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.08);
      opacity: 0.8;
    }
  }

  .g2-valve-label {
    transition: fill 0.3s ease;
  }

  /* Aux heater pulsing animations - GPU-accelerated transform + opacity only */
  /* No filter animations - use static drop-shadow on elements instead */
  @keyframes aux-glow-outer {
    0%, 100% {
      opacity: 0.2;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.15);
    }
  }

  @keyframes aux-glow-middle {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1);
    }
  }

  @keyframes aux-glow-inner {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 1.0;
      transform: scale(1.05);
    }
  }

  @keyframes aux-cylinder-pulse {
    0%, 100% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1.0;
      transform: scale(1.02);
    }
  }

  /* Base state for aux heater elements - hidden by default */
  .aux-heater-layer {
    opacity: 0 !important;
    transform-origin: center;
  }

  /* DHW coil pulsing animations - GPU-accelerated transform + opacity only */
  /* No filter animations - use static drop-shadow on elements instead */
  @keyframes dhw-coil-glow-outer {
    0%, 100% {
      opacity: 0.15;
      transform: scale(1);
    }
    50% {
      opacity: 0.4;
      transform: scale(1.08);
    }
  }

  @keyframes dhw-coil-glow-inner {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }

  /* Base state for DHW coil glow - hidden by default */
  .dhw-coil-glow-layer {
    opacity: 0 !important;
    transform-origin: center;
  }

  /* DHW coil active state - show and animate when G2 valve sends water to DHW */
  .dhw-coil-glow-outer {
    opacity: 0.25;
    animation: dhw-coil-glow-outer 1.5s ease-in-out infinite;
    transform-origin: center;
    will-change: transform, opacity;
  }

  .dhw-coil-glow-inner {
    opacity: 0.45;
    animation: dhw-coil-glow-inner 1.2s ease-in-out infinite;
    transform-origin: center;
    will-change: transform, opacity;
  }

  /* When active, show and animate - SPEED INCREASES WITH POWER LEVEL */
  .aux-glow-outer {
    opacity: 0.45;
    animation: aux-glow-outer var(--aux-anim-speed, 1s) ease-in-out infinite;
    transform-origin: center;
    will-change: transform, opacity;
  }

  .aux-glow-middle {
    opacity: 0.65;
    animation: aux-glow-middle calc(var(--aux-anim-speed, 1s) * 0.8) ease-in-out infinite;
    transform-origin: center;
    will-change: transform, opacity;
  }

  .aux-glow-inner {
    opacity: 0.8;
    animation: aux-glow-inner calc(var(--aux-anim-speed, 1s) * 0.6) ease-in-out infinite;
    transform-origin: center;
    will-change: transform, opacity;
  }

  .aux-cylinder-pulse {
    opacity: 0.85;
    animation: aux-cylinder-pulse var(--aux-anim-speed, 1s) ease-in-out infinite;
    transform-origin: center;
    will-change: transform, opacity;
  }

  /* Pipe styling - exclude flow-gradient animations from drop-shadow */
  path:not(.flow-gradient) {
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
