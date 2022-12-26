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

Object.keys(TRANSLATIONS).forEach((path) => {
  const localeMatch = path.match(localePattern);

  if (localeMatch) {
    const locale = localeMatch[0];

    TRANSLATIONS[locale] = TRANSLATIONS[path];
    delete TRANSLATIONS[path];
  }
});

export const createTranslator = (
  language = useSettings.getState().interface.language,
) => {
  const translations = TRANSLATIONS[language] ?? TRANSLATIONS[FALLBACK_LANG];

  const translate = (string: string, tokens: string[] = []) => {
    const translation = string
      .split('.')
      .reduce(
        (object: Translations | string | undefined, key) => (typeof object === string
          ? object
          : (object as Translations | undefined)?.[key]),
        translations as Translations,
      );

    const applyTokens = (initialToken: string) => tokens.reduce(
      (previousTranslation, currentTranslation, index) => previousTranslation.replaceAll(`%${index + 1}$s`, tokens[index]),
      initialToken,
    );

    // if translation is not found, return the original string
    if (translation === undefined) return string;
    // if translation is a string, return the translation
    if (typeof translation === 'string') return applyTokens(translation);
    // if root translation does not exists, return the string
    if (translation.$ === undefined) return string;
    // if root translation exists, return the root translation
    return applyTokens(translation.$);
  };

  const fragments = (string: string) => translate(string).split(/%[0-9]\$s/);

  const t = (string: TemplateStringsArray) => translate(string[0]);
  const f = (string: TemplateStringsArray) => fragments(string[0]);

  const hook = {
    language,
    translate,
    fragment: fragments,
    t,
    f,
  };

  return hook;
};

export default function useTranslator() {
  const language = useSettings((state) => state.interface.language);

  return createTranslator(language);
}
