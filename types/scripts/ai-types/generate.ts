// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Entry point for AI types generator.
// See README.md for details.

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { generateSharedSchemas } from './generate-shared.ts';

async function main(): Promise<void> {
  const sharedPath = path.resolve(
    import.meta.dirname,
    '../../defines/ai-shared-schemas.d.ts'
  );
  const shared = await generateSharedSchemas();
  writeFileSync(sharedPath, shared);
  console.log(`Wrote ${sharedPath} (${shared.length} chars)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
