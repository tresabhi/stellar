import { fileSave } from 'browser-fs-access';
import mutateApp from 'core/app/mutateApp';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import declareNoUnsavedChanges from './declareNoUnsavedChanges';
import { WATERMARK_KEY, WATERMARK_VALUE } from './importifyBlueprint';
import savifyBlueprint from './savifyBlueprint';

export const UNNAMED_BLUEPRINT_FILE_NAME = 'Blueprint.stbp';

export const FILE_EXTENSION_REGEX = /\.[^/.]+$/;

export default async function saveFileAs() {
  const {
    file: { handle },
  } = useApp.getState();
  const data = savifyBlueprint(useBlueprint.getState());
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
}
