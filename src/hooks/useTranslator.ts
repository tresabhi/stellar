import { AnyObject } from 'immer/dist/internal';
import { langs } from 'langs';
import useSettings from '../stores/useSettings';

export const FALLBACK_LANG = 'en-US';

export const createTranslator = (
  language = useSettings.getState().interface.language,
) => {
  let translations = (langs.get(language) ?? langs.get(FALLBACK_LANG)!)
    .translations;

  if (translations === undefined) {
    console.warn(`No translations for language ${language}`);
  }

  const translate = (string: string) => {
    const translation = string
      .split('.')
      .reduce(
        (object: AnyObject | string | undefined, key) =>
          typeof object === string
            ? object
            : (object as AnyObject | undefined)?.[key],
        translations,
      );

    return translation === undefined
      ? string // If translation is not found, return the original string
      : typeof translation === 'string'
      ? translation // If translation is a string, return the string
      : translation.$ ?? string; // If translation is an object, return the object's master value or the original string
  };

  const translateShorthand = (string: TemplateStringsArray) =>
    translate(string[0]);

  const hook = { language, translate, t: translateShorthand };

  return hook;
};

export const useTranslator = () => {
  const language = useSettings((state) => state.interface.language);

  return createTranslator(language);
};
