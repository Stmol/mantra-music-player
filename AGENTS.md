# Agent Instructions

## Project Overview

Mantra Music Player is a plugin-first cross-platform desktop music player.

## Technology Stack

- Desktop shell: Tauri 2
- Native layer: Rust
- Frontend: Svelte 5
- Frontend language: TypeScript
- Build tool: Vite
- Package manager: Bun

## Architecture

- The Svelte frontend owns the desktop user interface.
- The Tauri/Rust layer owns native desktop integration, filesystem access, app lifecycle, and future performance-sensitive work.
- The future plugin platform should expose a TypeScript SDK for music providers, metadata providers, local library integrations, and controlled UI extension points.
- Keep the baseline application lightweight. Do not add heavy UI kits or large runtime dependencies without explicit discussion.
- Future long lists, such as tracks, albums, and playlists, must be virtualized instead of rendered fully into the DOM.

## Frontend Structure

The frontend lives in `src` and must follow this structure:

- `src/main.ts`: application bootstrap only.
- `src/app`: root application shell, app-level providers, global styles, routing or layout when introduced.
- `src/shared`: reusable code that is not tied to one feature, such as config, utilities, primitives, and shared types.
- `src/entities`: domain entities such as tracks, playlists, albums, artists, libraries, and providers.
- `src/features`: user-facing feature modules such as playback controls, library import, search, and plugin management.
- `src/widgets`: composed UI blocks made from entities and features.
- `src/pages`: top-level screens if page-level routing is introduced.

Naming rules:

- Frontend file and folder names must use kebab-case unless they are component modules covered by the PascalCase rule below.
- Svelte component modules must live in a dedicated PascalCase directory with a PascalCase component file, colocated `types.ts`, `index.ts`, and `__tests__/<Component>.test.ts`. For example: `src/shared/ui/Button/Button.svelte`, `src/shared/ui/Button/types.ts`, `src/shared/ui/Button/index.ts`, and `src/shared/ui/Button/__tests__/Button.test.ts`.
- Nested component parts must live under their parent component directory, for example `src/shared/ui/Button/ButtonLabel/ButtonLabel.svelte`.
- TypeScript modules must use kebab-case filenames, for example `playlist-store.ts`.
- Supporting modules in component directories, such as `index.ts` and `types.ts`, stay kebab-case or lowercase.
- Type names, component exports, stores, and functions use normal TypeScript naming conventions inside files.
- Cross-layer imports should move from generic to specific layers: `app` may import anything, `pages` may import widgets/features/entities/shared, `features` may import entities/shared, and `shared` must not import app-specific code.

## TypeScript And Linting

- Keep TypeScript strict mode enabled.
- Do not weaken `tsconfig.json` or ESLint rules without explicit discussion.
- Avoid `any`, non-null assertions, implicit fallthrough, and unchecked indexed access.
- Prefer explicit domain types at boundaries and inferred types inside small local expressions.
- Run `bun run verify` after changes.

## Environment Variables

- Frontend environment variables are build-time values handled by Vite.
- Only variables prefixed with `VITE_MANTRA_` may be used by Mantra frontend code.
- Frontend environment variables must be read through `src/shared/config/environment.ts`, not directly throughout the app.
- Never put secrets, API tokens, refresh tokens, or private keys in `VITE_*` variables because they are bundled into frontend assets.
- Tauri exposes `TAURI_ENV_*` values to build hooks; these are allowed for platform-aware builds and diagnostics, not for secrets.
- Runtime user settings should be stored through the future app configuration layer, not through environment variables.

## Language Rule

All project artifacts must be written in English by default:

- code comments
- documentation files
- Markdown files
- UI labels and baseline interface text
- configuration descriptions

Interface localization may be added later through dedicated locale files. Do not mix localized UI strings into source code before the localization layer exists.

## Agent Workflow

- Use fish shell for local commands.
- Do not commit files unless the user explicitly asks for a commit.
- Prefer small, focused changes that preserve the existing architecture.
- After completing a task, run `bun run verify`.
- If `bun run verify` cannot be run or fails for an environment reason, report the exact reason and the command output summary.
