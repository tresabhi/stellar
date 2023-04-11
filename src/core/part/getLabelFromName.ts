import { createTranslator } from 'hooks/useTranslator';
import getPartRegistry from './getPartRegistry';

export default function getLabelFromName(name: string): string {
  const { translate } = createTranslator();
  const registry = getPartRegistry(name);

  return translate(`parts.${registry?.label}`);
}
