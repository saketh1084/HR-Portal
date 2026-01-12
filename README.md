# Jobs Portal - Installation & Setup Guide

## Prerequisites

Before installing, make sure you have:
- **Node.js** (version 16.x or higher recommended)
- **npm** (comes with Node.js) or **yarn**

Check your versions:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "jobs portal"
```

### 2. Install Dependencies

**Using npm:**
```bash
npm install
```

**Using yarn (alternative):**
```bash
yarn install
```

**Using pnpm (alternative):**
```bash
pnpm install
```

## Troubleshooting npm install Issues

### Issue 1: Permission Errors
**Error:** `EACCES: permission denied`

**Solution:**
```bash
# On macOS/Linux
sudo npm install

# OR better: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue 2: Network/Connection Issues
**Error:** `ETIMEDOUT` or `ECONNREFUSED`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try with different registry
npm install --registry https://registry.npmjs.org/

# Or use yarn
npm install -g yarn
yarn install
```

### Issue 3: Node Version Mismatch
**Error:** `The engine "node" is incompatible`

**Solution:**
```bash
# Install/use correct Node version
# Using nvm (Node Version Manager)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### Issue 4: Missing node_modules folder
**Solution:**
```bash
# Delete package-lock.json and node_modules if they exist
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Install fresh
npm install
```

### Issue 5: Corrupted node_modules
**Solution:**
```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Clear cache
npm cache clean --force

# Reinstall
npm install
```

### Issue 6: Python/Node-gyp Errors (on Windows)
**Error:** `node-gyp` or `python` related errors

**Solution:**
```bash
# Install Windows Build Tools
npm install --global windows-build-tools

# Or install Visual Studio Build Tools manually
```

### Issue 7: SSL Certificate Errors
**Error:** `UNABLE_TO_VERIFY_LEAF_SIGNATURE`

**Solution:**
```bash
# Temporary fix (not recommended for production)
npm config set strict-ssl false

# Better: Update npm and certificates
npm install -g npm@latest
```

## Alternative Installation Methods

### Using Yarn
```bash
# Install yarn globally
npm install -g yarn

# Install dependencies
yarn install
```

### Using pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install
```

## Running the Application

After successful installation:

```bash
# Start development server
npm run dev

# The app will be available at:
# http://localhost:3000
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## If All Else Fails

1. **Check Node.js version:**
   ```bash
   node --version  # Should be 16.x or higher
   ```

2. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

3. **Try with verbose logging:**
   ```bash
   npm install --verbose
   ```

4. **Check for specific package errors:**
   ```bash
   npm install <package-name> --verbose
   ```

5. **Use alternative package manager:**
   - Try `yarn` or `pnpm` instead of `npm`

## System Requirements

- **Node.js:** 16.x or higher (18.x recommended)
- **npm:** 8.x or higher
- **Operating System:** Windows, macOS, or Linux

## Getting Help

If you're still facing issues:
1. Check the error message carefully
2. Search for the specific error on Stack Overflow
3. Make sure your Node.js and npm are up to date
4. Try using `yarn` or `pnpm` as alternatives

## Quick Fix Script

Run these commands in order:

```bash
# 1. Remove existing files
rm -rf node_modules package-lock.json

# 2. Clear cache
npm cache clean --force

# 3. Update npm
npm install -g npm@latest

# 4. Install dependencies
npm install

# 5. Start the app
npm run dev
```
