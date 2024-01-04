export type JSONNull = null;

export type JSONScalar = string | number | boolean;
export const isJSONScalar = (_: JSONNode | undefined): _ is JSONScalar =>
  ['string', 'number', 'boolean'].includes(typeof _);

export type JSONArray = JSONNode[];
export const isJSONArray = (_: JSONNode | undefined): _ is JSONArray => Boolean(_ && Array.isArray(_));

export type JSONRecord = { [key in string]: JSONNode };
export const isJSONRecord = (_: JSONNode | undefined): _ is JSONRecord =>
  Boolean(_ && typeof _ === 'object' && !isJSONArray(_));

export type JSONNil = JSONNull | { [k in string]: never } | [];
export const isJSONNil = (_: JSONNode | undefined): _ is JSONNil =>
  _ === null || _ === undefined || (isJSONArray(_) && !_.length) || (isJSONRecord(_) && !Object.keys(_).length);

export type JSONLeaf = JSONScalar | JSONNil;
export const isJSONLeaf = (_: JSONNode | undefined): _ is JSONLeaf => isJSONScalar(_) || isJSONNil(_);

export type JSONNode = JSONScalar | JSONNull | JSONArray | JSONRecord;
