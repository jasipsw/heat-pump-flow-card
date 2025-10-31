# Build Instructions

This document explains how to build and deploy the Heat Pump Flow Card.

## Quick Start

```bash
# Install dependencies
npm install

# Build the card
npm run build

# The compiled file will be in: dist/heat-pump-flow-card.js
```

## Development Mode

For active development with automatic rebuilding:

```bash
npm run watch
```

This will watch for file changes and rebuild automatically.

## Deployment to Home Assistant

### During Development

1. Build the card: `npm run build`
2. Copy to Home Assistant:
   ```bash
   cp dist/heat-pump-flow-card.js /path/to/homeassistant/www/
   ```
3. Clear browser cache (Ctrl+F5)
4. Refresh Home Assistant dashboard

### For Testing on Your System

If you have Home Assistant running on the same machine:

```bash
# Build and copy in one command
npm run build && cp dist/heat-pump-flow-card.js /root/config/www/
```

Then in Home Assistant Lovelace:

```yaml
resources:
  - url: /local/heat-pump-flow-card.js?v=0.1.0
    type: module
```

**Tip:** Change the `?v=0.1.0` version number after each build to force browser cache refresh.

## Creating a Release

### 1. Update Version

Update version in:
- `package.json`
- `src/const.ts` (CARD_VERSION)

### 2. Build Production Version

```bash
npm run build
```

### 3. Test Thoroughly

- Install in Home Assistant
- Test all configuration options
- Test with different sensor values
- Test in multiple browsers
- Verify animations work correctly

### 4. Create Git Tag

```bash
git tag -a v0.1.0 -m "Release version 0.1.0"
git push origin v0.1.0
```

### 5. Create GitHub Release

1. Go to GitHub repository → Releases
2. Click "Create a new release"
3. Select the tag you just created
4. Add release notes describing changes
5. Upload `dist/heat-pump-flow-card.js` as an asset
6. Publish release

### 6. Publish to HACS

Once your repository is public with releases, users can add it to HACS:

1. Open HACS
2. Go to Frontend
3. Click the "..." menu → Custom repositories
4. Add your repository URL
5. Select "Lovelace" as the category

For inclusion in the default HACS store, submit a PR to:
https://github.com/hacs/default

## Build Troubleshooting

### "Cannot find module" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails with TypeScript errors

Check `tsconfig.json` and ensure all source files are valid TypeScript.

### Card doesn't update in Home Assistant

1. Clear browser cache (Ctrl+F5)
2. Change the `?v=` version parameter in resources
3. Restart Home Assistant
4. Check browser console (F12) for errors

### Animations don't work

- Check SVG syntax in the build output
- Verify `animateMotion` elements are present
- Test in a simple HTML file first

## Development Tools

### Useful Commands

```bash
# Lint TypeScript
npm run lint

# Format code
npm run format

# Watch mode (auto-rebuild)
npm run watch

# Clean build
rm -rf dist && npm run build
```

### Testing Locally

Create a simple HTML file to test the card:

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="dist/heat-pump-flow-card.js"></script>
</head>
<body>
  <heat-pump-flow-card></heat-pump-flow-card>
</body>
</html>
```

## CI/CD (Future)

Consider setting up GitHub Actions for:
- Automatic building on commits
- Running tests
- Creating releases
- Publishing to npm

Example `.github/workflows/build.yml`:

```yaml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run build
```

## Questions?

Open an issue on GitHub if you have build problems or questions.
