// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Vendored from cloudflare/ai/sdk@staging:apps/worker-constellation-entry/src/ai/tasks/schemas/chat-completions.ts

// ============================================================================
// Chat Completions Schema (OpenAI-compatible)
//
// Key conversions applied:
//   - type: ["string", "null"] -> anyOf: [{ type: "string" }, { type: "null" }]
//   - const: "value" -> { type: "string", enum: ["value"] } (Cabidela const workaround)
//   - format: "uri" -> dropped (not supported by Cabidela)
//   - deprecated: true -> dropped (informational only)
//   - additionalProperties: false -> dropped (SDK convention: permissive)
//   - $ref: "#/$defs/Foo" -> $ref: "chatCompletionsBlockName#/Foo"
// ============================================================================

// ---- Content Parts ----
export const schemaChatCompletionsContentParts = {
  $id: "http://ai.cloudflare.com/schemas/chatCompletionsContentParts",

  ChatCompletionContentPartText: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["text"] },
      text: { type: "string" },
    },
    required: ["type", "text"],
  },

  ChatCompletionContentPartImage: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["image_url"] },
      image_url: {
        type: "object",
        properties: {
          url: { type: "string" },
          detail: {
            type: "string",
            enum: ["auto", "low", "high"],
            default: "auto",
          },
        },
        required: ["url"],
      },
    },
    required: ["type", "image_url"],
  },

  ChatCompletionContentPartInputAudio: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["input_audio"] },
      input_audio: {
        type: "object",
        properties: {
          data: {
            type: "string",
            description: "Base64 encoded audio data.",
          },
          format: { type: "string", enum: ["wav", "mp3"] },
        },
        required: ["data", "format"],
      },
    },
    required: ["type", "input_audio"],
  },

  ChatCompletionContentPartFile: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["file"] },
      file: {
        type: "object",
        properties: {
          file_data: {
            type: "string",
            description: "Base64 encoded file data.",
          },
          file_id: {
            type: "string",
            description: "The ID of an uploaded file.",
          },
          filename: { type: "string" },
        },
      },
    },
    required: ["type", "file"],
  },

  ChatCompletionContentPartRefusal: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["refusal"] },
      refusal: { type: "string" },
    },
    required: ["type", "refusal"],
  },

  ChatCompletionContentPart: {
    description: "A content part in a user message (text, image, audio, or file).",
    anyOf: [
      { $ref: "chatCompletionsContentParts#/ChatCompletionContentPartText" },
      { $ref: "chatCompletionsContentParts#/ChatCompletionContentPartImage" },
      { $ref: "chatCompletionsContentParts#/ChatCompletionContentPartInputAudio" },
      { $ref: "chatCompletionsContentParts#/ChatCompletionContentPartFile" },
    ],
  },
};

// ---- Tools ----
export const schemaChatCompletionsTools = {
  $id: "http://ai.cloudflare.com/schemas/chatCompletionsTools",

  FunctionDefinition: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the function to be called.",
      },
      description: {
        type: "string",
        description: "A description of what the function does.",
      },
      parameters: {
        type: "object",
        description: "The parameters the function accepts, described as a JSON Schema object.",
      },
      strict: {
        anyOf: [{ type: "boolean" }, { type: "null" }],
        default: false,
        description: "Whether to enable strict schema adherence.",
      },
    },
    required: ["name"],
  },

  ChatCompletionFunctionTool: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["function"] },
      function: {
        $ref: "chatCompletionsTools#/FunctionDefinition",
      },
    },
    required: ["type", "function"],
  },

  ChatCompletionCustomTool: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["custom"] },
      custom: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          format: {
            oneOf: [
              {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["text"] },
                },
                required: ["type"],
              },
              {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["grammar"] },
                  grammar: {
                    type: "object",
                    properties: {
                      definition: { type: "string" },
                      syntax: {
                        type: "string",
                        enum: ["lark", "regex"],
                      },
                    },
                    required: ["definition", "syntax"],
                  },
                },
                required: ["type", "grammar"],
              },
            ],
          },
        },
        required: ["name"],
      },
    },
    required: ["type", "custom"],
  },

  ChatCompletionTool: {
    oneOf: [
      { $ref: "chatCompletionsTools#/ChatCompletionFunctionTool" },
      { $ref: "chatCompletionsTools#/ChatCompletionCustomTool" },
    ],
  },

  ChatCompletionMessageFunctionToolCall: {
    type: "object",
    properties: {
      id: { type: "string" },
      type: { type: "string", enum: ["function"] },
      function: {
        type: "object",
        properties: {
          name: { type: "string" },
          arguments: {
            type: "string",
            description: "JSON-encoded arguments string.",
          },
        },
        required: ["name", "arguments"],
      },
    },
    required: ["id", "type", "function"],
  },

  ChatCompletionMessageCustomToolCall: {
    type: "object",
    properties: {
      id: { type: "string" },
      type: { type: "string", enum: ["custom"] },
      custom: {
        type: "object",
        properties: {
          name: { type: "string" },
          input: { type: "string" },
        },
        required: ["name", "input"],
      },
    },
    required: ["id", "type", "custom"],
  },

  ChatCompletionMessageToolCall: {
    oneOf: [
      {
        $ref: "chatCompletionsTools#/ChatCompletionMessageFunctionToolCall",
      },
      {
        $ref: "chatCompletionsTools#/ChatCompletionMessageCustomToolCall",
      },
    ],
  },

  ChatCompletionToolChoiceOption: {
    description:
      "Controls which (if any) tool is called by the model. 'none' = no tools, 'auto' = model decides, 'required' = must call a tool.",
    oneOf: [
      {
        type: "string",
        enum: ["none", "auto", "required"],
      },
      {
        type: "object",
        description: "Force a specific function tool.",
        properties: {
          type: { type: "string", enum: ["function"] },
          function: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
        required: ["type", "function"],
      },
      {
        type: "object",
        description: "Force a specific custom tool.",
        properties: {
          type: { type: "string", enum: ["custom"] },
          custom: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
        required: ["type", "custom"],
      },
      {
        type: "object",
        description: "Constrain to an allowed subset of tools.",
        properties: {
          type: { type: "string", enum: ["allowed_tools"] },
          allowed_tools: {
            type: "object",
            properties: {
              mode: {
                type: "string",
                enum: ["auto", "required"],
              },
              tools: {
                type: "array",
                items: { type: "object" },
              },
            },
            required: ["mode", "tools"],
          },
        },
        required: ["type", "allowed_tools"],
      },
    ],
  },
};

// ---- Messages ----
export const schemaChatCompletionsMessages = {
  $id: "http://ai.cloudflare.com/schemas/chatCompletionsMessages",

  DeveloperMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["developer"] },
      content: {
        anyOf: [
          { type: "string" },
          {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: { type: "string" },
              },
              required: ["type", "text"],
            },
          },
        ],
      },
      name: { type: "string" },
    },
    required: ["role", "content"],
  },

  SystemMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["system"] },
      content: {
        anyOf: [
          { type: "string" },
          {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: { type: "string" },
              },
              required: ["type", "text"],
            },
          },
        ],
      },
      name: { type: "string" },
    },
    required: ["role", "content"],
  },

  UserMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["user"] },
      content: {
        // Uses anyOf instead of oneOf because Cabidela's oneOf counts
        // array item matches (not branch matches), so an array with 2+
        // items would report "2 matches" and fail oneOf's exactly-1 check.
        anyOf: [
          { type: "string" },
          {
            type: "array",
            // Content part items use a permissive merged schema because
            // Cabidela has a limitation where anyOf/oneOf with enum-based
            // discrimination inside nested array items does not correctly
            // match different branches for different array elements.
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["text", "image_url", "input_audio", "file"],
                },
                text: { type: "string" },
                image_url: {
                  type: "object",
                  properties: {
                    url: { type: "string" },
                    detail: {
                      type: "string",
                      enum: ["auto", "low", "high"],
                      default: "auto",
                    },
                  },
                },
                input_audio: {
                  type: "object",
                  properties: {
                    data: { type: "string" },
                    format: { type: "string", enum: ["wav", "mp3"] },
                  },
                },
                file: {
                  type: "object",
                  properties: {
                    file_data: { type: "string" },
                    file_id: { type: "string" },
                    filename: { type: "string" },
                  },
                },
              },
              required: ["type"],
            },
            minItems: 1,
          },
        ],
      },
      name: { type: "string" },
    },
    required: ["role", "content"],
  },

  AssistantMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["assistant"] },
      content: {
        anyOf: [
          { type: "string" },
          { type: "null" },
          {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["text", "refusal"],
                },
                text: { type: "string" },
                refusal: { type: "string" },
              },
              required: ["type"],
            },
          },
        ],
      },
      refusal: {
        anyOf: [{ type: "string" }, { type: "null" }],
      },
      name: { type: "string" },
      audio: {
        anyOf: [
          {
            type: "object",
            properties: { id: { type: "string" } },
            required: ["id"],
          },
        ],
      },
      tool_calls: {
        type: "array",
        items: {
          $ref: "chatCompletionsTools#/ChatCompletionMessageToolCall",
        },
      },
      function_call: {
        anyOf: [
          {
            type: "object",
            properties: {
              name: { type: "string" },
              arguments: { type: "string" },
            },
            required: ["name", "arguments"],
          },
        ],
      },
    },
    required: ["role"],
  },

  ToolMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["tool"] },
      content: {
        anyOf: [
          { type: "string" },
          {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: { type: "string" },
              },
              required: ["type", "text"],
            },
          },
        ],
      },
      tool_call_id: { type: "string" },
    },
    required: ["role", "content", "tool_call_id"],
  },

  FunctionMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["function"] },
      content: { type: "string" },
      name: { type: "string" },
    },
    required: ["role", "content", "name"],
  },

  ChatCompletionMessageParam: {
    oneOf: [
      { $ref: "chatCompletionsMessages#/DeveloperMessage" },
      { $ref: "chatCompletionsMessages#/SystemMessage" },
      { $ref: "chatCompletionsMessages#/UserMessage" },
      { $ref: "chatCompletionsMessages#/AssistantMessage" },
      { $ref: "chatCompletionsMessages#/ToolMessage" },
      { $ref: "chatCompletionsMessages#/FunctionMessage" },
    ],
  },
};

// ---- Request Options ----
export const schemaChatCompletionsOptions = {
  $id: "http://ai.cloudflare.com/schemas/chatCompletionsOptions",

  ResponseFormat: {
    description: "Specifies the format the model must output.",
    oneOf: [
      {
        type: "object",
        properties: { type: { type: "string", enum: ["text"] } },
        required: ["type"],
      },
      {
        type: "object",
        properties: { type: { type: "string", enum: ["json_object"] } },
        required: ["type"],
      },
      {
        type: "object",
        properties: {
          type: { type: "string", enum: ["json_schema"] },
          json_schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              schema: { type: "object" },
              strict: {
                anyOf: [{ type: "boolean" }, { type: "null" }],
              },
            },
            required: ["name"],
          },
        },
        required: ["type", "json_schema"],
      },
    ],
  },

  StreamOptions: {
    type: "object",
    properties: {
      include_usage: { type: "boolean" },
      include_obfuscation: { type: "boolean" },
    },
  },

  PredictionContent: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["content"] },
      content: {
        anyOf: [
          { type: "string" },
          {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", enum: ["text"] },
                text: { type: "string" },
              },
              required: ["type", "text"],
            },
          },
        ],
      },
    },
    required: ["type", "content"],
  },

  AudioParams: {
    type: "object",
    description: "Parameters for audio output. Required when modalities includes 'audio'.",
    properties: {
      voice: {
        oneOf: [
          { type: "string" },
          {
            type: "object",
            properties: { id: { type: "string" } },
            required: ["id"],
          },
        ],
      },
      format: {
        type: "string",
        enum: ["wav", "aac", "mp3", "flac", "opus", "pcm16"],
      },
    },
    required: ["voice", "format"],
  },

  WebSearchOptions: {
    type: "object",
    description: "Options for the web search tool (when using built-in web search).",
    properties: {
      search_context_size: {
        type: "string",
        enum: ["low", "medium", "high"],
        default: "medium",
      },
      user_location: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["approximate"] },
          approximate: {
            type: "object",
            properties: {
              city: { type: "string" },
              country: { type: "string" },
              region: { type: "string" },
              timezone: { type: "string" },
            },
          },
        },
        required: ["type", "approximate"],
      },
    },
  },

  // Shared optional properties used by both Prompt and Messages input branches
  // (merged via $merge into each oneOf branch of schemaChatCompletions.input)
  common: {
    model: {
      type: "string",
      description: "ID of the model to use (e.g. '@cf/zai-org/glm-4.7-flash, etc').",
    },
    audio: {
      anyOf: [{ $ref: "chatCompletionsOptions#/AudioParams" }],
    },
    frequency_penalty: {
      anyOf: [{ type: "number", minimum: -2, maximum: 2 }, { type: "null" }],
      default: 0,
      description: "Penalizes new tokens based on their existing frequency in the text so far.",
    },
    logit_bias: {
      anyOf: [{ type: "object" }, { type: "null" }],
      description:
        "Modify the likelihood of specified tokens appearing in the completion. Maps token IDs to bias values from -100 to 100.",
    },
    logprobs: {
      anyOf: [{ type: "boolean" }, { type: "null" }],
      default: false,
      description: "Whether to return log probabilities of the output tokens.",
    },
    top_logprobs: {
      anyOf: [{ type: "integer", minimum: 0, maximum: 20 }, { type: "null" }],
      description: "How many top log probabilities to return at each token position (0-20). Requires logprobs=true.",
    },
    max_tokens: {
      anyOf: [{ type: "integer" }, { type: "null" }],
      description: "Deprecated in favor of max_completion_tokens. The maximum number of tokens to generate.",
    },
    max_completion_tokens: {
      anyOf: [{ type: "integer" }, { type: "null" }],
      description: "An upper bound for the number of tokens that can be generated for a completion.",
    },
    metadata: {
      anyOf: [{ type: "object" }, { type: "null" }],
      description: "Set of 16 key-value pairs that can be attached to the object.",
    },
    modalities: {
      anyOf: [
        {
          type: "array",
          items: {
            type: "string",
            enum: ["text", "audio"],
          },
        },
        { type: "null" },
      ],
      description: "Output types requested from the model (e.g. ['text'] or ['text', 'audio']).",
    },
    n: {
      anyOf: [{ type: "integer", minimum: 1, maximum: 128 }, { type: "null" }],
      default: 1,
      description: "How many chat completion choices to generate for each input message.",
    },
    parallel_tool_calls: {
      type: "boolean",
      default: true,
      description: "Whether to enable parallel function calling during tool use.",
    },
    prediction: {
      anyOf: [{ $ref: "chatCompletionsOptions#/PredictionContent" }],
    },
    presence_penalty: {
      anyOf: [{ type: "number", minimum: -2, maximum: 2 }, { type: "null" }],
      default: 0,
      description: "Penalizes new tokens based on whether they appear in the text so far.",
    },
    reasoning_effort: {
      anyOf: [
        {
          type: "string",
          enum: ["low", "medium", "high"],
        },
        { type: "null" },
      ],
      description: "Constrains effort on reasoning for reasoning models (o1, o3-mini, etc.).",
    },
    chat_template_kwargs: {
      type: "object",
      properties: {
        enable_thinking: {
          type: "boolean",
          default: true,
          description: "Whether to enable reasoning, enabled by default.",
        },
        clear_thinking: {
          type: "boolean",
          default: false,
          description: "If false, preserves reasoning context between turns.",
        },
      },
    },
    response_format: {
      anyOf: [{ $ref: "chatCompletionsOptions#/ResponseFormat" }],
    },
    seed: {
      anyOf: [{ type: "integer" }, { type: "null" }],
      description: "If specified, the system will make a best effort to sample deterministically.",
    },
    service_tier: {
      anyOf: [
        {
          type: "string",
          enum: ["auto", "default", "flex", "scale", "priority"],
        },
        { type: "null" },
      ],
      default: "auto",
      description: "Specifies the processing type used for serving the request.",
    },
    stop: {
      description: "Up to 4 sequences where the API will stop generating further tokens.",
      anyOf: [
        { type: "null" },
        { type: "string" },
        {
          type: "array",
          items: { type: "string" },
          minItems: 1,
          maxItems: 4,
        },
      ],
    },
    store: {
      anyOf: [{ type: "boolean" }, { type: "null" }],
      default: false,
      description: "Whether to store the output for model distillation / evals.",
    },
    stream: {
      anyOf: [{ type: "boolean" }, { type: "null" }],
      default: false,
      description: "If true, partial message deltas will be sent as server-sent events.",
    },
    stream_options: {
      anyOf: [{ $ref: "chatCompletionsOptions#/StreamOptions" }],
    },
    temperature: {
      anyOf: [{ type: "number", minimum: 0, maximum: 2 }, { type: "null" }],
      default: 1,
      description: "Sampling temperature between 0 and 2.",
    },
    tool_choice: {
      anyOf: [{ $ref: "chatCompletionsTools#/ChatCompletionToolChoiceOption" }],
    },
    tools: {
      type: "array",
      description: "A list of tools the model may call.",
      items: {
        $ref: "chatCompletionsTools#/ChatCompletionTool",
      },
    },
    top_p: {
      anyOf: [{ type: "number", minimum: 0, maximum: 1 }, { type: "null" }],
      default: 1,
      description: "Nucleus sampling: considers the results of the tokens with top_p probability mass.",
    },
    user: {
      type: "string",
      description: "A unique identifier representing your end-user, for abuse monitoring.",
    },
    web_search_options: {
      anyOf: [{ $ref: "chatCompletionsOptions#/WebSearchOptions" }],
    },
    function_call: {
      anyOf: [
        { type: "string", enum: ["none", "auto"] },
        {
          type: "object",
          properties: { name: { type: "string" } },
          required: ["name"],
        },
      ],
    },
    functions: {
      type: "array",
      items: {
        $ref: "chatCompletionsTools#/FunctionDefinition",
      },
      minItems: 1,
      maxItems: 128,
    },
  },
};

// ---- Response Types ----
export const schemaChatCompletionsResponse = {
  $id: "http://ai.cloudflare.com/schemas/chatCompletionsResponse",

  CompletionUsage: {
    type: "object",
    properties: {
      prompt_tokens: { type: "integer" },
      completion_tokens: { type: "integer" },
      total_tokens: { type: "integer" },
      prompt_tokens_details: {
        type: "object",
        properties: {
          cached_tokens: { type: "integer" },
          audio_tokens: { type: "integer" },
        },
      },
      completion_tokens_details: {
        type: "object",
        properties: {
          reasoning_tokens: { type: "integer" },
          audio_tokens: { type: "integer" },
          accepted_prediction_tokens: { type: "integer" },
          rejected_prediction_tokens: { type: "integer" },
        },
      },
    },
    required: ["prompt_tokens", "completion_tokens", "total_tokens"],
  },

  ChatCompletionTokenLogprob: {
    type: "object",
    properties: {
      token: { type: "string" },
      logprob: { type: "number" },
      bytes: {
        anyOf: [{ type: "array", items: { type: "integer" } }, { type: "null" }],
      },
      top_logprobs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            token: { type: "string" },
            logprob: { type: "number" },
            bytes: {
              anyOf: [
                {
                  type: "array",
                  items: { type: "integer" },
                },
                { type: "null" },
              ],
            },
          },
          required: ["token", "logprob", "bytes"],
        },
      },
    },
    required: ["token", "logprob", "bytes", "top_logprobs"],
  },

  ChatCompletionAudio: {
    type: "object",
    properties: {
      id: { type: "string" },
      data: {
        type: "string",
        description: "Base64 encoded audio bytes.",
      },
      expires_at: { type: "integer" },
      transcript: { type: "string" },
    },
    required: ["id", "data", "expires_at", "transcript"],
  },

  ChatCompletionResponseMessage: {
    type: "object",
    properties: {
      role: { type: "string", enum: ["assistant"] },
      content: {
        anyOf: [{ type: "string" }, { type: "null" }],
      },
      refusal: {
        anyOf: [{ type: "string" }, { type: "null" }],
      },
      annotations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["url_citation"] },
            url_citation: {
              type: "object",
              properties: {
                url: { type: "string" },
                title: { type: "string" },
                start_index: { type: "integer" },
                end_index: { type: "integer" },
              },
              required: ["url", "title", "start_index", "end_index"],
            },
          },
          required: ["type", "url_citation"],
        },
      },
      audio: {
        anyOf: [{ $ref: "chatCompletionsResponse#/ChatCompletionAudio" }],
      },
      tool_calls: {
        type: "array",
        items: {
          $ref: "chatCompletionsTools#/ChatCompletionMessageToolCall",
        },
      },
      function_call: {
        anyOf: [
          {
            type: "object",
            properties: {
              name: { type: "string" },
              arguments: { type: "string" },
            },
            required: ["name", "arguments"],
          },
          { type: "null" },
        ],
      },
    },
    required: ["role", "content", "refusal"],
  },

  ChatCompletionChoice: {
    type: "object",
    properties: {
      index: { type: "integer" },
      message: {
        anyOf: [{ $ref: "chatCompletionsResponse#/ChatCompletionResponseMessage" }],
      },
      finish_reason: {
        type: "string",
        enum: ["stop", "length", "tool_calls", "content_filter", "function_call"],
      },
      logprobs: {
        anyOf: [
          {
            type: "object",
            properties: {
              content: {
                anyOf: [
                  {
                    type: "array",
                    items: {
                      $ref: "chatCompletionsResponse#/ChatCompletionTokenLogprob",
                    },
                  },
                  { type: "null" },
                ],
              },
              refusal: {
                anyOf: [
                  {
                    type: "array",
                    items: {
                      $ref: "chatCompletionsResponse#/ChatCompletionTokenLogprob",
                    },
                  },
                  { type: "null" },
                ],
              },
            },
          },
          { type: "null" },
        ],
      },
    },
    required: ["index", "message", "finish_reason", "logprobs"],
  },
};

// ---- Main Chat Completions Schema ----
export const schemaChatCompletions = {
  $id: "http://ai.cloudflare.com/schemas/chatCompletions",

  input: {
    type: "object",
    oneOf: [
      {
        title: "Prompt",
        properties: {
          $merge: {
            source: {
              prompt: {
                type: "string",
                minLength: 1,
                description: "The input text prompt for the model to generate a response.",
              },
            },
            with: {
              $ref: "chatCompletionsOptions#/common",
            },
          },
        },
        required: ["prompt"],
      },
      {
        title: "Messages",
        properties: {
          $merge: {
            source: {
              messages: {
                type: "array",
                description: "A list of messages comprising the conversation so far.",
                items: {
                  $ref: "chatCompletionsMessages#/ChatCompletionMessageParam",
                },
                minItems: 1,
              },
            },
            with: {
              $ref: "chatCompletionsOptions#/common",
            },
          },
        },
        required: ["messages"],
      },
    ],
  },

  output: {
    oneOf: [
      {
        type: "object",
        contentType: "application/json",
        properties: {
          id: {
            type: "string",
            description: "A unique identifier for the chat completion.",
          },
          object: { type: "string" },
          created: {
            type: "integer",
            description: "Unix timestamp (seconds) of when the completion was created.",
          },
          model: {
            type: "string",
            description: "The model used for the chat completion.",
          },
          choices: {
            type: "array",
            items: {
              anyOf: [{ $ref: "chatCompletionsResponse#/ChatCompletionChoice" }],
            },
            minItems: 1,
          },
          usage: {
            anyOf: [{ $ref: "chatCompletionsResponse#/CompletionUsage" }],
          },
          system_fingerprint: {
            anyOf: [{ type: "string" }, { type: "null" }],
          },
          service_tier: {
            anyOf: [
              {
                type: "string",
                enum: ["auto", "default", "flex", "scale", "priority"],
              },
              { type: "null" },
            ],
          },
        },
        required: ["id", "object", "created", "model", "choices"],
      },
      {
        type: "string",
        contentType: "text/event-stream",
        format: "binary",
      },
    ],
  },
};
