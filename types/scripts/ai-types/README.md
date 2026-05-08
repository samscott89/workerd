# AI Types Generator

## Status

🚧 **Scaffolding only.** This script is a stub. Inputs and outputs described
below are the planned interface; see `docs/plans/2026-05-07-ai-types-v5-refactor-plan.md`
for the implementation roadmap.

Generates `types/defines/ai-shared-schemas.d.ts` and `types/defines/ai-models.d.ts`
from a model registry dump.

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
