// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

// Helpers for the AI shared-schema generator.
//
// The vendored schema blocks (see ./input/schemas) use an unconventional
// JSON-schema layout: each block is a plain object with a `$id` plus one or
// more named sub-schemas (e.g. `schemaTextGenerationOptions` has `common`,
// `prompt`, `messages`, ...). We expose each named sub-schema as a TypeScript
// type at the top level, so we need a deterministic way to derive a type name
// from the block id and the sub-schema key.

/**
 * Derive a TypeScript type name from a block `$id` and a sub-schema key.
 *
 * Example:
 *   schemaIdToTypeName(
 *     "http://ai.cloudflare.com/schemas/textGenerationOptions",
 *     "common",
 *   )
 *   // => "AiTextGenerationOptionsCommon"
 *
 *   schemaIdToTypeName(
 *     "http://ai.cloudflare.com/schemas/jsonMode",
 *     "response_format",
 *   )
 *   // => "AiJsonModeResponseFormat"
 */
export function schemaIdToTypeName(schemaId: string, key: string): string {
  // Strip "http://ai.cloudflare.com/schemas/" (or any URL prefix ending in
  // "/schemas/") to leave just the lowerCamelCase block name.
  const blockName = schemaId.replace(/^.*\/schemas\//, '');
  // Capitalize the first letter so the block name itself is PascalCase.
  const blockPascal = blockName.charAt(0).toUpperCase() + blockName.slice(1);
  // Convert snake_case keys (like "response_format") to PascalCase. Existing
  // PascalCase keys (e.g. "DeveloperMessage") are preserved by this transform
  // because there are no underscores to split on.
  const keyPascal = key
    .split('_')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
  return 'Ai' + blockPascal + keyPascal;
}

/**
 * Build a lookup table mapping every `$ref` form we expect to encounter to
 * the corresponding generated TypeScript type name.
 *
 * For each block we register two keys: the short form
 * (`textGenerationOptions#/common`) used throughout the vendored schemas, and
 * the full URL form (`http://ai.cloudflare.com/schemas/textGenerationOptions#/common`)
 * in case `$RefParser` normalizes against the host schema's `$id`.
 */
export function buildTypeNameMap(
  schemaBlocks: ReadonlyArray<Record<string, unknown>>
): Map<string, string> {
  const map = new Map<string, string>();
  for (const block of schemaBlocks) {
    const blockId = block.$id;
    if (typeof blockId !== 'string' || blockId.length === 0) continue;
    const shortId = blockId.replace(/^.*\/schemas\//, '');
    for (const key of Object.keys(block)) {
      if (key === '$id') continue;
      const typeName = schemaIdToTypeName(blockId, key);
      map.set(`${shortId}#/${key}`, typeName);
      map.set(`${blockId}#/${key}`, typeName);
    }
  }
  return map;
}

/**
 * Detect schemas that are bare "property bags" (Cabidela convention) and
 * wrap them in `{ type: "object", properties: ... }` so that
 * `json-schema-to-typescript` can generate proper object types.
 *
 * Several vendored sub-schemas (notably `textGenerationOptions#/common` and
 * `chatCompletionsOptions#/common`) are stored as a flat object of field
 * definitions rather than a full JSON schema -- Cabidela resolves these as
 * property bags to be merged into the parent. Without wrapping,
 * `json-schema-to-typescript` sees no `type`/`properties` and emits an
 * unusable `{ [k: string]: unknown }` shape.
 *
 * A property bag is recognized as an object that:
 *   - has no structural JSON-schema keywords (type/properties/$ref/oneOf/...)
 *   - contains at least one value that itself looks like a schema (has
 *     `type`, `$ref`, `oneOf`, or `anyOf`).
 */
export function unwrapPropertyBag(schema: unknown): unknown {
  if (schema === null || typeof schema !== 'object' || Array.isArray(schema)) {
    return schema;
  }
  const obj = schema as Record<string, unknown>;

  const hasStructure =
    'type' in obj ||
    'properties' in obj ||
    '$ref' in obj ||
    'oneOf' in obj ||
    'anyOf' in obj ||
    'allOf' in obj ||
    'enum' in obj ||
    'items' in obj;

  if (hasStructure) {
    return schema;
  }

  const looksLikeBag = Object.values(obj).some((v) => {
    if (v === null || typeof v !== 'object') return false;
    const inner = v as Record<string, unknown>;
    return (
      'type' in inner ||
      '$ref' in inner ||
      'oneOf' in inner ||
      'anyOf' in inner
    );
  });

  if (!looksLikeBag) {
    return schema;
  }

  return {
    type: 'object',
    properties: obj,
  };
}

/**
 * Recursively expand Cabidela's `$merge` keyword into standard JSON Schema
 * `allOf`.
 *
 * Cabidela uses `{ $merge: { source, with } }` at the `properties` level to
 * mean "the parent object's own properties are `source`, intersected with the
 * schema referenced by `with`". This is non-standard; `json-schema-to-typescript`
 * doesn't understand it and emits a useless `$merge?: object` field.
 *
 * This function walks the schema and rewrites each `$merge` construct into
 * an `allOf` of two schemas: a derived object schema carrying the explicit
 * `source` properties (plus any other sibling properties that aren't
 * `$merge`) and the `with` ref. The parent's `required` list is moved onto
 * the source-derived schema so that the constraint survives the rewrite.
 */
export function expandMerge(schema: unknown): unknown {
  if (Array.isArray(schema)) {
    return schema.map(expandMerge);
  }
  if (schema === null || typeof schema !== 'object') {
    return schema;
  }

  const obj = schema as Record<string, unknown>;

  // Look for the $merge pattern at this level (parent has `properties`
  // containing a `$merge` key).
  if (
    obj.properties &&
    typeof obj.properties === 'object' &&
    obj.properties !== null &&
    !Array.isArray(obj.properties) &&
    '$merge' in (obj.properties as Record<string, unknown>)
  ) {
    const props = obj.properties as Record<string, unknown>;
    const merge = props.$merge as { source?: unknown; with?: unknown };
    const source = merge.source ?? {};
    const withRef = merge.with;

    // Build the source-derived schema: an object carrying the explicit
    // properties from `source` plus any sibling props (other than $merge),
    // and inheriting the parent's `required` list.
    const mergedProperties: Record<string, unknown> = {
      ...(expandMerge(source) as Record<string, unknown>),
    };
    for (const [k, v] of Object.entries(props)) {
      if (k === '$merge') continue;
      mergedProperties[k] = expandMerge(v);
    }

    const sourceSchema: Record<string, unknown> = {
      type: 'object',
      properties: mergedProperties,
    };
    if (obj.required !== undefined) sourceSchema.required = obj.required;

    // Build the allOf list: source schema followed by the `with` ref (if any).
    const allOf: unknown[] = [sourceSchema];
    if (withRef !== undefined) allOf.push(expandMerge(withRef));

    // Preserve other top-level keys (description, etc.) but replace
    // properties + required with the new allOf.
    //
    // We deliberately drop `title` here: json-schema-to-typescript hoists
    // any schema with a title into its own named type, and several of the
    // vendored schemas use the same titles ("Prompt", "Messages") for
    // different oneOf branches across blocks, which produces duplicate
    // identifier errors. Dropping the title inlines the intersection at
    // the call site, which is what we want for these wrapper objects.
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'properties' || k === 'required' || k === 'title') continue;
      result[k] = expandMerge(v);
    }
    result.allOf = allOf;
    return result;
  }

  // No $merge at this level; recurse into all keys.
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    result[k] = expandMerge(v);
  }
  return result;
}
