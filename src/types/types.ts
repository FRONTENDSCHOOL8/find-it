export type JsonValue =
  | string
  | number
  | boolean
  | JsonArray
  | JsonObject
  | null;

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject {
  [key: string]: JsonValue;
}
