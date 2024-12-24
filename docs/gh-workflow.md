# GitHub Workflow Details

This repository uses GitHub Actions for continuous integration and building extension packages for different browsers.

## Workflow Overview

The main workflow (`dev-build-deploy.yml`) handles building, testing, and packaging the browser extensions using a matrix strategy for multiple browsers.

### Triggers
- Push events to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

### Matrix Strategy
The workflow builds extensions for multiple browsers in parallel:
- Chrome
- Firefox
- Edge
- Opera

### Build Steps
1. **Checkout**: Fetches the repository code
2. **Node.js Setup**: Configures Node.js v20 with npm caching
3. **Dependencies**: Installs project dependencies using `npm ci`
4. **Build**: Runs browser-specific build scripts
5. **Test**: Executes test suite
6. **Package**: Creates ZIP archives for each browser extension
7. **Artifacts**: Uploads packaged extensions as workflow artifacts

### Artifacts
- Each browser extension is packaged as a ZIP file
- Artifacts are retained for 5 days
- Available for download through GitHub Actions interface

## Required Scripts

Your `package.json` needs these scripts configured:

