// Copyright (c) 2025 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

function expectType<T>(_value: T) {}

export const handler: ExportedHandler<{ AI: Ai }> = {
  async fetch(_request, env) {
    // Known model -- normal response
    {
      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
        prompt: 'hello',
      });
      expectType<AiTextGenerationOutput>(result);
    }

    // Known model -- streaming
    {
      const result = await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fp8', {
        prompt: 'hello',
        stream: true as const,
      });
      expectType<ReadableStream>(result);
    }

    // Known model -- raw response
    {
      const result = await env.AI.run(
        '@cf/meta/llama-3.1-8b-instruct-fp8',
        { prompt: 'hello' },
        { returnRawResponse: true as const }
      );
      expectType<Response>(result);
    }

    // Known model -- batch request
    {
      const result = await env.AI.run(
        '@cf/meta/llama-3.1-8b-instruct-fp8',
        { requests: [{ prompt: 'hello' }, { prompt: 'world' }] },
        { queueRequest: true as const }
      );
      expectType<AiAsyncBatchResponse>(result);
    }

    // Gateway model -- unknown model name, permissive types
    {
      const result = await env.AI.run('google/nano-banana', {
        prompt: 'hello',
        aspect_ratio: '16:9',
      });
      expectType<Record<string, unknown>>(result);
    }

    // Gateway model with gateway options
    {
      const result = await env.AI.run(
        'google/nano-banana',
        { prompt: 'hello' },
        { gateway: { id: 'my-gateway' } }
      );
      expectType<Record<string, unknown>>(result);
    }

    // Known model -- batch request
    {
      const result = await env.AI.run(
        '@cf/meta/llama-3.1-8b-instruct-fp8',
        { requests: [{ prompt: 'hello' }, { prompt: 'world' }] },
        { queueRequest: true as const }
      );
      expectType<AsyncResponse>(result);
    }

    // ChatCompletions model -- normal request with messages
    {
      const result = await env.AI.run('@cf/zhipuai/glm-4.7-flash', {
        messages: [{ role: 'user' as const, content: 'hello' }],
      });
      expectType<ChatCompletionsOutput>(result);
    }

    // ChatCompletions model -- normal request with prompt
    {
      const result = await env.AI.run('@cf/zhipuai/glm-4.7-flash', {
        prompt: 'hello',
      });
      expectType<ChatCompletionsOutput>(result);
    }

    // ChatCompletions model -- batch request with messages
    {
      const result = await env.AI.run(
        '@cf/zhipuai/glm-4.7-flash',
        {
          requests: [
            { messages: [{ role: 'user' as const, content: 'hello' }] },
            { messages: [{ role: 'user' as const, content: 'world' }] },
          ],
        },
        { queueRequest: true as const }
      );
      expectType<AsyncResponse>(result);
    }

    // ChatCompletions model -- batch request with prompt
    {
      const result = await env.AI.run(
        '@cf/zhipuai/glm-4.7-flash',
        {
          requests: [{ prompt: 'hello' }, { prompt: 'world' }],
        },
        { queueRequest: true as const }
      );
      expectType<AsyncResponse>(result);
    }

    // ChatCompletions model -- batch with tools
    {
      const result = await env.AI.run(
        '@cf/zhipuai/glm-4.7-flash',
        {
          requests: [
            {
              messages: [{ role: 'user' as const, content: 'hello' }],
              tools: [
                {
                  type: 'function' as const,
                  function: {
                    name: 'get_weather',
                    description: 'Get weather',
                    parameters: { type: 'object', properties: {} },
                  },
                },
              ],
            },
          ],
        },
        { queueRequest: true as const }
      );
      expectType<AsyncResponse>(result);
    }

    // Embeddings model -- batch request
    {
      const result = await env.AI.run(
        '@cf/baai/bge-base-en-v1.5',
        {
          requests: [
            { text: 'hello', pooling: 'cls' as const },
            { text: ['world'], pooling: 'mean' as const },
          ],
        },
        { queueRequest: true as const }
      );
      expectType<AsyncResponse>(result);
    }

    return new Response();
  },
};
