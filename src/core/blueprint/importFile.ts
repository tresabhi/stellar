import { fileOpen } from 'browser-fs-access';
import mutateApp from 'core/app/mutateApp';
import declareUnsavedChanges from './declareUnsavedChanges';
import loadBlueprint from './loadBlueprint';

export default async function importFile() {
  const file = await fileOpen({
    description: 'SFS blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.json', '.txt'],
  });
  const data = JSON.parse(await file.text());

  loadBlueprint(data);
  mutateApp((draft) => {
    draft.file.handle = file.handle;
  });
  declareUnsavedChanges(false);
}
