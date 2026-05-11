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
  inputs: _AiTextEmbeddingsInput;
  postProcessedOutputs: _AiTextEmbeddingsOutput;
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
  inputs: _AiTextGenerationInput;
  postProcessedOutputs: _AiTextGenerationOutput;
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
