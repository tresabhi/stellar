import { updateBlueprint } from 'assets/blueprints';
import { type as rootPartType } from 'core/blueprint/parts/Root';
import { merge } from 'lodash';
import { useState } from 'react';

export default function useBlueprint(initialBlueprint: Object) {
  const [state, setState] = useState(updateBlueprint(initialBlueprint));

  return {
    state,

    deletePart: (index: number) => {
      setState({
        ...state,
        parts: state.parts.filter((part, partIndex) => {
          return partIndex !== index;
        }),
      });
    },

    mutatePartData: (data: rootPartType, index: number) => {
      setState({
        ...state,
        parts: state.parts.map((part, partIndex) => {
          return partIndex === index ? { ...merge(part, data) } : part;
        }),
      });
    },
  };
}
