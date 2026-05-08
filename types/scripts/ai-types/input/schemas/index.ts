// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

/*
 * Please prefix the subschema constants name with `schema` and use lowerCamelCase. Example: schemaTextGenerationPrompts
 * and the $href id with the same name, but without the `schema` prefix. Example: $href: "http://ai.cloudflare.com/schemas/textGenerationPrompts"
 */

import { schemaJsonMode, schemaUsage, schemaToolCallOutput } from './common.ts';
import {
  schemaTextEmbeddings,
  schemaTextEmbeddingsPooling,
} from './text-embeddings.ts';
import {
  schemaTextGeneration,
  schemaTextGenerationPrompts,
  schemaTextGenerationOptions,
  schemaTextGenerationTools,
  schemaTextGenerationFinetune,
} from './text-generation.ts';
import {
  schemaResponses,
  schemaResponsesBasic,
  schemaResponsesTextFormats,
  schemaResponsesTextConfig,
  schemaResponsesToolChoice,
  schemaResponsesToolDefinitions,
  schemaResponsesToolCalls,
  schemaResponsesLogprobs,
  schemaResponsesInputContent,
  schemaResponsesOutputContent,
  schemaResponsesMessages,
  schemaResponsesReasoning,
  schemaResponsesOutput,
} from './responses.ts';
import {
  schemaChatCompletions,
  schemaChatCompletionsContentParts,
  schemaChatCompletionsMessages,
  schemaChatCompletionsTools,
  schemaChatCompletionsOptions,
  schemaChatCompletionsResponse,
} from './chat-completions.ts';

export const schemaBlocks = [
  schemaJsonMode,
  schemaUsage,
  schemaToolCallOutput,
  //
  schemaTextGeneration,
  schemaTextGenerationPrompts,
  schemaTextGenerationOptions,
  schemaTextGenerationTools,
  schemaTextGenerationFinetune,
  //
  schemaTextEmbeddings,
  schemaTextEmbeddingsPooling,
  //
  schemaResponses,
  schemaResponsesBasic,
  schemaResponsesTextFormats,
  schemaResponsesTextConfig,
  schemaResponsesToolChoice,
  schemaResponsesToolDefinitions,
  schemaResponsesToolCalls,
  schemaResponsesLogprobs,
  schemaResponsesInputContent,
  schemaResponsesOutputContent,
  schemaResponsesMessages,
  schemaResponsesReasoning,
  schemaResponsesOutput,
  //
  schemaChatCompletions,
  schemaChatCompletionsContentParts,
  schemaChatCompletionsMessages,
  schemaChatCompletionsTools,
  schemaChatCompletionsOptions,
  schemaChatCompletionsResponse,
];
