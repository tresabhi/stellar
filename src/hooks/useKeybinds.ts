import produce from 'immer';
import {
  deletePartsBySelection,
  groupPartsBySelection,
  redo,
  translatePartsBySelection,
  undo
} from 'interfaces/blueprint';
import { selectPartsOnly, unselectAllParts } from 'interfaces/selection';
import { bind } from 'mousetrap';
import { useEffect } from 'react';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import settingsStore, { SettingsStore } from 'stores/settings';

const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

// todo: make this date driven
const TRANSLATE_BY = 1;
const SHIFT_TRANSLATE_BY = 5;

const useKeybinds = () => {
  // BIG TODO: Make this date driven

  useEffect(() => {
    bind('ctrl+a', () => selectPartsOnly(blueprintStore.getState().partOrder));
    bind('esc', unselectAllParts);

    bind('p a r t y', () => {
      // party mode easter egg
      document.body.classList.toggle('party');
    });

    bind('del', deletePartsBySelection);

    bind('alt+1', (event) => {
      event?.preventDefault();

      settingsStore.setState(
        produce((draft: SettingsStore) => {
          draft.layout.leftSideBar.visible = !draft.layout.leftSideBar.visible;
        }),
      );
    });

    bind('alt+2', (event) => {
      event?.preventDefault();

      settingsStore.setState(
        produce((draft: SettingsStore) => {
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

    bind('up', () => translatePartsBySelection(0, TRANSLATE_BY));
    bind('down', () => translatePartsBySelection(0, -TRANSLATE_BY));
    bind('left', () => translatePartsBySelection(-TRANSLATE_BY, 0));
    bind('right', () => translatePartsBySelection(TRANSLATE_BY, 0));
    bind('shift+up', () => translatePartsBySelection(0, SHIFT_TRANSLATE_BY));
    bind('shift+down', () => translatePartsBySelection(0, -SHIFT_TRANSLATE_BY));
    bind('shift+left', () => translatePartsBySelection(-SHIFT_TRANSLATE_BY, 0));
    bind('shift+right', () => translatePartsBySelection(SHIFT_TRANSLATE_BY, 0));

    bind('ctrl+z', (event) => {
      event.preventDefault();
      undo();
    });
    bind('ctrl+shift+z', (event) => {
      event.preventDefault();
      redo();
    });

    bind('ctrl+g', (event) => {
      event.preventDefault();
      groupPartsBySelection();
    });
  }, []);
};
export default useKeybinds;
