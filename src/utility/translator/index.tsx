export default class translator {
  translations = {};
  fallback = {};

  constructor(translations: Object, fallback = {}) {
    this.translations = translations;
    this.fallback = fallback;
  }

  translate(key: string, variables?: Array<string>) {
    let translation: string =
      (this.translations as any)[key] ?? (this.fallback as any)[key] ?? '';

    variables?.forEach((variable, index) => {
      translation = translation.replaceAll(`{${index}}`, variable);
    });

    return translation;
  }
}
