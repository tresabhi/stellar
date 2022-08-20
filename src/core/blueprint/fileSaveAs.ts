import { fileSave } from 'browser-fs-access';
import { mutateApp } from 'core/app/mutateApp';
import useApp from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import { WATERMARK_KEY, WATERMARK_VALUE } from './blueprintImportify';
import { blueprintSavify } from './blueprintSavify';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';

export const UNNAMED_BLUEPRINT_FILE_NAME = 'Blueprint.stbp';

export const FILE_EXTENSION_REGEX = /\.[^/.]+$/;

export const fileSaveAs = async () => {
  const {
    file: { handle },
  } = useApp.getState();
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
  const newHandle = (await fileSave(blob, {
    fileName: handle?.name ?? UNNAMED_BLUEPRINT_FILE_NAME,
    description: 'Stellar blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.stbp'],
  })) as unknown as FileSystemFileHandle | null;

  mutateApp((draft) => {
    draft.file.handle = newHandle ?? undefined;
  });
  declareNoUnsavedChanges();
};
