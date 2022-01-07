import { savifyBlueprint } from 'core/API/blueprint';
import blueprintStore from 'core/stores/blueprint';
import { saveAs } from 'file-saver';

export default function useFile() {
  const hook = {
    save: () => {
      const blob = new Blob(
        [JSON.stringify(savifyBlueprint(blueprintStore.getState()))],
        {
          type: 'text/plain;charset=utf-8',
        },
      );
      saveAs(blob, 'blueprint.txt');
    },
  };

  return hook;
}
