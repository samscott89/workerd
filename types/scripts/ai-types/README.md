# AI Types Generator

## Status

🚧 **Partial implementation.** Generates `types/defines/ai-shared-schemas.d.ts`
from the vendored shared schemas. Per-model types (`ai-models.d.ts`) are not yet
generated — see `docs/plans/2026-05-07-ai-types-v5-refactor-plan.md` for the
implementation roadmap.

## Inputs

- `input/staging_config_dump.json` -- catalog dump from the AI config API
- `input/schemas/*.ts` -- vendored shared schemas from `cloudflare/ai/sdk` repo
  (`apps/worker-constellation-entry/src/ai/tasks/schemas/`)

## Outputs

- `../../defines/ai-shared-schemas.d.ts`
- `../../defines/ai-models.d.ts`

## Usage

```bash
pnpm install
pnpm generate
```

## Updating shared schemas

Re-vendor by copying files from `cloudflare/ai/sdk` repo at:
`apps/worker-constellation-entry/src/ai/tasks/schemas/`
