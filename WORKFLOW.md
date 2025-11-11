# Development Workflow

This document explains the automated version bumping and release workflow for the Heat Pump Flow Card.

## The Problem We Solved

### Old Workflow (Orphaned Branches)
```
1. Create branch from main (v0.30.8)
2. Make changes
3. Create PR
4. PR triggers version bump → v0.30.9 (commit to PR branch)
5. Merge PR to main
6. Merge triggers another version bump → v0.30.10 (commit to main)
7. ❌ Original branch now orphaned (has v0.30.9 but main has v0.30.10)
```

### New Workflow (Clean Branches)
```
1. Create branch from main (v0.30.8)
2. Push first commit
3. ✅ Auto version bump → v0.30.9 (once, on branch)
4. Continue development (same version)
5. Create PR
6. Merge PR to main
7. ✅ Create pre-release with v0.30.9 (no additional bump)
8. ✅ Branch stays in sync with main
```

## How It Works

### 1. **Version Bump on First Push** (`version-bump-on-push.yml`)

**Triggers when**:
- You push to branches matching: `claude/**`, `feature/**`, `fix/**`
- Only if you modified: `src/**`, `package.json`, or `rollup.config.js`

**What it does**:
1. Checks if your branch version matches main
2. If yes → auto-bumps patch version (e.g., 0.30.8 → 0.30.9)
3. Updates `package.json`, `src/const.ts`, `hacs.json`
4. Builds the project
5. Commits and pushes the version bump

**Subsequent pushes**: Skips version bump (version already differs from main)

### 2. **Pre-Release Creation on Merge** (`version-bump.yml`)

**Triggers when**:
- PR is merged to main
- Only if you modified: `src/**`, `package.json`, or `rollup.config.js`

**What it does**:
1. Uses the existing version from the merged branch (no new bump)
2. Creates a pre-release tag on GitHub
3. Attaches built files (`heat-pump-flow-card.js` and `.js.map`)
4. Beta testers with "Show beta versions" in HACS receive the update

**Manual trigger**: Still allows manual version bumps if needed

### 3. **Stable Release Creation** (`release.yml`)

**Triggers**: Manual only (Actions → Create Stable Release)

**What it does**:
- Promotes existing pre-release to stable, OR
- Bumps version + creates new stable release
- General HACS users receive the update

## Branch Naming Patterns

The auto-bump workflow triggers for these branch patterns:
- `claude/**` - AI-assisted development branches
- `feature/**` - Feature development
- `fix/**` - Bug fixes

**To add more patterns**, edit `.github/workflows/version-bump-on-push.yml`:
```yaml
branches:
  - 'claude/**'
  - 'feature/**'
  - 'fix/**'
  - 'your-pattern/**'  # Add your pattern here
```

## Example Workflow

### Scenario: Adding a new feature

```bash
# 1. Create branch from main
git checkout -b feature/new-awesome-feature

# 2. Make your first code change
# Edit src/heat-pump-flow-card.ts

# 3. Commit and push
git add src/heat-pump-flow-card.ts
git commit -m "feat: add awesome feature"
git push -u origin feature/new-awesome-feature

# ✅ GitHub Action automatically:
# - Detects version matches main
# - Bumps version (0.30.8 → 0.30.9)
# - Commits bump to your branch
```

**Your branch now has**:
- Your feature commit
- Auto version bump commit (0.30.9)

**Continue development**:
```bash
# 4. Make more changes (same version)
git add .
git commit -m "feat: improve awesome feature"
git push

# ✅ No version bump (already bumped)
```

**Create PR and merge**:
```bash
# 5. Create PR on GitHub
# 6. Review and merge

# ✅ GitHub Action automatically:
# - Uses version 0.30.9 from your branch
# - Creates pre-release v0.30.9
# - No additional version bump
# - Branch stays clean
```

**After merge**:
- Main branch: v0.30.9 ✅
- Your branch: v0.30.9 ✅
- No orphaned commits
- No conflicts

## Manual Version Control

### Force a Specific Version

If you need to override the auto-bump:

```bash
# After first push, manually adjust version
npm version 1.0.0 --no-git-tag-version
npm run build
git add package.json package-lock.json src/const.ts hacs.json dist/
git commit -m "chore: set version to 1.0.0"
git push
```

### Skip Auto-Bump

If you don't want auto-bump for a specific branch:

1. Use a branch name outside the patterns (e.g., `experiment/test`)
2. Or, manually bump version BEFORE first push:

```bash
git checkout -b feature/no-auto-bump
npm version 0.30.9 --no-git-tag-version
# Make your changes
git add .
git commit -m "feat: with manual version"
git push

# ✅ Workflow sees version already bumped, skips
```

### Bump Minor or Major Version

The auto-bump only increments patch. For minor/major:

**Option A**: Manually before branch creation
```bash
npm version minor  # 0.30.9 → 0.31.0
npm version major  # 0.30.9 → 1.0.0
git push
```

**Option B**: Use workflow dispatch after push
1. Go to Actions → "Create Pre-Release on Merge"
2. Click "Run workflow"
3. Select bump type: minor or major
4. This creates a manual bump + pre-release

## Troubleshooting

### Problem: Version bumped twice

**Symptom**: Branch has 0.30.9, then gets bumped to 0.30.10 after merge

**Cause**: Old workflow still running, or version bump triggered manually

**Fix**: Ensure you're using the latest workflows from this branch

### Problem: Version not bumping on push

**Check**:
1. Branch name matches pattern (`claude/**`, `feature/**`, `fix/**`)
2. Modified files in `src/**`, `package.json`, or `rollup.config.js`
3. Version in branch matches main (if already different, won't bump)

**Debug**: Check Actions tab for workflow run logs

### Problem: Pre-release not created

**Check**:
1. PR was merged (not just closed)
2. PR modified `src/**`, `package.json`, or `rollup.config.js`
3. Workflow has `contents: write` permission

**Debug**: Check Actions tab for "Create Pre-Release on Merge" logs

## Workflow Files Reference

| File | Purpose | Trigger |
|------|---------|---------|
| `version-bump-on-push.yml` | Auto-bump version on first push | Push to `claude/**`, `feature/**`, `fix/**` |
| `version-bump.yml` | Create pre-release on merge | PR merged to main |
| `release.yml` | Create stable release | Manual (workflow dispatch) |

## Best Practices

1. **Use standard branch prefixes**: `feature/`, `fix/`, `claude/`
2. **One feature per branch**: Keeps versions clean
3. **Merge frequently**: Avoid long-lived branches with version conflicts
4. **Test pre-releases**: Let beta testers verify before stable release
5. **Manual major bumps**: Use `release.yml` for major version changes

## Migration from Old Workflow

If you have existing branches created before this change:

```bash
# Pull latest main
git checkout main
git pull

# Update your branch
git checkout your-feature-branch
git rebase main

# If version not yet bumped, manually bump
npm version patch --no-git-tag-version
npm run build
git add package.json package-lock.json src/const.ts hacs.json dist/
git commit -m "chore: bump version"
git push

# Create PR as normal
```

Future branches will auto-bump automatically.
