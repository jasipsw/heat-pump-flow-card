# Development Workflow - Testing Without Merging to Main

This guide shows how to test your changes directly from the feature branch without going through HACS and main branch merges.

## Why Use This Workflow?

- ⚡ **Faster iteration** - No merge/PR process needed
- 🔄 **Quick updates** - Just copy file and refresh browser
- 🐛 **Easy debugging** - Test changes in seconds, not minutes
- 🎯 **No HACS cache** - Bypass HACS download caching entirely

## One-Time Setup

### Step 1: Build Your Changes
On your development machine (or SSH to HA):
```bash
cd /home/user/heat-pump-flow-card
git checkout claude/work-on-hacs-card-011CUhFB58Z96A4ALXkD3QoB
npm run build
```

### Step 2: Copy to Home Assistant www Directory
```bash
# If building on HA directly:
cp dist/heat-pump-flow-card.js /config/www/heat-pump-flow-card-dev.js

# If building remotely, use scp:
scp dist/heat-pump-flow-card.js user@homeassistant.local:/config/www/heat-pump-flow-card-dev.js
```

### Step 3: Add Development Resource in HA
1. Go to **Settings → Dashboards → Resources**
2. Click **Add Resource**
3. Enter URL:
   ```
   /local/heat-pump-flow-card-dev.js?v=dev
   ```
4. Select **JavaScript Module**
5. Click **Create**

### Step 4: Update Your Dashboard Card
1. Edit your dashboard card configuration
2. Change the type to use your dev version:
   ```yaml
   type: custom:heat-pump-flow-card
   # ... rest of your config
   ```

The card will now load from `/local/heat-pump-flow-card-dev.js` instead of the HACS version.

## Daily Development Cycle

When you make changes and want to test:

```bash
# 1. Make your code changes in src/

# 2. Build
npm run build

# 3. Copy to www directory
cp dist/heat-pump-flow-card.js /config/www/heat-pump-flow-card-dev.js

# 4. In browser: Hard reload (Ctrl+F5)
# That's it! No HA restart needed.
```

### Pro Tip: One-Liner
```bash
npm run build && cp dist/heat-pump-flow-card.js /config/www/heat-pump-flow-card-dev.js && echo "Ready! Hit Ctrl+F5 in browser"
```

## Verifying You're Using the Dev Version

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for the build timestamp:
   ```
   HEAT-PUMP-FLOW-CARD
   Version 0.9.0
   Built: 2025-11-02T15:30:45.123Z
   ```
4. The timestamp should match your latest build time

## Switching Between Dev and Production

### Using Dev Version (for testing)
Resource URL: `/local/heat-pump-flow-card-dev.js?v=dev`

### Using HACS Version (production)
Resource URL: `/hacsfiles/heat-pump-flow-card/heat-pump-flow-card.js?v=0.9.0`

You can have **both resources** configured and just change which one your card uses by commenting/uncommenting them.

## When You're Done Testing

Once your changes are working:

1. **Commit and push** to feature branch (already done via Claude)
2. **Merge PR** to main branch
3. **Update HACS** - redownload in HACS interface
4. **Switch back** to production resource URL
5. **Remove dev resource** (optional, or keep for future dev work)

## Troubleshooting

### "I refreshed but still see old code"

The browser might still be caching. Try:
1. **Hard reload**: Ctrl+F5 (or Cmd+Shift+R on Mac)
2. **Disable cache**: F12 → Network tab → Check "Disable cache"
3. **Incognito mode**: Test in private browsing window
4. **Change version param**: `/local/heat-pump-flow-card-dev.js?v=dev2`

### "Card not loading at all"

1. Check browser console (F12) for errors
2. Verify file exists: Go to `/local/heat-pump-flow-card-dev.js` in browser
3. Check file permissions on HA server
4. Try restarting Home Assistant

### "Changes not appearing"

1. Confirm you're using the dev resource URL (check Settings → Dashboards → Resources)
2. Verify the file was actually copied: `ls -lh /config/www/heat-pump-flow-card-dev.js`
3. Check the build timestamp in console matches your build time
4. Try clearing all browser cache and doing full refresh

## Advanced: Watch Mode

For super-fast development, you can set up a watch script:

```bash
# In package.json, add:
"scripts": {
  "dev": "rollup -c -w"
}

# Then in one terminal:
npm run dev

# In another terminal (or use a file watcher):
while inotifywait -e modify dist/heat-pump-flow-card.js; do
  cp dist/heat-pump-flow-card.js /config/www/heat-pump-flow-card-dev.js
  echo "Copied! Refresh browser."
done
```

Now every time you save a file, it auto-builds and auto-copies!

## Summary

**Production (slow, stable)**:
- Change code → Commit → Push → Merge → HACS update → HA restart → Browser cache clear → Hard reload

**Development (fast, iterative)**:
- Change code → Build → Copy → Hard reload (Ctrl+F5)

The dev workflow is **10x faster** for rapid iteration!
