export type JSONNull = null;

export type JSONScalar = string | number | boolean;
export const isJSONScalar = (_: JSONNode): _ is JSONScalar => ['string', 'number', 'boolean'].includes(typeof _);

export type JSONArray = JSONNode[];
export const isJSONArray = (_: JSONNode): _ is JSONArray => Boolean(_ && Array.isArray(_));

export type JSONRecord = { [key in string]: JSONNode };
export const isJSONRecord = (_: JSONNode): _ is JSONRecord =>
  Boolean(_ && !isJSONScalar(_) && !isJSONArray(_) && typeof _ === 'object');

export type JSONLeaf = JSONScalar | JSONNull | { [k in string]: never } | [];
export const isJSONLeaf = (_: JSONNode): _ is JSONLeaf =>
  isJSONScalar(_) || !_ || (isJSONArray(_) && !_.length) || (isJSONRecord(_) && !Object.keys(_).length);

export type JSONNode = JSONScalar | JSONNull | JSONArray | JSONRecord;
