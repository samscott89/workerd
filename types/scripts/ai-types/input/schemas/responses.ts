// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Vendored from cloudflare/ai/sdk@staging:apps/worker-constellation-entry/src/ai/tasks/schemas/responses.ts

export const schemaResponses = {
  $id: "http://ai.cloudflare.com/schemas/responses",
  input: {
    type: "object",
    oneOf: [
      {
        $ref: "responsesBasic#/Input",
      },
      {
        properties: {
          requests: {
            type: "array",
            items: {
              type: "object",
              $ref: "responsesBasic#/Input",
            },
          },
        },
        required: ["requests"],
      },
    ],
  },
  output: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      created_at: {
        type: "number",
      },
      output_text: {
        type: "string",
      },
      error: {
        anyOf: [
          {
            $ref: "responsesBasic#/ResponseError",
          },
        ],
      },
      incomplete_details: {
        anyOf: [
          {
            $ref: "responsesBasic#/ResponseIncompleteDetails",
          },
        ],
      },
      instructions: {
        anyOf: [
          {
            type: "string",
          },
          {
            type: "array",
            items: {
              $ref: "responsesMessages#/ResponseInputItem",
            },
          },
        ],
      },
      object: {
        type: "string",
      },
      output: {
        type: "array",
        items: {
          $ref: "responsesOutput#/ResponseOutputItem",
        },
      },
      parallel_tool_calls: {
        type: "boolean",
      },
      temperature: {
        type: "number",
      },
      tool_choice: {
        anyOf: [
          {
            $ref: "responsesToolChoice#/ToolChoiceOptions",
          },
          {
            $ref: "responsesToolChoice#/ToolChoiceFunction",
          },
        ],
      },
      tools: {
        type: "array",
        items: {
          $ref: "responsesToolDefinitions#/Tool",
        },
      },
      top_p: {
        type: "number",
      },
      max_output_tokens: {
        type: "number",
      },
      previous_response_id: {
        type: "string",
      },
      prompt: {
        anyOf: [
          {
            $ref: "responsesBasic#/ResponsePrompt",
          },
        ],
      },
      reasoning: {
        anyOf: [
          {
            $ref: "responsesReasoning#/Reasoning",
          },
        ],
      },
      safety_identifier: {
        type: "string",
      },
      service_tier: {
        type: "string",
        enum: ["auto", "default", "flex", "scale", "priority"],
      },
      status: {
        $ref: "responsesBasic#/ResponseStatus",
      },
      text: {
        $ref: "responsesTextConfig#/ResponseTextConfig",
      },
      truncation: {
        type: "string",
        enum: ["auto", "disabled"],
      },
      usage: {
        $ref: "responsesBasic#/ResponseUsage",
      },
    },
  },
};

// Basic configuration and utility types
export const schemaResponsesBasic = {
  $id: "http://ai.cloudflare.com/schemas/responsesBasic",
  Input: {
    properties: {
      background: {
        type: "boolean",
      },
      conversation: {
        anyOf: [
          {
            type: "string",
          },
          {
            $ref: "responsesBasic#/ResponseConversationParam",
          },
        ],
      },
      include: {
        anyOf: [
          {
            type: "array",
            items: {
              $ref: "responsesBasic#/ResponseIncludable",
            },
          },
        ],
      },
      input: {
        anyOf: [
          {
            type: "string",
          },
          {
            $ref: "responsesMessages#/ResponseInput",
          },
        ],
      },
      instructions: {
        type: "string",
      },
      max_output_tokens: {
        type: "number",
      },
      parallel_tool_calls: {
        type: "boolean",
      },
      previous_response_id: {
        type: "string",
      },
      prompt_cache_key: {
        type: "string",
      },
      reasoning: {
        anyOf: [
          {
            $ref: "responsesReasoning#/Reasoning",
          },
        ],
      },
      safety_identifier: {
        type: "string",
      },
      service_tier: {
        type: "string",
        enum: ["auto", "default", "flex", "scale", "priority"],
      },
      stream: {
        type: "boolean",
      },
      stream_options: {
        anyOf: [
          {
            $ref: "responsesBasic#/StreamOptions",
          },
        ],
      },
      temperature: {
        type: "number",
      },
      text: {
        $ref: "responsesTextConfig#/ResponseTextConfig",
      },
      tool_choice: {
        anyOf: [
          {
            $ref: "responsesToolChoice#/ToolChoiceOptions",
          },
          {
            $ref: "responsesToolChoice#/ToolChoiceFunction",
          },
        ],
      },
      tools: {
        type: "array",
        items: {
          $ref: "responsesToolDefinitions#/Tool",
        },
      },
      top_p: {
        type: "number",
      },
      truncation: {
        type: "string",
        enum: ["auto", "disabled"],
      },
    },
    required: ["input"],
  },
  ResponseConversationParam: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
    required: ["id"],
  },
  ResponseIncludable: {
    type: "string",
    enum: ["message.input_image.image_url", "message.output_text.logprobs"],
  },
  StreamOptions: {
    type: "object",
    properties: {
      include_obfuscation: {
        type: "boolean",
      },
    },
  },
  ResponseStatus: {
    type: "string",
    enum: ["completed", "failed", "in_progress", "cancelled", "queued", "incomplete"],
  },
  ResponseUsage: {
    type: "object",
    properties: {
      input_tokens: {
        type: "number",
      },
      output_tokens: {
        type: "number",
      },
      total_tokens: {
        type: "number",
      },
    },
    required: ["input_tokens", "output_tokens", "total_tokens"],
  },
  ResponseError: {
    type: "object",
    properties: {
      code: {
        type: "string",
        enum: [
          "server_error",
          "rate_limit_exceeded",
          "invalid_prompt",
          "vector_store_timeout",
          "invalid_image",
          "invalid_image_format",
          "invalid_base64_image",
          "invalid_image_url",
          "image_too_large",
          "image_too_small",
          "image_parse_error",
          "image_content_policy_violation",
          "invalid_image_mode",
          "image_file_too_large",
          "unsupported_image_media_type",
          "empty_image_file",
          "failed_to_download_image",
          "image_file_not_found",
        ],
      },
      message: {
        type: "string",
      },
    },
    required: ["code", "message"],
  },
  ResponseIncompleteDetails: {
    type: "object",
    properties: {
      reason: {
        type: "string",
        enum: ["max_output_tokens", "content_filter"],
      },
    },
  },
  ResponsePrompt: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      variables: {
        anyOf: [
          {
            type: "object",
            additionalProperties: {
              anyOf: [
                {
                  type: "string",
                },
                {
                  $ref: "responsesInputContent#/ResponseInputText",
                },
                {
                  $ref: "responsesInputContent#/ResponseInputImage",
                },
              ],
            },
          },
        ],
      },
      version: {
        type: "string",
      },
    },
    required: ["id"],
  },
};

// Text format types
export const schemaResponsesTextFormats = {
  $id: "http://ai.cloudflare.com/schemas/responsesTextFormats",
  ResponseFormatText: {
    type: "object",
    properties: {
      type: {
        type: "string",
      },
    },
    required: ["type"],
  },
  ResponseFormatTextJSONSchemaConfig: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      schema: {
        type: "object",
      },
      type: {
        type: "string",
      },
      description: {
        type: "string",
      },
      strict: {
        type: "boolean",
      },
    },
    required: ["name", "schema", "type"],
  },
  ResponseFormatJSONObject: {
    type: "object",
    properties: {
      type: {
        type: "string",
      },
    },
    required: ["type"],
  },
};

// Text configuration types
export const schemaResponsesTextConfig = {
  $id: "http://ai.cloudflare.com/schemas/responsesTextConfig",
  ResponseTextConfig: {
    type: "object",
    properties: {
      format: {
        $ref: "responsesTextConfig#/ResponseFormatTextConfig",
      },
      verbosity: {
        type: "string",
        enum: ["low", "medium", "high"],
      },
    },
  },
  ResponseFormatTextConfig: {
    anyOf: [
      {
        $ref: "responsesTextFormats#/ResponseFormatText",
      },
      {
        $ref: "responsesTextFormats#/ResponseFormatTextJSONSchemaConfig",
      },
      {
        $ref: "responsesTextFormats#/ResponseFormatJSONObject",
      },
    ],
  },
};

// Tool choice types
export const schemaResponsesToolChoice = {
  $id: "http://ai.cloudflare.com/schemas/responsesToolChoice",
  ToolChoiceOptions: {
    type: "string",
  },
  ToolChoiceFunction: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["name", "type"],
  },
};

// Tool definition types
export const schemaResponsesToolDefinitions = {
  $id: "http://ai.cloudflare.com/schemas/responsesToolDefinitions",
  Tool: {
    $ref: "responsesToolDefinitions#/ResponsesFunctionTool",
  },
  ResponsesFunctionTool: {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      parameters: {
        anyOf: [
          {
            type: "object",
          },
        ],
      },
      strict: {
        type: "boolean",
      },
      type: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
    required: ["name", "parameters", "strict", "type"],
  },
};

// Tool call types
export const schemaResponsesToolCalls = {
  $id: "http://ai.cloudflare.com/schemas/responsesToolCalls",
  ResponseFunctionToolCall: {
    type: "object",
    properties: {
      arguments: {
        type: "string",
      },
      call_id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      type: {
        type: "string",
      },
      id: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["in_progress", "completed", "incomplete"],
      },
    },
    required: ["arguments", "call_id", "name", "type"],
  },
  ResponseInputItemFunctionCallOutput: {
    type: "object",
    properties: {
      call_id: {
        type: "string",
      },
      output: {
        anyOf: [
          {
            type: "string",
          },
          {
            $ref: "responsesToolCalls#/ResponseFunctionCallOutputItemList",
          },
        ],
      },
      type: {
        type: "string",
      },
      id: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["in_progress", "completed", "incomplete"],
      },
    },
    required: ["call_id", "output", "type"],
  },
  ResponseFunctionCallOutputItemList: {
    type: "array",
    items: {
      $ref: "responsesToolCalls#/ResponseFunctionCallOutputItem",
    },
  },
  ResponseFunctionCallOutputItem: {
    anyOf: [
      {
        $ref: "responsesInputContent#/ResponseInputTextContent",
      },
      {
        $ref: "responsesInputContent#/ResponseInputImageContent",
      },
    ],
  },
};

// Logprob types
export const schemaResponsesLogprobs = {
  $id: "http://ai.cloudflare.com/schemas/responsesLogprobs",
  Logprob: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
      logprob: {
        type: "number",
      },
      top_logprobs: {
        type: "array",
        items: {
          $ref: "responsesLogprobs#/TopLogprob",
        },
      },
    },
    required: ["token", "logprob"],
  },
  TopLogprob: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
      logprob: {
        type: "number",
      },
    },
  },
};

// Input content types
export const schemaResponsesInputContent = {
  $id: "http://ai.cloudflare.com/schemas/responsesInputContent",
  ResponseInputText: {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["text", "type"],
  },
  ResponseInputImage: {
    type: "object",
    properties: {
      detail: {
        type: "string",
        enum: ["low", "high", "auto"],
      },
      type: {
        type: "string",
      },
      image_url: {
        type: "string",
        description: "Base64 encoded image",
      },
    },
    required: ["detail", "type"],
  },
  ResponseInputTextContent: {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["text", "type"],
  },
  ResponseInputImageContent: {
    type: "object",
    properties: {
      type: {
        type: "string",
      },
      detail: {
        type: "string",
        enum: ["low", "high", "auto"],
      },
      image_url: {
        type: "string",
        description: "Base64 encoded image",
      },
    },
    required: ["type"],
  },
  ResponseInputContent: {
    anyOf: [
      {
        $ref: "responsesInputContent#/ResponseInputText",
      },
      {
        $ref: "responsesInputContent#/ResponseInputImage",
      },
    ],
  },
  ResponseInputMessageContentList: {
    type: "array",
    items: {
      $ref: "responsesInputContent#/ResponseInputContent",
    },
  },
};

// Output content types
export const schemaResponsesOutputContent = {
  $id: "http://ai.cloudflare.com/schemas/responsesOutputContent",
  ResponseOutputText: {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
      type: {
        type: "string",
      },
      logprobs: {
        type: "array",
        items: {
          $ref: "responsesLogprobs#/Logprob",
        },
      },
    },
    required: ["text", "type"],
  },
  ResponseOutputRefusal: {
    type: "object",
    properties: {
      refusal: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["refusal", "type"],
  },
};

// Message types
export const schemaResponsesMessages = {
  $id: "http://ai.cloudflare.com/schemas/responsesMessages",
  ResponseInput: {
    type: "array",
    items: {
      $ref: "responsesMessages#/ResponseInputItem",
    },
  },
  ResponseInputItem: {
    anyOf: [
      {
        $ref: "responsesMessages#/EasyInputMessage",
      },
      {
        $ref: "responsesMessages#/ResponseInputItemMessage",
      },
      {
        $ref: "responsesMessages#/ResponseOutputMessage",
      },
      {
        $ref: "responsesToolCalls#/ResponseFunctionToolCall",
      },
      {
        $ref: "responsesToolCalls#/ResponseInputItemFunctionCallOutput",
      },
      {
        $ref: "responsesReasoning#/ResponseReasoningItem",
      },
    ],
  },
  EasyInputMessage: {
    type: "object",
    properties: {
      content: {
        anyOf: [
          {
            type: "string",
          },
          {
            $ref: "responsesInputContent#/ResponseInputMessageContentList",
          },
        ],
      },
      role: {
        type: "string",
        enum: ["user", "assistant", "system", "developer"],
      },
      type: {
        type: "string",
      },
    },
    required: ["content", "role"],
  },
  ResponseInputItemMessage: {
    type: "object",
    properties: {
      content: {
        $ref: "responsesInputContent#/ResponseInputMessageContentList",
      },
      role: {
        type: "string",
        enum: ["user", "system", "developer"],
      },
      status: {
        type: "string",
        enum: ["in_progress", "completed", "incomplete"],
      },
      type: {
        type: "string",
      },
    },
    required: ["content", "role"],
  },
  ResponseOutputMessage: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      content: {
        type: "array",
        items: {
          anyOf: [
            {
              $ref: "responsesOutputContent#/ResponseOutputText",
            },
            {
              $ref: "responsesOutputContent#/ResponseOutputRefusal",
            },
          ],
        },
      },
      role: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["in_progress", "completed", "incomplete"],
      },
      type: {
        type: "string",
      },
    },
    required: ["id", "content", "role", "status", "type"],
  },
};

// Reasoning types
export const schemaResponsesReasoning = {
  $id: "http://ai.cloudflare.com/schemas/responsesReasoning",
  Reasoning: {
    type: "object",
    properties: {
      effort: {
        anyOf: [
          {
            $ref: "responsesReasoning#/ReasoningEffort",
          },
        ],
      },
      generate_summary: {
        type: "string",
        enum: ["auto", "concise", "detailed"],
      },
      summary: {
        type: "string",
        enum: ["auto", "concise", "detailed"],
      },
    },
  },
  ReasoningEffort: {
    type: "string",
    enum: ["minimal", "low", "medium", "high"],
  },
  ResponseReasoningItem: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      summary: {
        type: "array",
        items: {
          $ref: "responsesReasoning#/ResponseReasoningSummaryItem",
        },
      },
      type: {
        type: "string",
      },
      content: {
        type: "array",
        items: {
          $ref: "responsesReasoning#/ResponseReasoningContentItem",
        },
      },
      encrypted_content: {
        type: "string",
      },
      status: {
        type: "string",
        enum: ["in_progress", "completed", "incomplete"],
      },
    },
    required: ["id", "summary", "type"],
  },
  ResponseReasoningSummaryItem: {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["text", "type"],
  },
  ResponseReasoningContentItem: {
    type: "object",
    properties: {
      text: {
        type: "string",
      },
      type: {
        type: "string",
      },
    },
    required: ["text", "type"],
  },
};

// Output types
export const schemaResponsesOutput = {
  $id: "http://ai.cloudflare.com/schemas/responsesOutput",
  ResponseOutputItem: {
    anyOf: [
      {
        $ref: "responsesMessages#/ResponseOutputMessage",
      },
      {
        $ref: "responsesToolCalls#/ResponseFunctionToolCall",
      },
      {
        $ref: "responsesReasoning#/ResponseReasoningItem",
      },
    ],
  },
};
