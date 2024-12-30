# LeaderPort Extension Dev Workflow

A simple Chrome Extension starter project that uses React + TypeScript + Vite + Bun + Icon Generation

### Installing Bun

Bun is a fast all-in-one JavaScript runtime like Node.js, but with a focus on performance and developer experience. You can also just use npm or pnpm, whatever works for you. 

To install Bun, you can use the following command:

```bash
curl -fsSL https://bun.sh/install | bash
```

This command will download and install Bun on your system. Make sure to follow any additional instructions provided by the installer to add Bun to your system's PATH.

### Why Use Bun?

- **Performance**: Bun is designed to be fast, with a focus on speed for both startup and runtime performance.
- **Built-in Tools**: Bun includes a bundler, transpiler, and package manager, reducing the need for additional tools.
- **Compatibility**: Bun aims to be compatible with Node.js, making it easier to transition existing projects.
- **Developer Experience**: With features like hot module reloading and a fast development server, Bun enhances the development workflow.


## Development

Install dependencies:

`bun install`

To start the development server:

`bun run dev`

To build the extension:

`bun run build`

## Icon Generation

To generate icons for the extension, run the following command:

`bun scripts/generate-icons.js`

This will generate the following icons in the `public/assets` directory:
- `icon-16.png`
- `icon-24.png`
- `icon-32.png`
- `icon-48.png`
- `icon-128.png`

## Loading the Extension
1. Build the project using `bun run build`
2. Open your Chrome-compatible browser (Chrome, Edge, Brave, etc.)
3. Navigate to the extensions page:
    - Chrome: `chrome://extensions`
    - Edge: `edge://extensions`
    - Brave: `brave://extensions`
4. Enable "Developer mode" in the top-right corner
5. Click "Load unpacked" and select the `dist` directory from your project
6. After pinning it, the extension should now appear in your browser toolbar

**Note:** After making changes, run `bun run build` again and click the refresh icon on the extension card in your browser's extension page.

## Dependencies

- **@mysten/dapp-kit**: SDK for building decentralized applications on the Sui blockchain, providing hooks and utilities for wallet integration and blockchain interactions.
- **@mysten/sui**: Core library for interacting with the Sui blockchain network.
- **@radix-ui/colors**: A collection of color primitives that work with Radix UI components.
- **@radix-ui/react-collapsible**: Collapsible component from Radix UI for creating expandable/collapsible sections.
- **@radix-ui/react-form**: Form primitives from Radix UI for building accessible forms.
- **@radix-ui/react-icons**: A comprehensive set of icons designed for Radix UI components.
- **@radix-ui/themes**: A design system and component library for building high-quality React applications.
- **@tanstack/react-query**: Powerful data synchronization library for React applications, handling caching, refetching, and state management.
- **react**: A JavaScript library for building user interfaces, used as the core framework for this extension.
- **react-dom**: React package for DOM rendering and manipulation.
- **react-spinners**: A collection of loading spinner components for React applications.
- **sharp**: A high-performance image processing library for generating icons and other image assets efficiently.
- **styled-components**: CSS-in-JS library for styling React components with dynamic styles.
- **zustand**: Lightweight state management solution for React applications.

## Why React?
React provides a robust ecosystem and extensive component libraries that make it ideal for building complex Chrome extensions. The combination of React with Radix UI and other modern tools enables rapid development of polished, maintainable user interfaces.

## Dev Dependencies

- **@testing-library/jest-dom**: Provides custom DOM element matchers for Jest, making it easier to test React components.
- **@testing-library/react**: Testing utilities for React applications, focusing on testing components as users use them.
- **@types/chrome**: Provides TypeScript type definitions for the Chrome extension APIs.
- **@types/node**: TypeScript type definitions for Node.js.
- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript-specific linting rules.
- **@typescript-eslint/parser**: Allows ESLint to parse TypeScript code.
- **@vitejs/plugin-react**: Official React plugin for Vite, providing React refresh and JSX support.
- **@vitejs/plugin-react-swc**: Vite plugin that uses SWC for faster React refresh and compilation.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes automatically.
- **eslint**: The core ESLint library for identifying and fixing problems in JavaScript code.
- **eslint-plugin-react**: React specific linting rules for ESLint.
- **eslint-plugin-react-hooks**: ESLint plugin for enforcing React Hooks rules.
- **jsdom**: A pure JavaScript implementation of the DOM for use in testing environments.
- **postcss**: A tool for transforming CSS with JavaScript plugins.
- **prettier**: An opinionated code formatter to ensure consistent code style.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom user interfaces.
- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **vite**: A modern frontend build tool offering a faster and leaner development experience.
- **vitest**: A Vite-native unit test framework with a Jest-compatible API.


Official project build started by [zanuka](https://github.com/zanuka) :: December 21, 2024 at 12:05 AM (PST)
