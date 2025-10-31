# Contributing to Heat Pump Flow Card

Thank you for your interest in contributing! This project welcomes contributions from the community.

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Home Assistant instance for testing

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/heat-pump-flow-card.git
   cd heat-pump-flow-card
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the card**
   ```bash
   npm run build
   ```

4. **Watch for changes during development**
   ```bash
   npm run watch
   ```

### Project Structure

```
heat-pump-flow-card/
├── src/
│   ├── heat-pump-flow-card.ts    # Main card component
│   ├── types.ts                   # TypeScript type definitions
│   ├── styles.ts                  # CSS styles
│   └── const.ts                   # Constants
├── dist/                          # Compiled output (generated)
├── hacs.json                      # HACS integration metadata
├── package.json                   # Node.js dependencies
├── tsconfig.json                  # TypeScript configuration
├── rollup.config.js               # Rollup bundler configuration
└── README.md                      # Documentation
```

## Development Workflow

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Test your changes:
   - Copy `dist/heat-pump-flow-card.js` to your Home Assistant `www` folder
   - Refresh Home Assistant dashboard
   - Test all functionality

4. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. Push and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Testing

Before submitting a pull request:

1. **Build successfully**: `npm run build` completes without errors
2. **Lint clean**: `npm run lint` passes
3. **Functional testing**: Test the card in Home Assistant with various configurations
4. **Browser compatibility**: Test in Chrome, Firefox, and Safari if possible

### Code Style

- Use TypeScript for all code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Adding New Features

When adding new features:

1. Update `types.ts` with new configuration options
2. Add configuration validation in `setConfig()`
3. Update `README.md` with documentation
4. Add examples of the new feature
5. Test with real sensors

## Reporting Issues

When reporting bugs, please include:

- Home Assistant version
- Card version
- Browser and version
- Configuration YAML
- Browser console errors (F12)
- Steps to reproduce

## Feature Requests

Feature requests are welcome! Please:

- Check if the feature already exists
- Describe the use case clearly
- Explain how it would benefit users
- Provide examples if possible

## Pull Request Guidelines

Good pull requests include:

- **Clear description** - Explain what and why
- **Small, focused changes** - One feature/fix per PR
- **Updated documentation** - Update README.md if needed
- **Working build** - Must compile without errors
- **Tested** - Confirm it works in Home Assistant

## Community

- Be respectful and constructive
- Help others when you can
- Share your configurations and use cases
- Report bugs you find

## Questions?

- Open an issue for bugs or feature requests
- Use discussions for questions and ideas
- Tag maintainers for urgent issues

Thank you for contributing! 🎉
