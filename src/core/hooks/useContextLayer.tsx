import { contextMenuListing } from 'components/ContextMenu/types/root';
import { useState } from 'react';

export default function useContextLayer(
  initialState: Array<contextMenuListing>,
) {
  const [state, setState] = useState(initialState);

  return {
    state,

    removeAll: () => setState([]),

    addContext: (context: contextMenuListing) => {
      setState((state) => [...state, context]);
    },
  };
}
