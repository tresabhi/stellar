import { contextMenuListing } from 'components/ContextMenu/types/root';
import { useState } from 'react';

/*
export default class contextLayer {
  state: Array<listing>;
  setState: Dispatch<SetStateAction<Array<listing>>>;

  constructor(
    state: Array<listing>,
    setState: Dispatch<SetStateAction<Array<listing>>>,
  ) {
    this.state = state;
    this.setState = setState;

    this.addContext = this.addContext.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  addContext(context: listing) {
    this.setState([...this.state, context]);
  }

  removeAll() {
    this.setState([]);
  }
}
*/

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
