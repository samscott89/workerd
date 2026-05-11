// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Entry point for the AI types generator.
// See README.md for details.

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { generateSharedSchemas } from './generate-shared.ts';
import { generateModels } from './generate-models.ts';

async function main(): Promise<void> {
  const sharedPath = path.resolve(
    import.meta.dirname,
    '../../defines/ai-shared-schemas.d.ts'
  );
  const modelsPath = path.resolve(
    import.meta.dirname,
    '../../defines/ai-models.d.ts'
  );

  const shared = await generateSharedSchemas();
  writeFileSync(sharedPath, shared);
  console.log(`Wrote ${sharedPath} (${shared.length} chars)`);

  const models = await generateModels();
  writeFileSync(modelsPath, models.content);
  console.log(
    `Wrote ${modelsPath} (${models.content.length} chars, ${models.generated.length} models)`
  );
  if (models.skipped.length > 0) {
    console.warn(`Skipped ${models.skipped.length} model(s):`);
    for (const { model, reason } of models.skipped) {
      console.warn(`  - ${model}: ${reason}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
