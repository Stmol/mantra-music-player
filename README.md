# Mantra Music Player

Plugin-first cross-platform desktop music player built with the
[Native SDK](https://native-sdk.dev/skills).

Logic lives in `src/core.ts` (Model, Msg, update — the app-core TypeScript
subset, compiled to native code at build time; no JS runtime ships in the
binary). The view lives in `src/app.native`. Identity, windows, and
permissions live in `app.zon`.

## Stack

- Desktop toolkit: Native SDK (`@native-sdk/cli`)
- App core: TypeScript (`@native-sdk/core` subset → Zig at build time)
- UI: Native markup (`.native`), rendered by the Native SDK engine
- Native toolchain: Zig 0.16

## Requirements

- Native SDK CLI (`native`) on PATH
- Zig 0.16.0 on PATH (`native doctor` reports this)
- Node.js 22.15+ (on the 23 line: 23.5+) for the TypeScript-to-native
  transpiler at build time

## Development

```sh
native check          # subset-check core.ts + validate markup + app.zon
native dev --core     # logic loop under node (no renderer)
native dev            # build and run the app (markup hot reload)
native test           # app test suite
native build          # ReleaseFast binary in zig-out/bin/
```

Try the scaffolded core loop:

```sh
printf '%s\n' '{"kind":"increment"}' '{"kind":"toggle_ticking"}' '{"advance":3000}' | native dev --core
```

## Project layout

- `app.zon` — app identity, windows, permissions, capabilities
- `src/core.ts` — Model, Msg, update, effects/subscriptions
- `src/app.native` — declarative native UI markup
- `assets/` — icons and other packaged assets
- `package.json` / `tsconfig.json` — editor/IntelliSense surface only
  (builds do not require `npm install`; the CLI materializes
  `node_modules/@native-sdk/core` as needed)

This is a zero-config Native SDK app: there is no checked-in `build.zig`.
The CLI synthesizes the build graph under `.native/` (gitignored). Use
`native eject` only if you need to own the build files.

## Agent skills

Agents should load version-matched guidance from the installed CLI, not
from model memory:

```sh
native skills list
native skills get core --full
native skills get native-ui
native skills get ts-core
native skills get automation
```

See also [Agent Skills | Native SDK](https://native-sdk.dev/skills).
