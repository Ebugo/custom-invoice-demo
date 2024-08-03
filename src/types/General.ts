interface IStringObject {
  [key: string]: string;
}

interface IOptionsType {
  label: string;
  value: string;
  content?: string;
}

interface ISettings {
  name: string;
  details: string;
  terms: string;
  color: string;
  bgColor: string;
  font: string;
  logo: File | null;
  template: string;
}

interface IFonts {
  category: string;
  family: string;
  files: IStringObject;
  kind: string;
  lastModified: string;
  menu: string;
  subsets: string[];
  variants: string[];
  version: string;
}

export type { IStringObject, IOptionsType, ISettings, IFonts };
