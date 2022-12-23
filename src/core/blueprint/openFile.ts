import { fileOpen as fileOpenFS } from 'browser-fs-access';
import { mutateApp } from 'core/app/mutateApp';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';
import loadBlueprint from './loadBlueprint';

export default async function openFile() {
  const file = await fileOpenFS({
    description: 'Stellar blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.stbp'],
  });
  const data = JSON.parse(await file.text());

  loadBlueprint(data);
  mutateApp((draft) => {
    draft.file.handle = file.handle;
  });
  declareNoUnsavedChanges();
}
