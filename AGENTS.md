# Agent Instructions

## Project Overview

Mantra Music Player is a plugin-first cross-platform desktop music player
built with the Native SDK. The current tree is a zero-config bootstrap:
TypeScript app core + Native markup view, no Zig sources, no WebView shell.

## Technology Stack

- Desktop toolkit: Native SDK (`@native-sdk/cli`, currently 0.5.x)
- App core: TypeScript in the `@native-sdk/core` subset (AOT-compiled to Zig)
- UI: Native markup (`.native`), drawn by the Native SDK engine
- Native toolchain: Zig 0.16.0
- Build/dev/test: `native` CLI verbs (zero-config; no checked-in `build.zig`)

Do not reintroduce Tauri, Rust shells, Svelte/Vite frontends, Bun, or WebView
scaffolds unless the product direction explicitly changes.

## Architecture

- `src/core.ts` owns application state and behavior: `Model`, `Msg`,
  `initialModel`, `update`, optional `subscriptions`, and pure helpers.
- `src/app.native` owns the declarative UI. Markup binds model fields and
  helpers by name and dispatches messages; it never mutates state.
- `app.zon` owns identity, windows/shell views, permissions, capabilities,
  security policy, and packaging inputs.
- The Native SDK runtime owns the event loop, GPU surface, automation server,
  and platform services.
- Keep the baseline application lightweight. Prefer Native SDK widgets and
  virtualized lists for long catalogs (tracks, albums, playlists).
- Future plugin work should stay compatible with the TypeScript app-core
  boundary and Native SDK capabilities; do not invent a parallel web runtime
  inside the shipping binary.

Useful SDK reference shape for music-player UI and audio: the
`examples/soundboard-ts` app in the Native SDK repository.

## Project Structure

- `app.zon`: manifest (identity, shell windows, permissions, security).
- `src/core.ts`: app core entry (may import sibling modules under `src/`).
- `src/app.native`: primary markup view.
- `assets/`: icons and packaged assets referenced from `app.zon`.
- `package.json` / `tsconfig.json`: editor and versioning surface for
  `@native-sdk/core` IntelliSense only. Builds never require reading them;
  `npm install` is optional because the CLI materializes the package.
- `.native/`, `zig-out/`, `.zig-cache/`: generated/build output (gitignored).

Naming rules:

- Prefer kebab-case for new file and folder names under `src/` when splitting
  the core into modules (for example `playback-store.ts`).
- Type names, exported helpers, `Msg` kinds, and model fields use normal
  TypeScript naming. Markup binds those names verbatim
  (`tickCount` → `{tickCount}`).
- Keep all project artifacts in English (comments, docs, UI labels,
  configuration descriptions). Localization may arrive later through a
  dedicated layer; do not mix localized strings into source before that.

## Native SDK Skills

Agents must not rely on general model knowledge of the Native SDK. Load
version-matched skills from the installed CLI before implementing or
explaining changes:

```sh
native skills list
native skills get core --full
native skills get native-ui
native skills get ts-core
native skills get automation
native skills get zig
```

Skill router:

- Orientation / project / packaging / bridge / security: `core` (`--full` for
  implementation).
- Markup views, bindings, Model/Msg/update wiring on UiApp: `native-ui`.
- Writing or fixing `src/core.ts` and subset checker rules: `ts-core`.
- Snapshots, readiness, smoke tests against a running window: `automation`.
- Zig 0.16 std API compile failures: `zig`.

Public overview: https://native-sdk.dev/skills

## TypeScript App Core Rules

- Stay inside the `@native-sdk/core` subset. No npm imports besides
  `@native-sdk/core` (and its documented subpaths), no DOM/Node APIs, no
  async/Promises, no regex, no `any`-driven escape hatches.
- Keep `update` pure and synchronous. Effects are returned as `Cmd` data;
  recurring work is declared via `subscriptions` / `Sub`.
- Prefer explicit domain types at boundaries. Keep TypeScript `strict`
  options aligned with the scaffolded `tsconfig.json`.
- Do not add a second source of truth such as `src/main.zig` beside
  `src/core.ts` (that combination is a teaching error).

## Agent Workflow

- Use fish shell for local commands.
- Do not commit files unless the user explicitly asks for a commit.
- Prefer small, focused changes that preserve the zero-config layout.
- Before calling work done, run:

```sh
native check
```

- For behavior changes that can be exercised without a window, also use
  `native dev --core`. For GUI verification, use `native dev` and the
  automation skill when appropriate.
- If Zig is missing or `native doctor` fails for an environment reason,
  report the exact reason and command output summary.
- Run BOTH build and test when touching ejected Zig/`build.zig` trees later:
  `native build` and `native test` (or the equivalent `zig build` steps after
  eject). Lazy analysis can hide breakage if only one path is exercised.
