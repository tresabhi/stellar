import * as BlueprintAPI from 'core/APIs/blueprint';
import * as RootPart from 'core/APIs/parts/root';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  const [state, setState] = useState(
    BlueprintAPI.updateBlueprint(initialBlueprint),
  );
  let selection: Array<string> = [];

  return {
    state,
    selection,

    deletePart: (index: number) => {
      let newParts = [...state.parts];
      newParts.splice(index, 1);
      setState((state) => ({
        ...state,
        parts: newParts,
      }));
    },

    mutatePartData: (data: RootPart.anyPartType, index: number) => {
      setState((state) => ({
        ...state,
        parts: state.parts.map((part, partIndex) => {
          return partIndex === index ? { ...merge(part, data) } : part;
        }),
      }));
    },
  };
}
