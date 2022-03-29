/**
 * @deprecated
 */
export default function useFile() {
  const hook = {
    save: () => {
      /*
      const blob = new Blob(
        [JSON.stringify(savifyBlueprint(blueprintStore.getState()), replacer)],
        {
          type: 'text/plain;charset=utf-8',
        },
      );
      saveAs(blob, 'blueprint.txt');
      */
    },
  };

  return hook;
}
