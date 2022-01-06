import { importifyBlueprint, savifyBlueprint } from 'core/API/blueprint';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as RootPart from 'core/API/part/types/root';
import blueprintStore from 'core/stores/blueprint';
import selectionStore, { SelectionStoreType } from 'core/stores/selection';
import { saveAs } from 'file-saver';
import { cloneDeep, merge } from 'lodash';
import produce from 'immer';

/**
 * Hook to manage the blueprint state
 * @returns blueprint hook
 */
export default function useBlueprint() {
  const hook = {
    deleteParts: () => {},

    new: (blueprint = {}) =>
      blueprintStore.setState(
        merge(importifyBlueprint(cloneDeep(blueprint)), RootBlueprint.data),
      ),

    save: () => {
      const blob = new Blob(
        [JSON.stringify(savifyBlueprint(blueprintStore.getState()))],
        {
          type: 'text/plain;charset=utf-8',
        },
      );
      saveAs(blob, 'blueprint.txt');
    },

    selectPart: (part: RootPart.AnyPartType) => {
      part.relations.listingRef.current?.classList.add('selected');
      selectionStore.setState((state) => ({
        selections: [...state.selections, part.relations],
      }));
    },

    selectParts: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ) => {},

    selectPartsOnly: (
      startPart: RootPart.AnyPartType,
      endPart: RootPart.AnyPartType,
    ) => {},

    deselectPart: (part: RootPart.AnyPartType) => {
      part.relations.listingRef.current?.classList.remove('selected');
      selectionStore.setState(
        produce((state: SelectionStoreType) =>
          state.selections.splice(state.selections.indexOf(part.relations), 1),
        ),
      );
    },

    togglePartSelection: (part: RootPart.AnyPartType) => {
      if (part.relations.listingRef.current?.classList.contains('selected')) {
        hook.deselectPart(part);
      } else {
        hook.selectPart(part);
      }
    },

    selectPartOnly: (part: RootPart.AnyPartType) => {
      selectionStore.getState().selections.forEach((selection) => {
        selection.listingRef.current?.classList.remove('selected');
      });
      selectionStore.setState({
        selections: [part.relations],
        lastSelection: part.relations,
      });
      part.relations.listingRef?.current?.classList.add('selected');
    },
  };

  return hook;
}
