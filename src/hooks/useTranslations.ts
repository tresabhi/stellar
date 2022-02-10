import langs from 'lang/langs.json';
import settingsStore from 'stores/settings';

export type Languages =
  | 'german'
  | 'english_uk'
  | 'english_us'
  | 'spanish'
  | 'french'
  | 'irish'
  | 'hindi'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'russian'
  | 'swedish'
  | 'chinese_simplified'
  | 'chinese_traditional';

const useTranslations = () => {
  const hook = {
    translate: (key: string) => {
      return 'test';
    },

    t: (key: string) => hook.translate(key),

    setLang: (lang: Languages) => {
      settingsStore.setState({ language: lang });
    },

    getLangManifest: (lang: Languages) =>
      langs.find((langObj) => langObj.dev_name === lang),
  };

  return hook;
};
export default useTranslations;
