// @ts-check
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const angularPlugin = require("@angular-eslint/eslint-plugin");
const templatePlugin = require("@angular-eslint/eslint-plugin-template");
const templateParser = require("@angular-eslint/template-parser");

module.exports = [
  // TypeScript recommended (registers plugin + rules for *.ts)
  ...tsPlugin.configs["flat/recommended"],

  // TypeScript source files — Angular rules + custom overrides
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
    },
    plugins: {
      "@angular-eslint": angularPlugin,
      "@angular-eslint/template": templatePlugin,
    },
    processor: templatePlugin.processors["extract-inline-html"],
    rules: {
      // @angular-eslint recommended (v22)
      "@angular-eslint/contextual-lifecycle": "error",
      "@angular-eslint/no-empty-lifecycle-method": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-inputs-metadata-property": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-outputs-metadata-property": "error",
      "@angular-eslint/prefer-inject": "error",
      "@angular-eslint/prefer-on-push-component-change-detection": "error",
      "@angular-eslint/prefer-standalone": "error",
      "@angular-eslint/use-pipe-transform-interface": "error",
      // Custom selectors (preserved from .eslintrc.json)
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "sd", style: "kebab-case" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" },
      ],
      // @typescript-eslint overrides
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // HTML templates
  {
    files: ["src/**/*.html"],
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      "@angular-eslint/template": templatePlugin,
    },
    rules: {
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/eqeqeq": "error",
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/prefer-control-flow": "error",
    },
  },
];
