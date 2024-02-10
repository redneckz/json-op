export type JSONNull = null;

export type JSONScalar = string | number | boolean;

export const isString = (_: unknown): _ is string => typeof _ === 'string';
export const isBool = (_: unknown): _ is boolean => typeof _ === 'boolean';
export const isNumber = (_: unknown): _ is number => typeof _ === 'number';

export const isJSONScalar = (_: JSONNode | undefined): _ is JSONScalar => isString(_) || isBool(_) || isNumber(_);

export type JSONArray = JSONNode[];
export const isJSONArray = (_: JSONNode | undefined): _ is JSONArray => Boolean(_ && Array.isArray(_));

export type JSONRecord = { [key in string]: JSONNode };
export const isJSONRecord = (_: JSONNode | undefined): _ is JSONRecord =>
  Boolean(_ && typeof _ === 'object' && !isJSONArray(_));

export type JSONNil = JSONNull | { [k in string]: never } | [];
export const isJSONNil = (_: JSONNode | undefined): _ is JSONNil =>
  _ === null || _ === undefined || (isJSONArray(_) && !_.length) || (isJSONRecord(_) && !Object.keys(_).length);

export type JSONNode = JSONScalar | JSONNull | JSONArray | JSONRecord;
