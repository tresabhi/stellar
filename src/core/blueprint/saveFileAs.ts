import { fileSave } from 'browser-fs-access';
import mutateApp from 'core/app/mutateApp';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import useSettings from 'stores/settings';
import declareUnsavedChanges from './declareUnsavedChanges';
import { WATERMARK_KEY, WATERMARK_VALUE } from './importifyBlueprint';
import savifyBlueprint from './savifyBlueprint';

export const fileExtensionRegex = /\.[^/.]+$/;

export default async function saveFileAs() {
  const { handle } = useApp.getState().file;
  const { defaultName } = useSettings.getState().file;
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
    fileName: handle?.name ?? defaultName,
    description: 'Stellar blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.stbp'],
  })) as unknown as FileSystemFileHandle | null;

  mutateApp((draft) => {
    draft.file.handle = newHandle ?? undefined;
  });
  declareUnsavedChanges(false);
}
