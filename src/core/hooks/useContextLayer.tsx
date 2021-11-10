import * as RootContextListing from 'components/ContextMenu/types/root';
import { useState } from 'react';

export default function useContextLayer(
  initialState: Array<RootContextListing.contextMenuListing>,
) {
  const [state, setState] = useState(initialState);

  return {
    state,

    removeAll: () => setState([]),

    addContext: (context: RootContextListing.contextMenuListing) => {
      setState((state) => [...state, context]);
    },
  };
}
