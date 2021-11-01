import { listing } from 'components/ContextMenu/types/root';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default class contextLayer {
  contexts: Array<listing>;
  setContexts: Dispatch<SetStateAction<Array<listing>>>;

  constructor(contexts: Array<listing>) {
    (() => {
      [this.contexts, this.setContexts] = useState(contexts);
    })();

    this.removeAll = this.removeAll.bind(this);
  }

  addContext(context: listing) {
    (() => {
      useEffect(() => {
        this.setContexts([...this.contexts, context]);
      }, []);
    })();
  }

  removeAll() {
    this.setContexts([]);
  }
}
