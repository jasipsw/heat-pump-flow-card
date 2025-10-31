# Quick Start Guide

Get your Heat Pump Flow Card up and running in 5 minutes!

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `heat-pump-flow-card`
3. Description: "Animated heat pump flow visualization for Home Assistant"
4. Public repository (required for HACS)
5. Click "Create repository"

## Step 2: Upload Project Files

From your local machine where you have this project:

```bash
cd /home/user/heat-pump-flow-card

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Heat Pump Flow Card v0.1.0"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/heat-pump-flow-card.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Build the Card

```bash
# Install dependencies
npm install

# Build the card
npm run build
```

The compiled file will be in `dist/heat-pump-flow-card.js`

## Step 4: Install in Home Assistant

### Option A: Manual Installation (for testing)

1. Copy the built file to Home Assistant:
   ```bash
   cp dist/heat-pump-flow-card.js /root/config/www/
   ```

2. Add to Lovelace resources (`configuration.yaml` or UI):
   ```yaml
   lovelace:
     resources:
       - url: /local/heat-pump-flow-card.js?v=0.1.0
         type: module
   ```

3. Restart Home Assistant

### Option B: HACS (recommended for production)

1. In Home Assistant, go to HACS → Frontend
2. Click "..." menu → Custom repositories
3. Add URL: `https://github.com/YOUR_USERNAME/heat-pump-flow-card`
4. Category: Lovelace
5. Click "Download"

## Step 5: Add Card to Dashboard

1. Edit your dashboard
2. Add a new card
3. Search for "Heat Pump Flow Card"
4. Or manually add:

```yaml
type: custom:heat-pump-flow-card
title: Heat Pump System
heat_pump:
  power_entity: sensor.cx50_heat_pump_watts
  thermal_entity: sensor.heat_pump_thermal_power_output
  cop_entity: sensor.heat_pump_cop
  outlet_temp_entity: sensor.heat_pump_outlet_temperature
  inlet_temp_entity: sensor.heat_pump_inlet_temperature
  flow_rate_entity: sensor.cx50_pump_flow_lpm
buffer_tank:
  supply_temp_entity: sensor.shellyplus1_c4d8d5543fc0_temperature
  return_temp_entity: sensor.shellyplus1_c4d8d5543fc0_temperature_3
hvac:
  thermal_entity: sensor.hvac_thermal_power_used
  flow_rate_entity: sensor.hydronic_flow_flow_rate
  supply_temp_entity: sensor.hvac_buffer_tank_supply_temperature
  return_temp_entity: sensor.hvac_buffer_tank_return_temperature
```

5. Save the card

## Step 6: Verify It Works

You should see:

✅ Heat pump on the left, buffer tank in center, HVAC on the right

✅ Animated dots moving along pipes (when heat pump is running)

✅ Pipes changing color based on temperature (blue → red gradient)

✅ Real-time values for power, COP, temperatures, flow rates

## Troubleshooting

### Card not appearing
- Clear browser cache (Ctrl+F5)
- Check browser console for errors (F12)
- Verify resource is loaded in Developer Tools → Info

### No animation
- Heat pump must be running (power > 500W)
- Flow rate sensors must have valid data
- Check entity IDs in Developer Tools → States

### Wrong colors
- Adjust `temperature.min_temp` and `max_temp` to match your system
- Verify temperature sensors are providing data
- Check that `temperature.unit` matches your sensors (C or F)

### Values show "N/A"
- Check entity IDs exist in Developer Tools → States
- Verify sensors are providing numeric values
- Check spelling of entity IDs

## Next Steps

- ⭐ Star the repository on GitHub
- 📝 Customize the configuration for your system
- 📷 Take a screenshot and share it!
- 🐛 Report any issues you find
- 💡 Suggest improvements

## For CX50 Owners

See `examples/cx50-configuration.yaml` for a complete configuration specifically designed for the Chiltrix CX50-2 heat pump system.

## Get Help

- Read the full documentation: [README.md](README.md)
- Open an issue: https://github.com/YOUR_USERNAME/heat-pump-flow-card/issues
- Home Assistant forum: https://community.home-assistant.io/

Enjoy your new heat pump visualization! 🔥❄️
