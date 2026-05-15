# Mantra Music Player

Mantra Music Player is a plugin-first cross-platform desktop music player.

## Stack

- Tauri 2
- Rust
- Svelte 5
- TypeScript
- Vite
- Bun

## Development

Install dependencies:

```sh
bun install
```

Run the desktop app:

```sh
bun run tauri:dev
```

Run baseline checks:

```sh
bun run verify
```

## Frontend Structure

- `src/main.ts`: application bootstrap.
- `src/app`: root app shell and global styles.
- `src/shared`: shared config, utilities, primitives, and types.
- `src/entities`: domain entities.
- `src/features`: user-facing feature modules.
- `src/widgets`: composed UI blocks.
- `src/pages`: top-level screens if routing is introduced.

Frontend files and folders use kebab-case.

## Environment Variables

Copy `.env.example` to `.env` for local values when needed.

Only `VITE_MANTRA_*` variables are intended for frontend code. They are build-time values and must not contain secrets because Vite embeds exposed variables into the frontend bundle.

Read environment values through `src/shared/config/environment.ts`.
