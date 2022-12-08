import { Translations } from 'stores/translationsCache';
import useSettings from '../stores/settings';

const localePattern = /[A-z]{2}-[A-z]{2}/;

export const FALLBACK_LANG = 'en-US';

export const TRANSLATIONS = import.meta.glob<true, string, Translations>(
  '../lang/*',
  {
    eager: true,
    import: 'default',
  },
);

for (const path in TRANSLATIONS) {
  const localeMatch = path.match(localePattern);

  if (localeMatch) {
    const locale = localeMatch[0];

    TRANSLATIONS[locale] = TRANSLATIONS[path];
    delete TRANSLATIONS[path];
  }
}

export const createTranslator = (
  language = useSettings.getState().interface.language,
) => {
  const translations = TRANSLATIONS[language] ?? TRANSLATIONS[FALLBACK_LANG];

  if (translations === undefined) {
    console.warn(`No translations for language ${language}`);
  }

  const translate = (string: string, tokens: string[] = []) => {
    const translation = string
      .split('.')
      .reduce(
        (object: Translations | string | undefined, key) =>
          typeof object === string
            ? object
            : (object as Translations | undefined)?.[key],
        translations as Translations,
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
