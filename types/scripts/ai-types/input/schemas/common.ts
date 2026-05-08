// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Vendored from cloudflare/ai/sdk@staging:apps/worker-constellation-entry/src/ai/tasks/schemas/common.ts

export const schemaJsonMode = {
  $id: "http://ai.cloudflare.com/schemas/jsonMode",
  response_format: {
    title: "JSON Mode",
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["json_object", "json_schema"],
      },
      json_schema: {},
    },
  },
};

export const schemaUsage = {
  $id: "http://ai.cloudflare.com/schemas/usage",
  usage: {
    type: "object",
    description: "Usage statistics for the inference request",
    properties: {
      prompt_tokens: {
        type: "number",
        description: "Total number of tokens in input",
        default: 0,
      },
      completion_tokens: {
        type: "number",
        description: "Total number of tokens in output",
        default: 0,
      },
      total_tokens: {
        type: "number",
        description: "Total number of input and output tokens",
        default: 0,
      },
    },
  },
};

export const schemaToolCallOutput = {
  $id: "http://ai.cloudflare.com/schemas/toolCallOutput",
  tool_call: {
    title: "OpenAI tool call spec",
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Unique identifier for the tool call",
      },
      type: {
        type: "string",
        enum: ["function"],
        description: "Type of tool call",
      },
      function: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the function to call",
          },
          arguments: {
            type: "string",
            description: "JSON string of arguments for the function",
          },
        },
        required: ["name", "arguments"],
      },
    },
    required: ["id", "type", "function"],
  },
};
