import produce from 'immer';
import { deletePartsBySelection } from 'interfaces/blueprint';
import { selectPartsOnly, unselectAllParts } from 'interfaces/selection';
import { KeyMap } from 'react-hotkeys';
import appStore, { AppStore } from 'stores/app';
import blueprintStore from 'stores/blueprint';

// TODO: Find a way to make this cleaner
const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

type Handlers = { [key: string]: (keyEvent?: KeyboardEvent) => void };

export default function useKeybinds() {
  // TODO: BIG MAKE THIS DATE DRIVEN

  const keyMap: KeyMap = {
    SWITCH_TAB: 'ctrl + tab',

    TOGGLE_LEFT_SIDE_BAR: 'alt + 1',
    TOGGLE_RIGHT_SIDE_BAR: 'alt + 2',

    DELETE_SELECTION: 'del',
    SELECT_ALL: 'ctrl + a',
    UNSELECT_ALL: 'escape',

    PARTY: 'p a r t y',
  };
  const handlers: Handlers = {
    SWITCH_TAB: (event) => {
      event?.preventDefault();

      appStore.setState((state) => ({
        tab:
          state.tab === tabOrder[tabOrder.length - 1]
            ? tabOrder[0]
            : tabOrder[tabOrder.indexOf(state.tab) + 1],
      }));
    },

    TOGGLE_LEFT_SIDE_BAR: (event) => {
      event?.preventDefault();

      appStore.setState(
        produce((draft: AppStore) => {
          draft.layout.leftSideBar.visible = !draft.layout.leftSideBar.visible;
        }),
      );
    },

    TOGGLE_RIGHT_SIDE_BAR: (event) => {
      event?.preventDefault();

      appStore.setState(
        produce((draft: AppStore) => {
          draft.layout.rightSideBar.visible =
            !draft.layout.rightSideBar.visible;
        }),
      );
    },

    DELETE_SELECTION: deletePartsBySelection,

    PARTY: () =>
      // party mode easter egg
      document.body.classList.toggle('party'),

    UNSELECT_ALL: unselectAllParts,

    SELECT_ALL: () => {
      // TODO: in the future, use selectPartsOnlyFrom([0], [length - 1]);
      selectPartsOnly(
        blueprintStore.getState().parts.map((part, index) => [index]),
      );
    },
  };

  return [keyMap, handlers] as [KeyMap, Handlers];
}
