import { fileSave } from 'browser-fs-access';
import { WATERMARK_KEY, WATERMARK_VALUE } from 'functions/blueprint/constants/watermark';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';
import { savifyBlueprint } from './savifyBlueprint';

export const fileWrite = async () => {
  const fileHandle = appStore.getState().fileHandle;
  const data = savifyBlueprint(blueprintStore.getState());
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

  appStore.setState({ fileHandle: newFileHandle });
  declareNoUnsavedChanges();
};
