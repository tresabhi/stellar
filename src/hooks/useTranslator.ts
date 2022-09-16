import { AnyObject } from 'immer/dist/internal';
import { langs } from 'langs';
import { Translations } from 'stores/useTranslationsCache';
import useSettings from '../stores/useSettings';

export const FALLBACK_LANG = 'en-US';

export const createTranslator = (
  language = useSettings.getState().interface.language,
) => {
  const translations = (
    langs.get(language) ?? (langs.get(FALLBACK_LANG) as unknown as Translations)
  ).translations;

  if (translations === undefined) {
    console.warn(`No translations for language ${language}`);
  }

  // TODO: remove usage of AnyObject

  const translate = (string: string, tokens: string[] = []) => {
    const translation = string
      .split('.')
      .reduce(
        (object: AnyObject | string | undefined, key) =>
          typeof object === string
            ? object
            : (object as AnyObject | undefined)?.[key],
        translations,
      );

    const applyTokens = (string: string) =>
      tokens.reduce(
        (previousTranslation, currentTranslation, index) =>
          previousTranslation.replaceAll(`%${index + 1}$s`, tokens[index]),
        string,
      );

    return translation === undefined
      ? string // if translation is not found, return the original string
      : typeof translation === 'string'
      ? applyTokens(translation) // if translation is a string, return the translation
      : translation.$ === undefined
      ? string // if root translation does not exists, return the string
      : applyTokens(translation.$); // if root translation exists, return the root translation
  };

  const fragments = (string: string) => translate(string).split(/%[0-9]\$s/);

  const t = (string: TemplateStringsArray) => translate(string[0]);
  const f = (string: TemplateStringsArray) => fragments(string[0]);

  const hook = { language, translate, fragment: fragments, t, f };

  return hook;
};

export const useTranslator = () => {
  const language = useSettings((state) => state.interface.language);

  return createTranslator(language);
};
