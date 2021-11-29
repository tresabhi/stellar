export default function (translations: Object, fallback = {}) {
  return {
    translate(key: string, variables?: string[]) {
      // TODO: Fix all (object as any) problem
      let translation: string =
        (translations as any)[key] ?? (fallback as any)[key] ?? '';

      variables?.forEach((variable, index) => {
        translation = translation.replaceAll(`{${index}}`, variable);
      });

      return translation;
    },
  };
}
