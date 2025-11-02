# Cache Busting Guide for Heat Pump Flow Card

When you update this HACS custom card, you may experience caching issues where Home Assistant and your browser continue to load old versions. This guide explains the multiple caching layers and how to clear them.

## Understanding the Caching Layers

There are **4 different caches** that can prevent updates from loading:

1. **HACS Download Cache** - HACS may not download the latest version
2. **Home Assistant Service Worker** - HA's service worker caches resources
3. **Browser Cache** - Your browser caches JavaScript files
4. **Browser Memory** - Loaded modules stay in memory until page reload

## Recommended Update Procedure

Follow these steps **in order** after a new version is released:

### Step 1: Update in HACS
```
1. Open HACS in Home Assistant
2. Find "Heat Pump Flow Card"
3. Click "Redownload" (not just "Update")
4. Wait for confirmation
```

### Step 2: Restart Home Assistant
```
Settings → System → Restart Home Assistant
```
⚠️ **Important**: A full restart is required to clear the service worker cache.

### Step 3: Clear Browser Cache
```
1. Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. Select "All time" for time range
3. Check at minimum:
   - Cached images and files
   - Cookies and site data (if comfortable)
4. Click "Clear data"
```

### Step 4: Hard Reload the Page
```
1. Go to your Home Assistant dashboard
2. Press Ctrl+F5 (Cmd+Shift+R on Mac)
3. Or: Hold Shift and click the Reload button
```

### Step 5: Verify the Version
```
1. Press F12 to open browser DevTools
2. Click "Console" tab
3. Look for the orange banner showing:
   HEAT-PUMP-FLOW-CARD
   Version X.X.X
   Built: [timestamp]
```

The **Built** timestamp is the most reliable indicator - it shows exactly when the code was compiled.

## Advanced: URL-Based Cache Busting

For the most reliable cache busting, you can add a version parameter to your resource URL:

### Method 1: Manual Dashboard Resources (YAML)
Edit your `configuration.yaml` or `ui-lovelace.yaml`:

```yaml
lovelace:
  resources:
    - url: /hacsfiles/heat-pump-flow-card/heat-pump-flow-card.js?v=0.9.0
      type: module
```

**When updating**:
1. Change `?v=0.9.0` to `?v=0.9.1` (match the new version)
2. Restart Home Assistant
3. Hard reload browser (Ctrl+F5)

### Method 2: UI-Based Resources
If you added the resource via the UI:

```
1. Settings → Dashboards → Resources
2. Find "heat-pump-flow-card.js"
3. Click Edit
4. Change URL to: /hacsfiles/heat-pump-flow-card/heat-pump-flow-card.js?v=0.9.0
5. Click Update
6. Hard reload browser (Ctrl+F5)
```

**When updating**: Edit the resource and increment the version number in the URL.

## Troubleshooting

### "I still see the old version after following all steps"

1. **Check the Build Timestamp** in console - this is the definitive indicator
2. **Try Incognito/Private Mode** - this bypasses all browser cache
3. **Try a Different Browser** - rules out browser-specific issues
4. **Check HACS logs** - verify the download actually completed
5. **Manually verify file** - SSH to HA and check:
   ```bash
   cat /config/www/community/heat-pump-flow-card/heat-pump-flow-card.js | grep "CARD_VERSION"
   ```

### "The version number updated but I don't see new features"

This can happen if:
- The file downloaded correctly but browser is still using cached version
- Try the URL versioning method above
- Or: Open DevTools (F12) → Application → Clear storage → Clear site data

### "Console shows errors after update"

1. Check that you've cleared cache completely
2. Try removing and re-adding the resource
3. Check the [GitHub Issues](https://github.com/jasipsw/heat-pump-flow-card/issues) for known problems

## Why Is This So Complicated?

Home Assistant's architecture involves multiple caching layers for performance:
- **Service Workers** cache resources for offline capability
- **Browser caching** speeds up page loads
- **Module caching** prevents re-parsing JavaScript
- **HACS caching** reduces GitHub API calls

While these improve performance, they make updates more complex. The techniques above ensure you get fresh code every time.

## Quick Reference Card

Keep this handy for future updates:

```
□ HACS → Redownload
□ Restart Home Assistant
□ Browser → Ctrl+Shift+Delete → All time → Clear
□ Dashboard → Ctrl+F5
□ F12 → Console → Verify build timestamp
```

---

**Tip**: Consider using the URL versioning method (`?v=X.X.X`) if you frequently update custom cards. It's the most reliable approach.
