# Release Workflow

This document explains the automated release process for the Heat Pump Flow Card.

## Overview

The project uses a **two-tier release strategy**:

1. **Pre-Releases (Beta)** - Automatically created for testing
2. **Stable Releases** - Manually published for general use

This allows beta testers to receive updates immediately while giving you control over what reaches the general public.

## How It Works

### 1. Create Feature Branch

**Developers** create a new branch from main using standard prefixes: `feature/`, `fix/`, or `claude/`

### 2. First Push → Auto Version Bump

When you push your first commit to a new branch:
- The **Auto Version Bump on Push** workflow:
  - Detects that your branch version matches main
  - Bumps the patch version (e.g., `v0.30.8` → `v0.30.9`)
  - Updates `package.json`, `src/const.ts`, and `hacs.json`
  - Builds the project
  - Commits version bump to your branch

**Subsequent pushes**: Version stays the same (no repeated bumps)

### 3. Continue Development

Continue working on your branch with the bumped version. All commits use the same version number.

### 4. Merge to Main → Pre-Release (Automatic)

When your PR is merged to main:
- The **Create Pre-Release on Merge** workflow:
  - Uses the existing version from your branch (no additional bump)
  - **Creates a pre-release tag** (e.g., `v0.30.9`)
  - Uploads `heat-pump-flow-card.js` and `.js.map` files

**Beta testers** who enable "Show beta versions" in HACS will receive this update automatically.

**Benefits**: No orphaned commits, cleaner git history, branches stay in sync with main.

> 📖 For detailed workflow documentation, see [WORKFLOW.md](WORKFLOW.md)

### 5. Production Release → Stable (Manual)

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

## Manual Stable Release (with Optional Version Bump)

To create a stable release, with optional version bumping:

1. Go to **Actions** → **Create Stable Release**
2. Click **Run workflow**
3. Choose your version strategy:

   **Option A: Bump Version Automatically**
   - Select bump type: `major`, `minor`, or `patch`
   - The workflow will:
     - Increment the version (e.g., `0.30.8` → `0.31.0` for minor)
     - Reset lesser version numbers to 0 (e.g., minor bump resets patch to 0)
     - Update `package.json`, `src/const.ts`, and `hacs.json`
     - Build the project
     - Commit and push changes
     - Create the stable release with the new version

   **Option B: Use Specific Version**
   - Enter a specific version (e.g., `1.0.0`)
   - Leave bump type as `none`
   - The workflow will update files, build, and create the release

   **Option C: Promote Existing Pre-Release**
   - Leave both fields empty or select bump type `none`
   - The workflow will use the current `package.json` version
   - If a pre-release exists for that version, it will be promoted to stable
     - If no pre-release exists, a new stable release will be created

4. The workflow creates or promotes the stable release

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
