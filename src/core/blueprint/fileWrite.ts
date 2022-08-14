import { fileSave } from 'browser-fs-access';
import useApp from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import { WATERMARK_KEY, WATERMARK_VALUE } from './blueprintImportify';
import { blueprintSavify } from './blueprintSavify';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';

export const fileWrite = async () => {
  const { fileHandle } = useApp.getState();
  const data = blueprintSavify(useBlueprint.getState());
  const blob = new Blob([`{\n"${WATERMARK_KEY}": "${WATERMARK_VALUE}"\n\n,${JSON.stringify(data).slice(1)}`], {
    type: 'application/json',
  });

  const newFileHandle = (await fileSave(blob, undefined, fileHandle)) as unknown as FileSystemFileHandle;

  useApp.setState({ fileHandle: newFileHandle });
  declareNoUnsavedChanges();
};
