import { AnyObject } from 'immer/dist/internal';
import de_DE from 'lang/de-DE.json';
import en_GB from 'lang/en-GB.json';
import en_US from 'lang/en-US.json';
import es_ES from 'lang/es-ES.json';
import fr_FR from 'lang/fr-FR.json';
import ga_IE from 'lang/ga-IE.json';
import hi_IN from 'lang/hi-IN.json';
import it_IT from 'lang/it-IT.json';
import ja_JP from 'lang/ja-JP.json';
import ko_KR from 'lang/ko-KR.json';
import ru_RU from 'lang/ru-RU.json';
import sv_SE from 'lang/sv-SE.json';
import zh_CN from 'lang/zh-CN.json';
import zh_TW from 'lang/zh-TW.json';
import useSettings from '../stores/useSettings';

export const translationsRegistry = new Map<string, AnyObject>([
  ['de-DE', de_DE],
  ['en-GB', en_GB],
  ['en-US', en_US],
  ['es-ES', es_ES],
  ['fr-FR', fr_FR],
  ['ga-IE', ga_IE],
  ['hi-IN', hi_IN],
  ['it-IT', it_IT],
  ['ja-JP', ja_JP],
  ['ko-KR', ko_KR],
  ['ru-RU', ru_RU],
  ['sv-SE', sv_SE],
  ['zh-CN', zh_CN],
  ['zh-TW', zh_TW],
]);

export const createTranslator = (
  language = useSettings.getState().interface.language,
) => {
  let translations = translationsRegistry.get(language);

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
