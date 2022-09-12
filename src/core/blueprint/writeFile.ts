import { fileSave } from 'browser-fs-access';
import { mutateApp } from 'core/app/mutateApp';
import useApp from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import { declareNoUnsavedChanges } from './declareNoUnsavedChanges';
import { WATERMARK_KEY, WATERMARK_VALUE } from './importifyBlueprint';
import { savifyBlueprint } from './savifyBlueprint';

export const writeFile = async () => {
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
  declareNoUnsavedChanges();
};
