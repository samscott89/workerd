export type AiImageClassificationInput = {
  image: number[];
};
export type AiImageClassificationOutput = {
  score?: number;
  label?: string;
}[];
export declare abstract class BaseAiImageClassification {
  inputs: AiImageClassificationInput;
  postProcessedOutputs: AiImageClassificationOutput;
}
export type AiImageToTextInput = {
  image: number[];
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  raw?: boolean;
  messages?: RoleScopedChatInput[];
};
export type AiImageToTextOutput = {
  description: string;
};
export declare abstract class BaseAiImageToText {
  inputs: AiImageToTextInput;
  postProcessedOutputs: AiImageToTextOutput;
}
export type AiImageTextToTextInput = {
  image: string;
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  ignore_eos?: boolean;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  raw?: boolean;
  messages?: RoleScopedChatInput[];
};
export type AiImageTextToTextOutput = {
  description: string;
};
export declare abstract class BaseAiImageTextToText {
  inputs: AiImageTextToTextInput;
  postProcessedOutputs: AiImageTextToTextOutput;
}
export type AiMultimodalEmbeddingsInput = {
  image: string;
  text: string[];
};
export type AiIMultimodalEmbeddingsOutput = {
  data: number[][];
  shape: number[];
};
export declare abstract class BaseAiMultimodalEmbeddings {
  inputs: AiImageTextToTextInput;
  postProcessedOutputs: AiImageTextToTextOutput;
}
export type AiObjectDetectionInput = {
  image: number[];
};
export type AiObjectDetectionOutput = {
  score?: number;
  label?: string;
}[];
export declare abstract class BaseAiObjectDetection {
  inputs: AiObjectDetectionInput;
  postProcessedOutputs: AiObjectDetectionOutput;
}
export type AiSentenceSimilarityInput = {
  source: string;
  sentences: string[];
};
export type AiSentenceSimilarityOutput = number[];
export declare abstract class BaseAiSentenceSimilarity {
  inputs: AiSentenceSimilarityInput;
  postProcessedOutputs: AiSentenceSimilarityOutput;
}
export type AiAutomaticSpeechRecognitionInput = {
  audio: number[];
};
export type AiAutomaticSpeechRecognitionOutput = {
  text?: string;
  words?: {
    word: string;
    start: number;
    end: number;
  }[];
  vtt?: string;
};
export declare abstract class BaseAiAutomaticSpeechRecognition {
  inputs: AiAutomaticSpeechRecognitionInput;
  postProcessedOutputs: AiAutomaticSpeechRecognitionOutput;
}
export type AiSummarizationInput = {
  input_text: string;
  max_length?: number;
};
export type AiSummarizationOutput = {
  summary: string;
};
export declare abstract class BaseAiSummarization {
  inputs: AiSummarizationInput;
  postProcessedOutputs: AiSummarizationOutput;
}
export type AiTextClassificationInput = {
  text: string;
};
export type AiTextClassificationOutput = {
  score?: number;
  label?: string;
}[];
export declare abstract class BaseAiTextClassification {
  inputs: AiTextClassificationInput;
  postProcessedOutputs: AiTextClassificationOutput;
}
export declare abstract class BaseAiTextEmbeddings {
  inputs: AiTextEmbeddingsInput;
  postProcessedOutputs: AiTextEmbeddingsOutput;
}
export type RoleScopedChatInput = {
  role:
    | 'user'
    | 'assistant'
    | 'system'
    | 'tool'
    | (string & NonNullable<unknown>);
  content: string;
  name?: string;
};
export type AiTextGenerationToolLegacyInput = {
  name: string;
  description: string;
  parameters?: {
    type: 'object' | (string & NonNullable<unknown>);
    properties: {
      [key: string]: {
        type: string;
        description?: string;
      };
    };
    required: string[];
  };
};
export type AiTextGenerationToolInput = {
  type: 'function' | (string & NonNullable<unknown>);
  function: {
    name: string;
    description: string;
    parameters?: {
      type: 'object' | (string & NonNullable<unknown>);
      properties: {
        [key: string]: {
          type: string;
          description?: string;
        };
      };
      required: string[];
    };
  };
};
export type AiTextGenerationFunctionsInput = {
  name: string;
  code: string;
};
export type AiTextGenerationResponseFormat = {
  type: string;
  json_schema?: any;
};
export type AiTextGenerationToolLegacyOutput = {
  name: string;
  arguments: unknown;
};
export type AiTextGenerationToolOutput = {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};
export type UsageTags = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
export declare abstract class BaseAiTextGeneration {
  inputs: AiTextGenerationInput;
  postProcessedOutputs: AiTextGenerationOutput;
}
export type AiTextToSpeechInput = {
  prompt: string;
  lang?: string;
};
export type AiTextToSpeechOutput =
  | Uint8Array
  | {
      audio: string;
    };
export declare abstract class BaseAiTextToSpeech {
  inputs: AiTextToSpeechInput;
  postProcessedOutputs: AiTextToSpeechOutput;
}
export type AiTextToImageInput = {
  prompt: string;
  negative_prompt?: string;
  height?: number;
  width?: number;
  image?: number[];
  image_b64?: string;
  mask?: number[];
  num_steps?: number;
  strength?: number;
  guidance?: number;
  seed?: number;
};
export type AiTextToImageOutput = ReadableStream<Uint8Array>;
export declare abstract class BaseAiTextToImage {
  inputs: AiTextToImageInput;
  postProcessedOutputs: AiTextToImageOutput;
}
export type AiTranslationInput = {
  text: string;
  target_lang: string;
  source_lang?: string;
};
export type AiTranslationOutput = {
  translated_text?: string;
};
export declare abstract class BaseAiTranslation {
  inputs: AiTranslationInput;
  postProcessedOutputs: AiTranslationOutput;
}
/**
 * Workers AI support for OpenAI's Chat Completions API
 */
export type ChatCompletionContentPartText = {
  type: 'text';
  text: string;
};
export type ChatCompletionContentPartImage = {
  type: 'image_url';
  image_url: {
    url: string;
    detail?: 'auto' | 'low' | 'high';
  };
};
export type ChatCompletionContentPartInputAudio = {
  type: 'input_audio';
  input_audio: {
    /** Base64 encoded audio data. */
    data: string;
    format: 'wav' | 'mp3';
  };
};
export type ChatCompletionContentPartFile = {
  type: 'file';
  file: {
    /** Base64 encoded file data. */
    file_data?: string;
    /** The ID of an uploaded file. */
    file_id?: string;
    filename?: string;
  };
};
export type ChatCompletionContentPartRefusal = {
  type: 'refusal';
  refusal: string;
};
export type ChatCompletionContentPart =
  | ChatCompletionContentPartText
  | ChatCompletionContentPartImage
  | ChatCompletionContentPartInputAudio
  | ChatCompletionContentPartFile;
export type FunctionDefinition = {
  name: string;
  description?: string;
  parameters?: Record<string, unknown>;
  strict?: boolean | null;
};
export type ChatCompletionFunctionTool = {
  type: 'function';
  function: FunctionDefinition;
};
export type ChatCompletionCustomToolGrammarFormat = {
  type: 'grammar';
  grammar: {
    definition: string;
    syntax: 'lark' | 'regex';
  };
};
export type ChatCompletionCustomToolTextFormat = {
  type: 'text';
};
export type ChatCompletionCustomToolFormat =
  | ChatCompletionCustomToolTextFormat
  | ChatCompletionCustomToolGrammarFormat;
export type ChatCompletionCustomTool = {
  type: 'custom';
  custom: {
    name: string;
    description?: string;
    format?: ChatCompletionCustomToolFormat;
  };
};
export type ChatCompletionTool =
  | ChatCompletionFunctionTool
  | ChatCompletionCustomTool;
export type ChatCompletionMessageFunctionToolCall = {
  id: string;
  type: 'function';
  function: {
    name: string;
    /** JSON-encoded arguments string. */
    arguments: string;
  };
};
export type ChatCompletionMessageCustomToolCall = {
  id: string;
  type: 'custom';
  custom: {
    name: string;
    input: string;
  };
};
export type ChatCompletionMessageToolCall =
  | ChatCompletionMessageFunctionToolCall
  | ChatCompletionMessageCustomToolCall;
export type ChatCompletionToolChoiceFunction = {
  type: 'function';
  function: {
    name: string;
  };
};
export type ChatCompletionToolChoiceCustom = {
  type: 'custom';
  custom: {
    name: string;
  };
};
export type ChatCompletionToolChoiceAllowedTools = {
  type: 'allowed_tools';
  allowed_tools: {
    mode: 'auto' | 'required';
    tools: Array<Record<string, unknown>>;
  };
};
export type ChatCompletionToolChoiceOption =
  | 'none'
  | 'auto'
  | 'required'
  | ChatCompletionToolChoiceFunction
  | ChatCompletionToolChoiceCustom
  | ChatCompletionToolChoiceAllowedTools;
export type DeveloperMessage = {
  role: 'developer';
  content:
    | string
    | Array<{
        type: 'text';
        text: string;
      }>;
  name?: string;
};
export type SystemMessage = {
  role: 'system';
  content:
    | string
    | Array<{
        type: 'text';
        text: string;
      }>;
  name?: string;
};
/**
 * Permissive merged content part used inside UserMessage arrays.
 *
 * Cabidela has a limitation where anyOf/oneOf with enum-based discrimination
 * inside nested array items does not correctly match different branches for
 * different array elements, so the schema uses a single merged object.
 */
export type UserMessageContentPart = {
  type: 'text' | 'image_url' | 'input_audio' | 'file';
  text?: string;
  image_url?: {
    url?: string;
    detail?: 'auto' | 'low' | 'high';
  };
  input_audio?: {
    data?: string;
    format?: 'wav' | 'mp3';
  };
  file?: {
    file_data?: string;
    file_id?: string;
    filename?: string;
  };
};
export type UserMessage = {
  role: 'user';
  content: string | Array<UserMessageContentPart>;
  name?: string;
};
export type AssistantMessageContentPart = {
  type: 'text' | 'refusal';
  text?: string;
  refusal?: string;
};
export type AssistantMessage = {
  role: 'assistant';
  content?: string | null | Array<AssistantMessageContentPart>;
  refusal?: string | null;
  name?: string;
  audio?: {
    id: string;
  };
  tool_calls?: Array<ChatCompletionMessageToolCall>;
  function_call?: {
    name: string;
    arguments: string;
  };
};
export type ToolMessage = {
  role: 'tool';
  content:
    | string
    | Array<{
        type: 'text';
        text: string;
      }>;
  tool_call_id: string;
};
export type FunctionMessage = {
  role: 'function';
  content: string;
  name: string;
};
export type ChatCompletionMessageParam =
  | DeveloperMessage
  | SystemMessage
  | UserMessage
  | AssistantMessage
  | ToolMessage
  | FunctionMessage;
export type ChatCompletionsResponseFormatText = {
  type: 'text';
};
export type ChatCompletionsResponseFormatJSONObject = {
  type: 'json_object';
};
export type ResponseFormatJSONSchema = {
  type: 'json_schema';
  json_schema: {
    name: string;
    description?: string;
    schema?: Record<string, unknown>;
    strict?: boolean | null;
  };
};
export type ResponseFormat =
  | ChatCompletionsResponseFormatText
  | ChatCompletionsResponseFormatJSONObject
  | ResponseFormatJSONSchema;
export type ChatCompletionsStreamOptions = {
  include_usage?: boolean;
  include_obfuscation?: boolean;
};
export type PredictionContent = {
  type: 'content';
  content:
    | string
    | Array<{
        type: 'text';
        text: string;
      }>;
};
export type AudioParams = {
  voice:
    | string
    | {
        id: string;
      };
  format: 'wav' | 'aac' | 'mp3' | 'flac' | 'opus' | 'pcm16';
};
export type WebSearchUserLocation = {
  type: 'approximate';
  approximate: {
    city?: string;
    country?: string;
    region?: string;
    timezone?: string;
  };
};
export type WebSearchOptions = {
  search_context_size?: 'low' | 'medium' | 'high';
  user_location?: WebSearchUserLocation;
};
export type ChatTemplateKwargs = {
  /** Whether to enable reasoning, enabled by default. */
  enable_thinking?: boolean;
  /** If false, preserves reasoning context between turns. */
  clear_thinking?: boolean;
};
/** Shared optional properties used by both Prompt and Messages input branches. */
export type ChatCompletionsCommonOptions = {
  model?: string;
  audio?: AudioParams;
  frequency_penalty?: number | null;
  logit_bias?: Record<string, unknown> | null;
  logprobs?: boolean | null;
  top_logprobs?: number | null;
  max_tokens?: number | null;
  max_completion_tokens?: number | null;
  metadata?: Record<string, unknown> | null;
  modalities?: Array<'text' | 'audio'> | null;
  n?: number | null;
  parallel_tool_calls?: boolean;
  prediction?: PredictionContent;
  presence_penalty?: number | null;
  reasoning_effort?: 'low' | 'medium' | 'high' | null;
  chat_template_kwargs?: ChatTemplateKwargs;
  response_format?: ResponseFormat;
  seed?: number | null;
  service_tier?: 'auto' | 'default' | 'flex' | 'scale' | 'priority' | null;
  stop?: string | Array<string> | null;
  store?: boolean | null;
  stream?: boolean | null;
  stream_options?: ChatCompletionsStreamOptions;
  temperature?: number | null;
  tool_choice?: ChatCompletionToolChoiceOption;
  tools?: Array<ChatCompletionTool>;
  top_p?: number | null;
  user?: string;
  web_search_options?: WebSearchOptions;
  function_call?:
    | 'none'
    | 'auto'
    | {
        name: string;
      };
  functions?: Array<FunctionDefinition>;
};
export type PromptTokensDetails = {
  cached_tokens?: number;
  audio_tokens?: number;
};
export type CompletionTokensDetails = {
  reasoning_tokens?: number;
  audio_tokens?: number;
  accepted_prediction_tokens?: number;
  rejected_prediction_tokens?: number;
};
export type CompletionUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details?: PromptTokensDetails;
  completion_tokens_details?: CompletionTokensDetails;
};
export type ChatCompletionTopLogprob = {
  token: string;
  logprob: number;
  bytes: Array<number> | null;
};
export type ChatCompletionTokenLogprob = {
  token: string;
  logprob: number;
  bytes: Array<number> | null;
  top_logprobs: Array<ChatCompletionTopLogprob>;
};
export type ChatCompletionAudio = {
  id: string;
  /** Base64 encoded audio bytes. */
  data: string;
  expires_at: number;
  transcript: string;
};
export type ChatCompletionUrlCitation = {
  type: 'url_citation';
  url_citation: {
    url: string;
    title: string;
    start_index: number;
    end_index: number;
  };
};
export type ChatCompletionResponseMessage = {
  role: 'assistant';
  content: string | null;
  refusal: string | null;
  annotations?: Array<ChatCompletionUrlCitation>;
  audio?: ChatCompletionAudio;
  tool_calls?: Array<ChatCompletionMessageToolCall>;
  function_call?: {
    name: string;
    arguments: string;
  } | null;
};
export type ChatCompletionLogprobs = {
  content: Array<ChatCompletionTokenLogprob> | null;
  refusal?: Array<ChatCompletionTokenLogprob> | null;
};
export type ChatCompletionChoice = {
  index: number;
  message: ChatCompletionResponseMessage;
  finish_reason:
    | 'stop'
    | 'length'
    | 'tool_calls'
    | 'content_filter'
    | 'function_call';
  logprobs: ChatCompletionLogprobs | null;
};
export type ChatCompletionsPromptInput = {
  prompt: string;
} & ChatCompletionsCommonOptions;
export type ChatCompletionsMessagesInput = {
  messages: Array<ChatCompletionMessageParam>;
} & ChatCompletionsCommonOptions;
export type ChatCompletionsOutput = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<ChatCompletionChoice>;
  usage?: CompletionUsage;
  system_fingerprint?: string | null;
  service_tier?: 'auto' | 'default' | 'flex' | 'scale' | 'priority' | null;
};
/**
 * Workers AI support for OpenAI's Responses API
 * Reference: https://github.com/openai/openai-node/blob/master/src/resources/responses/responses.ts
 *
 * It's a stripped down version from its source.
 * It currently supports basic function calling, json mode and accepts images as input.
 *
 * It does not include types for WebSearch, CodeInterpreter, FileInputs, MCP, CustomTools.
 * We plan to add those incrementally as model + platform capabilities evolve.
 */
export type ResponsesInput = {
  background?: boolean | null;
  conversation?: string | ResponseConversationParam | null;
  include?: Array<ResponseIncludable> | null;
  input?: string | ResponseInput;
  instructions?: string | null;
  max_output_tokens?: number | null;
  parallel_tool_calls?: boolean | null;
  previous_response_id?: string | null;
  prompt_cache_key?: string;
  reasoning?: Reasoning | null;
  safety_identifier?: string;
  service_tier?: 'auto' | 'default' | 'flex' | 'scale' | 'priority' | null;
  stream?: boolean | null;
  stream_options?: StreamOptions | null;
  temperature?: number | null;
  text?: ResponseTextConfig;
  tool_choice?: ToolChoiceOptions | ToolChoiceFunction;
  tools?: Array<Tool>;
  top_p?: number | null;
  truncation?: 'auto' | 'disabled' | null;
};
export type ResponsesOutput = {
  id?: string;
  created_at?: number;
  output_text?: string;
  error?: ResponseError | null;
  incomplete_details?: ResponseIncompleteDetails | null;
  instructions?: string | Array<ResponseInputItem> | null;
  object?: 'response';
  output?: Array<ResponseOutputItem>;
  parallel_tool_calls?: boolean;
  temperature?: number | null;
  tool_choice?: ToolChoiceOptions | ToolChoiceFunction;
  tools?: Array<Tool>;
  top_p?: number | null;
  max_output_tokens?: number | null;
  previous_response_id?: string | null;
  prompt?: ResponsePrompt | null;
  reasoning?: Reasoning | null;
  safety_identifier?: string;
  service_tier?: 'auto' | 'default' | 'flex' | 'scale' | 'priority' | null;
  status?: ResponseStatus;
  text?: ResponseTextConfig;
  truncation?: 'auto' | 'disabled' | null;
  usage?: ResponseUsage;
};
export type EasyInputMessage = {
  content: string | ResponseInputMessageContentList;
  role: 'user' | 'assistant' | 'system' | 'developer';
  type?: 'message';
};
export type ResponsesFunctionTool = {
  name: string;
  parameters: {
    [key: string]: unknown;
  } | null;
  strict: boolean | null;
  type: 'function';
  description?: string | null;
};
export type ResponseIncompleteDetails = {
  reason?: 'max_output_tokens' | 'content_filter';
};
export type ResponsePrompt = {
  id: string;
  variables?: {
    [key: string]: string | ResponseInputText | ResponseInputImage;
  } | null;
  version?: string | null;
};
export type Reasoning = {
  effort?: ReasoningEffort | null;
  generate_summary?: 'auto' | 'concise' | 'detailed' | null;
  summary?: 'auto' | 'concise' | 'detailed' | null;
};
export type ResponseContent =
  | ResponseInputText
  | ResponseInputImage
  | ResponseOutputText
  | ResponseOutputRefusal
  | ResponseContentReasoningText;
export type ResponseContentReasoningText = {
  text: string;
  type: 'reasoning_text';
};
export type ResponseConversationParam = {
  id: string;
};
export type ResponseCreatedEvent = {
  response: Response;
  sequence_number: number;
  type: 'response.created';
};
export type ResponseCustomToolCallOutput = {
  call_id: string;
  output: string | Array<ResponseInputText | ResponseInputImage>;
  type: 'custom_tool_call_output';
  id?: string;
};
export type ResponseError = {
  code:
    | 'server_error'
    | 'rate_limit_exceeded'
    | 'invalid_prompt'
    | 'vector_store_timeout'
    | 'invalid_image'
    | 'invalid_image_format'
    | 'invalid_base64_image'
    | 'invalid_image_url'
    | 'image_too_large'
    | 'image_too_small'
    | 'image_parse_error'
    | 'image_content_policy_violation'
    | 'invalid_image_mode'
    | 'image_file_too_large'
    | 'unsupported_image_media_type'
    | 'empty_image_file'
    | 'failed_to_download_image'
    | 'image_file_not_found';
  message: string;
};
export type ResponseErrorEvent = {
  code: string | null;
  message: string;
  param: string | null;
  sequence_number: number;
  type: 'error';
};
export type ResponseFailedEvent = {
  response: Response;
  sequence_number: number;
  type: 'response.failed';
};
export type ResponseFormatText = {
  type: 'text';
};
export type ResponseFormatJSONObject = {
  type: 'json_object';
};
export type ResponseFormatTextConfig =
  | ResponseFormatText
  | ResponseFormatTextJSONSchemaConfig
  | ResponseFormatJSONObject;
export type ResponseFormatTextJSONSchemaConfig = {
  name: string;
  schema: {
    [key: string]: unknown;
  };
  type: 'json_schema';
  description?: string;
  strict?: boolean | null;
};
export type ResponseFunctionCallArgumentsDeltaEvent = {
  delta: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
  type: 'response.function_call_arguments.delta';
};
export type ResponseFunctionCallArgumentsDoneEvent = {
  arguments: string;
  item_id: string;
  name: string;
  output_index: number;
  sequence_number: number;
  type: 'response.function_call_arguments.done';
};
export type ResponseFunctionCallOutputItem =
  | ResponseInputTextContent
  | ResponseInputImageContent;
export type ResponseFunctionCallOutputItemList =
  Array<ResponseFunctionCallOutputItem>;
export type ResponseFunctionToolCall = {
  arguments: string;
  call_id: string;
  name: string;
  type: 'function_call';
  id?: string;
  status?: 'in_progress' | 'completed' | 'incomplete';
};
export interface ResponseFunctionToolCallItem extends ResponseFunctionToolCall {
  id: string;
}
export type ResponseFunctionToolCallOutputItem = {
  id: string;
  call_id: string;
  output: string | Array<ResponseInputText | ResponseInputImage>;
  type: 'function_call_output';
  status?: 'in_progress' | 'completed' | 'incomplete';
};
export type ResponseIncludable =
  | 'message.input_image.image_url'
  | 'message.output_text.logprobs';
export type ResponseIncompleteEvent = {
  response: Response;
  sequence_number: number;
  type: 'response.incomplete';
};
export type ResponseInput = Array<ResponseInputItem>;
export type ResponseInputContent = ResponseInputText | ResponseInputImage;
export type ResponseInputImage = {
  detail: 'low' | 'high' | 'auto';
  type: 'input_image';
  /**
   * Base64 encoded image
   */
  image_url?: string | null;
};
export type ResponseInputImageContent = {
  type: 'input_image';
  detail?: 'low' | 'high' | 'auto' | null;
  /**
   * Base64 encoded image
   */
  image_url?: string | null;
};
export type ResponseInputItem =
  | EasyInputMessage
  | ResponseInputItemMessage
  | ResponseOutputMessage
  | ResponseFunctionToolCall
  | ResponseInputItemFunctionCallOutput
  | ResponseReasoningItem;
export type ResponseInputItemFunctionCallOutput = {
  call_id: string;
  output: string | ResponseFunctionCallOutputItemList;
  type: 'function_call_output';
  id?: string | null;
  status?: 'in_progress' | 'completed' | 'incomplete' | null;
};
export type ResponseInputItemMessage = {
  content: ResponseInputMessageContentList;
  role: 'user' | 'system' | 'developer';
  status?: 'in_progress' | 'completed' | 'incomplete';
  type?: 'message';
};
export type ResponseInputMessageContentList = Array<ResponseInputContent>;
export type ResponseInputMessageItem = {
  id: string;
  content: ResponseInputMessageContentList;
  role: 'user' | 'system' | 'developer';
  status?: 'in_progress' | 'completed' | 'incomplete';
  type?: 'message';
};
export type ResponseInputText = {
  text: string;
  type: 'input_text';
};
export type ResponseInputTextContent = {
  text: string;
  type: 'input_text';
};
export type ResponseItem =
  | ResponseInputMessageItem
  | ResponseOutputMessage
  | ResponseFunctionToolCallItem
  | ResponseFunctionToolCallOutputItem;
export type ResponseOutputItem =
  | ResponseOutputMessage
  | ResponseFunctionToolCall
  | ResponseReasoningItem;
export type ResponseOutputItemAddedEvent = {
  item: ResponseOutputItem;
  output_index: number;
  sequence_number: number;
  type: 'response.output_item.added';
};
export type ResponseOutputItemDoneEvent = {
  item: ResponseOutputItem;
  output_index: number;
  sequence_number: number;
  type: 'response.output_item.done';
};
export type ResponseOutputMessage = {
  id: string;
  content: Array<ResponseOutputText | ResponseOutputRefusal>;
  role: 'assistant';
  status: 'in_progress' | 'completed' | 'incomplete';
  type: 'message';
};
export type ResponseOutputRefusal = {
  refusal: string;
  type: 'refusal';
};
export type ResponseOutputText = {
  text: string;
  type: 'output_text';
  logprobs?: Array<Logprob>;
};
export type ResponseReasoningItem = {
  id: string;
  summary: Array<ResponseReasoningSummaryItem>;
  type: 'reasoning';
  content?: Array<ResponseReasoningContentItem>;
  encrypted_content?: string | null;
  status?: 'in_progress' | 'completed' | 'incomplete';
};
export type ResponseReasoningSummaryItem = {
  text: string;
  type: 'summary_text';
};
export type ResponseReasoningContentItem = {
  text: string;
  type: 'reasoning_text';
};
export type ResponseReasoningTextDeltaEvent = {
  content_index: number;
  delta: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
  type: 'response.reasoning_text.delta';
};
export type ResponseReasoningTextDoneEvent = {
  content_index: number;
  item_id: string;
  output_index: number;
  sequence_number: number;
  text: string;
  type: 'response.reasoning_text.done';
};
export type ResponseRefusalDeltaEvent = {
  content_index: number;
  delta: string;
  item_id: string;
  output_index: number;
  sequence_number: number;
  type: 'response.refusal.delta';
};
export type ResponseRefusalDoneEvent = {
  content_index: number;
  item_id: string;
  output_index: number;
  refusal: string;
  sequence_number: number;
  type: 'response.refusal.done';
};
export type ResponseStatus =
  | 'completed'
  | 'failed'
  | 'in_progress'
  | 'cancelled'
  | 'queued'
  | 'incomplete';
export type ResponseStreamEvent =
  | ResponseCompletedEvent
  | ResponseCreatedEvent
  | ResponseErrorEvent
  | ResponseFunctionCallArgumentsDeltaEvent
  | ResponseFunctionCallArgumentsDoneEvent
  | ResponseFailedEvent
  | ResponseIncompleteEvent
  | ResponseOutputItemAddedEvent
  | ResponseOutputItemDoneEvent
  | ResponseReasoningTextDeltaEvent
  | ResponseReasoningTextDoneEvent
  | ResponseRefusalDeltaEvent
  | ResponseRefusalDoneEvent
  | ResponseTextDeltaEvent
  | ResponseTextDoneEvent;
export type ResponseCompletedEvent = {
  response: Response;
  sequence_number: number;
  type: 'response.completed';
};
export type ResponseTextConfig = {
  format?: ResponseFormatTextConfig;
  verbosity?: 'low' | 'medium' | 'high' | null;
};
export type ResponseTextDeltaEvent = {
  content_index: number;
  delta: string;
  item_id: string;
  logprobs: Array<Logprob>;
  output_index: number;
  sequence_number: number;
  type: 'response.output_text.delta';
};
export type ResponseTextDoneEvent = {
  content_index: number;
  item_id: string;
  logprobs: Array<Logprob>;
  output_index: number;
  sequence_number: number;
  text: string;
  type: 'response.output_text.done';
};
export type Logprob = {
  token: string;
  logprob: number;
  top_logprobs?: Array<TopLogprob>;
};
export type TopLogprob = {
  token?: string;
  logprob?: number;
};
export type ResponseUsage = {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
};
export type Tool = ResponsesFunctionTool;
export type ToolChoiceFunction = {
  name: string;
  type: 'function';
};
export type ToolChoiceOptions = 'none';
export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high' | null;
export type StreamOptions = {
  include_obfuscation?: boolean;
};
/** Marks keys from T that aren't in U as optional never */
export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};
/** Either T or U, but not both (mutually exclusive) */
export type XOR<T, U> = (T & Without<U, T>) | (U & Without<T, U>);
export type AiOptions = {
  /**
   * Send requests as an asynchronous batch job, only works for supported models
   * https://developers.cloudflare.com/workers-ai/features/batch-api
   */
  queueRequest?: boolean;
  /**
   * Establish websocket connections, only works for supported models
   */
  websocket?: boolean;
  /**
   * Tag your requests to group and view them in Cloudflare dashboard.
   *
   * Rules:
   * Tags must only contain letters, numbers, and the symbols: : - . / @
   * Each tag can have maximum 50 characters.
   * Maximum 5 tags are allowed each request.
   * Duplicate tags will removed.
   */
  tags?: string[];
  gateway?: GatewayOptions;
  returnRawResponse?: boolean;
  prefix?: string;
  extraHeaders?: object;
  signal?: AbortSignal;
};
export type AiModelsSearchParams = {
  author?: string;
  hide_experimental?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  source?: number;
  task?: string;
};
export type AiModelsSearchObject = {
  id: string;
  source: number;
  name: string;
  description: string;
  task: {
    id: string;
    name: string;
    description: string;
  };
  tags: string[];
  properties: {
    property_id: string;
    value: string;
  }[];
};
export type ChatCompletionsBase = XOR<
  ChatCompletionsPromptInput,
  ChatCompletionsMessagesInput
>;
export type ChatCompletionsInput = ChatCompletionsBase;
export interface InferenceUpstreamError extends Error {}
export interface AiInternalError extends Error {}
export type AiModelListType = Record<string, any>;
export type AiAsyncBatchResponse = { request_id: string };
export declare abstract class Ai<
  AiModelList extends AiModelListType = AiModels,
> {
  aiGatewayLogId: string | null;
  gateway(gatewayId: string): AiGateway;

  /**
   * @deprecated Use the standalone `ai_search_namespaces` or `ai_search` Workers bindings instead.
   * See https://developers.cloudflare.com/ai-search/usage/workers-binding/
   */
  aiSearch(): AiSearchNamespace;

  /**
   * @deprecated AutoRAG has been replaced by AI Search.
   * Use the standalone `ai_search_namespaces` or `ai_search` Workers bindings instead.
   * See https://developers.cloudflare.com/ai-search/usage/workers-binding/
   *
   * @param autoragId Instance ID
   */
  autorag(autoragId: string): AutoRAG;
  // Batch request
  run<Name extends keyof AiModelList>(
    model: Name,
    inputs: { requests: AiModelList[Name]['inputs'][] },
    options: AiOptions & { queueRequest: true }
  ): Promise<AiAsyncBatchResponse>;

  // Raw response
  run<Name extends keyof AiModelList>(
    model: Name,
    inputs: AiModelList[Name]['inputs'],
    options: AiOptions & { returnRawResponse: true }
  ): Promise<Response>;

  // WebSocket
  run<Name extends keyof AiModelList>(
    model: Name,
    inputs: AiModelList[Name]['inputs'],
    options: AiOptions & { websocket: true }
  ): Promise<Response>;

  // Streaming
  run<Name extends keyof AiModelList>(
    model: Name,
    inputs: AiModelList[Name]['inputs'] & { stream: true },
    options?: AiOptions
  ): Promise<ReadableStream>;

  // Normal (default) - known model
  run<Name extends keyof AiModelList>(
    model: Name,
    inputs: AiModelList[Name]['inputs'],
    options?: AiOptions
  ): Promise<AiModelList[Name]['postProcessedOutputs']>;

  // Unknown model (gateway fallback)
  run(
    model: string & {},
    inputs: Record<string, unknown>,
    options?: AiOptions
  ): Promise<Record<string, unknown>>;
  models(params?: AiModelsSearchParams): Promise<AiModelsSearchObject[]>;
  toMarkdown(): ToMarkdownService;
  toMarkdown(
    files: MarkdownDocument[],
    options?: ConversionRequestOptions
  ): Promise<ConversionResponse[]>;
  toMarkdown(
    files: MarkdownDocument,
    options?: ConversionRequestOptions
  ): Promise<ConversionResponse>;
}
