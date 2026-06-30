/**
 * ESLint Flat Config for mike-henke-website
 * ESLint 10+ flat config format (CommonJS)
 */
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  // Base configuration
  js.configs.recommended,
  {
    // Files that run in Node.js
    files: [".eleventy.js", "_data/**/*.js", "purgecss.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-undef": "error",
      "no-empty": "error",
    },
  },
  {
    // Files that run in the browser
    files: ["js/**/*.js", "assets/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-undef": "error",
      "no-empty": "error",
    },
  },
  // Ignore patterns
  {
    ignores: ["node_modules/**", "_site/**", "assets/**", "scripts/**"],
  },
];
