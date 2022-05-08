import { fileOpen as fileOpenFS } from 'browser-fs-access';
import appStore from 'stores/app';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';
import { loadBlueprint } from './loadBlueprint';

export const fileOpen = async () => {
  const file = await fileOpenFS({
    description: 'Stellar blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.stbp'],
  });
  const data = JSON.parse(await file.text());

  loadBlueprint(data);
  appStore.setState({ fileHandle: file.handle ?? undefined });
  declareNoUnsavedChanges();
};
