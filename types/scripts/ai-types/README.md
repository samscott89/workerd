# AI Types Generator

Generates the per-model and shared-schema portions of the workers-types AI
binding from the model registry catalog and the vendored AI SDK shared schemas.

## Inputs

- `input/staging_config_dump.json` -- catalog dump from the AI config API
- `input/schemas/*.ts` -- vendored shared schemas from `cloudflare/ai/sdk` repo
  (`apps/worker-constellation-entry/src/ai/tasks/schemas/`)

## Outputs

- `../../defines/ai-shared-schemas.d.ts` -- non-exported (`_AiX`) building blocks
  for shared schemas like generation params, ChatCompletions API, Responses API
- `../../defines/ai-models.d.ts` -- exported per-model types
  (`Ai_Cf_*_Input`/`_Output`, `Base_Ai_Cf_*`) plus the `AiModels` interface

## Type visibility convention

To keep the public type surface small and stable, the generator emits two tiers:

- **Exported (stable public API):** `Ai_Cf_*_Input`, `Ai_Cf_*_Output`,
  `Base_Ai_Cf_*`, `AiModels`. These names are part of the workers-types public
  contract; renaming them is a breaking change.
- **Internal (`_Ai*` prefix, not exported):** all shared building blocks
  (`_AiTextGenerationOptionsCommon`, `_AiChatCompletionsInput`, etc.) and any
  nested helper types hoisted by json-schema-to-typescript. These are
  implementation details; we can rename, restructure, or split them without
  it being a breaking change for users.

Users still get structural inference via `AI.run()` and via the top-level
model types — they just can't `import` the underscored internals directly.

## Usage

```bash
pnpm install
pnpm generate
```

## Updating shared schemas

Re-vendor by copying files from `cloudflare/ai/sdk` repo at:
`apps/worker-constellation-entry/src/ai/tasks/schemas/`

## Known limitations

- Older model schemas in `staging_config_dump.json` (e.g., uform, whisper,
  llama-guard, leonardo) inline fields rather than using `$ref` to shared
  schemas. These models get their own inlined types in `ai-models.d.ts` until
  the upstream schemas migrate to the shared `$ref` system. This is tracked
  separately as a follow-up.
