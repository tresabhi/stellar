import { fileOpen } from 'browser-fs-access';
import useApp from 'hooks/useApp';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';
import { loadBlueprint } from './loadBlueprint';

export const fileImport = async () => {
  const file = await fileOpen({
    description: 'SFS blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.json', '.txt'],
  });
  const data = JSON.parse(await file.text());

  loadBlueprint(data);
  useApp.setState({ fileHandle: file.handle ?? undefined });
  declareNoUnsavedChanges();
};
