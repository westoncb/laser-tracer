# Laser‑Tracer Monorepo

This workspace contains two packages:

| Package                                        | Description                                                 |
| ---------------------------------------------- | ----------------------------------------------------------- |
| **@laser-tracer/core** (`packages/core`)       | The rendering & drawing runtime                             |
| **@laser-tracer/sandbox** (`packages/sandbox`) | The React / QuickJS playground that powers the live editor. |

```bash
pnpm install         # sets up both packages

## Development
pnpm --filter sandbox dev   # launches Vite dev server for the playground

## Build
pnpm --filter @laser-tracer/core build   # emits dist/ bundle via Vite library mode
```
