import * as BlueprintAPI from 'assets/blueprints';
import * as RootPart from 'core/APIs/parts/Root';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  const [state, setState] = useState(
    BlueprintAPI.updateBlueprint(initialBlueprint),
  );

  return {
    state,

    deletePart: (index: number) => {
      setState((state) => ({
        ...state,
        parts: state.parts.filter((part, partIndex) => {
          return partIndex !== index;
        }),
      }));
    },

    mutatePartData: (data: RootPart.allPartTypes, index: number) => {
      setState((state) => ({
        ...state,
        parts: state.parts.map((part, partIndex) => {
          return partIndex === index ? { ...merge(part, data) } : part;
        }),
      }));
    },
  };
}
