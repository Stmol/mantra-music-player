import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";

export default [
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...svelte.configs["flat/recommended"],
  unicorn.configs.recommended,
  prettier,
  ...svelte.configs["flat/prettier"],
  {
    ignores: [
      "build/**",
      "dist/**",
      "node_modules/**",
      "src-tauri/target/**",
      "src-tauri/gen/**",
      ".svelte-kit/**",
    ],
  },
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        document: "readonly",
        process: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
          },
          ignore: [String.raw`^AGENTS\.md$`, String.raw`^README\.md$`],
        },
      ],
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
  {
    files: [
      "src/app/components/*/*.svelte",
      "src/app/components/*/__tests__/*.test.ts",
      "src/shared/ui/*/*.svelte",
      "src/shared/ui/*/__tests__/*.test.ts",
    ],
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "pascalCase",
        },
      ],
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ["src/**/*"],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/*.{ts,svelte,css}": "KEBAB_CASE",
          "src/{entities,features,pages,widgets}/**/*.{ts,svelte,css}":
            "KEBAB_CASE",
          "src/app/*.{ts,svelte,css}": "KEBAB_CASE",
          "src/app/{data,styles}/**/*.{ts,svelte,css}": "KEBAB_CASE",
          "src/app/components/*/*.{ts,css}": "KEBAB_CASE",
          "src/app/components/*/*.svelte": "PASCAL_CASE",
          "src/app/components/*/__tests__/*.test.ts": "PASCAL_CASE",
          "src/shared/*.{ts,svelte,css}": "KEBAB_CASE",
          "src/shared/!(ui)/**/*.{ts,svelte,css}": "KEBAB_CASE",
          "src/shared/ui/*.ts": "KEBAB_CASE",
          "src/shared/ui/*/*.{ts,css}": "KEBAB_CASE",
          "src/shared/ui/*/*.svelte": "PASCAL_CASE",
          "src/shared/ui/*/__tests__/*.test.ts": "PASCAL_CASE",
          "src/shared/ui/**/*.css": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/{entities,features,pages,widgets}/**/": "KEBAB_CASE",
          "src/app/{data,styles}/**/": "KEBAB_CASE",
          "src/app/components/*/": "PASCAL_CASE",
          "src/app/components/*/__tests__/": "KEBAB_CASE",
          "src/shared/!(ui)/**/": "KEBAB_CASE",
          "src/shared/ui/*/": "PASCAL_CASE",
          "src/shared/ui/*/__tests__/": "KEBAB_CASE",
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "check-file/filename-naming-convention": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    files: [
      "src/app/components/*/__tests__/*.test.ts",
      "src/shared/ui/*/__tests__/*.test.ts",
    ],
    rules: {
      "check-file/folder-naming-convention": "off",
    },
  },
];
