import { fileSave } from 'browser-fs-access';
import { UNNAMED_BLUEPRINT_FILE_NAME } from 'core/blueprint/constants/file';
import {
  WATERMARK_KEY,
  WATERMARK_VALUE,
} from 'core/blueprint/constants/watermark';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import { blueprintSavify } from './blueprintSavify';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';

export const fileSaveAs = async () => {
  const fileHandle = useApp.getState().fileHandle;
  const data = blueprintSavify(useBlueprint.getState());
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
  const newFileHandle = (await fileSave(blob, {
    fileName: fileHandle?.name ?? UNNAMED_BLUEPRINT_FILE_NAME,
    description: 'Stellar blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.stbp'],
  })) as unknown as FileSystemFileHandle | null;

  useApp.setState({ fileHandle: newFileHandle ?? undefined });
  declareNoUnsavedChanges();
};
