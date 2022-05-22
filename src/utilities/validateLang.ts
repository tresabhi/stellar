import useSettings from 'hooks/useSettings';
import { translationsRegistry } from 'hooks/useTranslator';

const validateLang = () => {
  if (!translationsRegistry.has(useSettings.getState().language)) {
    console.warn(
      `No translations for language ${
        useSettings.getState().language
      }, falling back to en-US`,
    );
    useSettings.setState({ language: 'en-US' });
  }
};
export default validateLang;
