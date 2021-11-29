import * as RootContextListing from 'core/API/contextListings/types/root';
import { useState } from 'react';

export default function useContextLayer(
  initialState: RootContextListing.contextMenuListing[],
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
