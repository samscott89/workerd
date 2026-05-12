// Copyright (c) 2025 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

function expectType<T>(_value: T) {}

export const handler: ExportedHandler<{ AI: Ai }> = {
  async fetch(_request, env) {
    // Known model -- normal response
    {
      const result = await env.AI.run('@cf/qwen/qwen2.5-coder-32b-instruct', {
        prompt: 'hello',
      });
      expectType<Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Output>(result);
    }

    // Known model -- streaming
    {
      const result = await env.AI.run('@cf/qwen/qwen2.5-coder-32b-instruct', {
        prompt: 'hello',
        stream: true as const,
      });
      expectType<ReadableStream>(result);
    }

    // Known model -- raw response
    {
      const result = await env.AI.run(
        '@cf/qwen/qwen2.5-coder-32b-instruct',
        { prompt: 'hello' },
        { returnRawResponse: true as const }
      );
      expectType<Response>(result);
    }

    // Known model -- batch request
    {
      const result = await env.AI.run(
        '@cf/qwen/qwen2.5-coder-32b-instruct',
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

    // ChatCompletions model -- normal request with messages
    {
      const result = await env.AI.run('@cf/zai-org/glm-4.7-flash', {
        messages: [{ role: 'user' as const, content: 'hello' }],
      });
      expectType<Ai_Cf_Zai_Org_Glm_4_7_Flash_Output>(result);
    }

    // ChatCompletions model -- normal request with prompt
    {
      const result = await env.AI.run('@cf/zai-org/glm-4.7-flash', {
        prompt: 'hello',
      });
      expectType<Ai_Cf_Zai_Org_Glm_4_7_Flash_Output>(result);
    }

    // ChatCompletions model -- batch request with messages
    {
      const result = await env.AI.run(
        '@cf/zai-org/glm-4.7-flash',
        {
          requests: [
            { messages: [{ role: 'user' as const, content: 'hello' }] },
            { messages: [{ role: 'user' as const, content: 'world' }] },
          ],
        },
        { queueRequest: true as const }
      );
      expectType<AiAsyncBatchResponse>(result);
    }

    // ChatCompletions model -- batch request with prompt
    {
      const result = await env.AI.run(
        '@cf/zai-org/glm-4.7-flash',
        {
          requests: [{ prompt: 'hello' }, { prompt: 'world' }],
        },
        { queueRequest: true as const }
      );
      expectType<AiAsyncBatchResponse>(result);
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
      expectType<AiAsyncBatchResponse>(result);
    }

    return new Response();
  },
};
