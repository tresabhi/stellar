import { AnyObject } from 'immer/dist/internal';
import { isUndefined } from 'lodash';
import useSettings from './useSettings';

const useTranslator = () => {
  const language = useSettings((state) => state.language);
  let translations = {};

  try {
    translations = require(`lang/${language}.json`);
  } catch {
    console.error(`Language ${language} not found`);
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

    return isUndefined(translation)
      ? string // If translation is not found, return the original string
      : typeof translation === 'string'
      ? translation // If translation is a string, return the string
      : translation.$ ?? string; // If translation is an object, return the object's master value or the original string
  };

  const translate_shorthand = (string: TemplateStringsArray) =>
    translate(string[0]);

  const hook = { language, translate, t: translate_shorthand };

  return hook;
};
export default useTranslator;
