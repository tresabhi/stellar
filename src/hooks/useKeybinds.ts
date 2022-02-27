import produce from 'immer';
import {
  deletePartsBySelection,
  translatePartsBySelection,
} from 'interfaces/blueprint';
import { selectPartsOnly, unselectAllParts } from 'interfaces/selection';
import { bind } from 'mousetrap';
import { useEffect } from 'react';
import appStore, { AppStore } from 'stores/app';
import blueprintStore from 'stores/blueprint';

const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

const useKeybinds = () => {
  // BIG TODO: Make this date driven

  useEffect(() => {
    bind('ctrl+a', () => {
      selectPartsOnly(
        Array.from(blueprintStore.getState().parts.keys(), (id) => [id]),
      );
    });

    bind('esc', () => {
      unselectAllParts();
    });

    bind('p a r t y', () => {
      // party mode easter egg
      document.body.classList.toggle('party');
    });

    // TODO: make parts explorer rerender when this happens
    bind('del', deletePartsBySelection);

    bind('alt+1', (event) => {
      event?.preventDefault();

      appStore.setState(
        produce((draft: AppStore) => {
          draft.layout.leftSideBar.visible = !draft.layout.leftSideBar.visible;
        }),
      );
    });

    bind('alt+2', (event) => {
      event?.preventDefault();

      appStore.setState(
        produce((draft: AppStore) => {
          draft.layout.rightSideBar.visible =
            !draft.layout.rightSideBar.visible;
        }),
      );
    });

    bind('ctrl+tab', (event) => {
      appStore.setState((state) => ({
        tab:
          state.tab === tabOrder[tabOrder.length - 1]
            ? tabOrder[0]
            : tabOrder[tabOrder.indexOf(state.tab) + 1],
      }));
    });

    bind('up', (event) => {
      // TODO: remove these `event.repeats`?
      if (!event.repeat) translatePartsBySelection(0, 1);
    });
    bind('down', (event) => {
      if (!event.repeat) translatePartsBySelection(0, -1);
    });
    bind('left', (event) => {
      if (!event.repeat) translatePartsBySelection(-1, 0);
    });
    bind('right', (event) => {
      if (!event.repeat) translatePartsBySelection(1, 0);
    });
  }, []);
};
export default useKeybinds;
