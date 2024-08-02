interface IStringObject {
  [key: string]: string;
}

interface IOptionsType {
  label: string;
  value: string;
  content?: string;
}

export type { IStringObject, IOptionsType };
