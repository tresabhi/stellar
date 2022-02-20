import { saveAs } from 'file-saver';
import { savifyBlueprint } from 'interfaces/blueprint';
import blueprintStore from 'stores/blueprint';
import replacer from 'utilities/replacer';

export default function useFile() {
  const hook = {
    save: () => {
      const blob = new Blob(
        [JSON.stringify(savifyBlueprint(blueprintStore.getState()), replacer)],
        {
          type: 'text/plain;charset=utf-8',
        },
      );
      saveAs(blob, 'blueprint.txt');
    },
  };

  return hook;
}
