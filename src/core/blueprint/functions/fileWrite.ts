import { fileSave } from 'browser-fs-access';
import {
  WATERMARK_KEY,
  WATERMARK_VALUE,
} from 'core/blueprint/constants/watermark';
import useApp from 'hooks/useApp';
import blueprintStore from 'hooks/useBlueprint';
import { blueprintSavify } from './blueprintSavify';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';

export const fileWrite = async () => {
  const fileHandle = useApp.getState().fileHandle;
  const data = blueprintSavify(blueprintStore.getState());
  const blob = new Blob(
    [
      `{\n"${WATERMARK_KEY}": "${WATERMARK_VALUE}"\n\n,${JSON.stringify(
        data,
      ).slice(1)}`,
    ],
    {
      type: 'application/json',
    },
  );

  const newFileHandle = (await fileSave(
    blob,
    undefined,
    fileHandle,
  )) as unknown as FileSystemFileHandle;

  useApp.setState({ fileHandle: newFileHandle });
  declareNoUnsavedChanges();
};
