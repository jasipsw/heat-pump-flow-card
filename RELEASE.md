# Release Workflow

This document explains the automated release process for the Heat Pump Flow Card.

## Overview

The project uses a **two-tier release strategy**:

1. **Pre-Releases (Beta)** - Automatically created for testing
2. **Stable Releases** - Manually published for general use

This allows beta testers to receive updates immediately while giving you control over what reaches the general public.

## How It Works

### 1. Development & Testing

**Developers** work on feature branches and create pull requests.

### 2. Pull Request Review

When a PR is opened or updated:
- The **Version Bump in PR** workflow automatically:
  - Bumps the version number (patch by default)
  - Updates `package.json`, `src/const.ts`, and `hacs.json`
  - Builds the project
  - Commits changes to the PR branch

This allows reviewers to see the version-bumped code before merging.

### 3. Merge to Main → Pre-Release (Automatic)

When a PR is merged to main:
- The **Auto Version Bump** workflow:
  - Verifies/bumps the version number
  - Builds the project
  - Commits the built files
  - **Creates a pre-release tag** (e.g., `v0.30.7`)
  - Uploads `heat-pump-flow-card.js` and `.js.map` files

**Beta testers** who enable "Show beta versions" in HACS will receive this update automatically.

### 4. Production Release → Stable (Manual)

When you're confident the pre-release is stable:

1. Go to **Actions** → **Create Stable Release**
2. Click **Run workflow**
3. Choose to:
   - Leave version empty (uses `package.json` version)
   - Or specify a custom version

The workflow will:
- If the tag exists (pre-release): **Promote it to stable**
- If the tag doesn't exist: **Create a new stable release**

**General users** in HACS will now see this version as the latest stable release.

## For Different User Types

### Developers
- Work on feature branches
- Create PRs for review
- Test from source or PR branches

### Beta Testers
1. In HACS, go to the Heat Pump Flow Card
2. Click the menu (⋮) → **Redownload**
3. Enable **Show beta versions**
4. You'll receive pre-releases automatically after merges

### General Public
- Install from HACS normally
- Only sees stable releases
- Receives updates when you manually promote releases

## Manual Version Bump (Optional)

If you need to bump the version without a PR:

1. Go to **Actions** → **Auto Version Bump**
2. Click **Run workflow**
3. Choose branch and bump type (major/minor/patch)

This will bump the version and create a pre-release automatically.

## Manual Stable Release (Optional)

To create a stable release for a specific version:

1. Go to **Actions** → **Create Stable Release**
2. Click **Run workflow**
3. Enter the version (e.g., `0.31.0`) or leave empty for `package.json` version
4. The workflow creates a stable release

## Release Checklist

Before promoting a pre-release to stable:

- [ ] Pre-release has been tested by beta testers
- [ ] No critical bugs reported
- [ ] Documentation is up to date
- [ ] Example configurations work correctly
- [ ] Dark mode and theme compatibility verified
- [ ] All metrics display correctly

## Troubleshooting

### HACS shows old version
- Check GitHub Releases - HACS reads versions from there, not from files
- Ensure the release has the correct tag (e.g., `v0.30.7`)
- Wait a few minutes for HACS to sync

### Pre-release not created
- Check the Actions tab for errors
- Ensure the PR actually modified `src/**`, `package.json`, or `rollup.config.js`
- Verify the workflow has `contents: write` permissions

### Stable release fails
- Ensure you have the correct version number
- Check if a stable release already exists for that version
- If promoting a pre-release, ensure the tag exists

## Workflow Files

- `.github/workflows/version-bump-pr.yml` - Bumps version in PRs
- `.github/workflows/version-bump.yml` - Bumps version and creates pre-release
- `.github/workflows/release.yml` - Creates/promotes stable releases
- `.github/workflows/build.yml` - Builds and commits JS files (if separate)

## Version Tracking

Versions are maintained in three places (auto-synced by workflows):
- `package.json` - NPM package version
- `src/const.ts` - `CARD_VERSION` constant
- `hacs.json` - HACS version field
