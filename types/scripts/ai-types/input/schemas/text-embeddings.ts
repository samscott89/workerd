// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Vendored from cloudflare/ai/sdk@staging:apps/worker-constellation-entry/src/ai/tasks/schemas/text-embeddings.ts

export const schemaTextEmbeddings = {
  $id: "http://ai.cloudflare.com/schemas/textEmbeddings",
  input: {
    type: "object",
    properties: {
      text: {
        oneOf: [
          {
            type: "string",
            description: "The text to embed",
            minLength: 1,
          },
          {
            type: "array",
            description: "Batch of text values to embed",
            items: {
              type: "string",
              description: "The text to embed",
              minLength: 1,
            },
            maxItems: 100,
          },
        ],
      },
    },
    required: ["text"],
  },
  output: {
    type: "object",
    contentType: "application/json",
    properties: {
      shape: {
        type: "array",
        items: {
          type: "number",
        },
      },
      data: {
        type: "array",
        description: "Embeddings of the requested text values",
        items: {
          type: "array",
          description: "Floating point embedding representation shaped by the embedding model",
          items: {
            type: "number",
          },
        },
      },
    },
  },
};

export const schemaTextEmbeddingsPooling = {
  $id: "http://ai.cloudflare.com/schemas/textEmbeddingsPooling",
  pooling: {
    type: "string",
    enum: ["mean", "cls"],
    default: "mean",
    description:
      " pooling method used in the embedding process. Note that the `mean` method should not be used in the bge*-v1.5 family and it's a default simply for backwards compatibility reasons.",
  },
};
