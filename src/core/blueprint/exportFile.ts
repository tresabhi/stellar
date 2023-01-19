import { fileSave } from 'browser-fs-access';
import useApp from 'stores/app';
import useBlueprint from 'stores/blueprint';
import useSettings from 'stores/settings';
import exportifyBlueprint from './exportifyBlueprint';
import { WATERMARK_KEY, WATERMARK_VALUE } from './importifyBlueprint';
import { FILE_EXTENSION_REGEX } from './saveFileAs';

export default async function exportFile() {
  const { handle } = useApp.getState().file;
  const { format, watermark, defaultName } = useSettings.getState().file;
  const fileName =
    handle?.name.replace(FILE_EXTENSION_REGEX, '') ?? defaultName;
  const data = exportifyBlueprint(useBlueprint.getState());
  const stringifiedJSON = JSON.stringify(
    data,
    undefined,
    format ? 2 : undefined,
  );
  const blob = new Blob(
    [
      watermark
        ? `{\n"${WATERMARK_KEY}": "${WATERMARK_VALUE}"\n\n,${stringifiedJSON.slice(
            1,
          )}`
        : stringifiedJSON,
    ],
    {
      type: 'application/json',
    },
  );

  await fileSave(blob, {
    fileName: `${fileName}.txt`, // TODO: make this a settings option
    description: 'SFS blueprint file',
    mimeTypes: ['application/json'],
    extensions: ['.json', '.txt'],
  });
}
