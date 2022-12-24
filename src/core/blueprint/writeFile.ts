import { fileSave } from 'browser-fs-access';
import mutateApp from 'core/app/mutateApp';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import declareUnsavedChanges from './declareUnsavedChanges';
import { WATERMARK_KEY, WATERMARK_VALUE } from './importifyBlueprint';
import savifyBlueprint from './savifyBlueprint';

export default async function writeFile() {
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

  const newHandle = (await fileSave(
    blob,
    undefined,
    handle,
  )) as unknown as FileSystemFileHandle;

  mutateApp((draft) => {
    draft.file.handle = newHandle;
  });
  declareUnsavedChanges(false);
}
