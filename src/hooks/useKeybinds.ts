import useBlueprint from 'hooks/useBlueprint';
import appStore, { AppType } from 'core/stores/app';
import produce from 'immer';
import { KeyMap } from 'react-hotkeys';

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
  const blueprint = useBlueprint();

  const keyMap: KeyMap = {
    SWITCH_TAB: 'ctrl + tab',

    TOGGLE_LEFT_SIDE_BAR: 'alt + 1',
    TOGGLE_RIGHT_SIDE_BAR: 'alt + 2',

    DELETE_SELECTION: 'del',

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
        produce((state: AppType) => {
          state.layout.leftSideBar.visible = !state.layout.leftSideBar.visible;
        }),
      );
    },
    TOGGLE_RIGHT_SIDE_BAR: (event) => {
      event?.preventDefault();

      appStore.setState(
        produce((state: AppType) => {
          state.layout.rightSideBar.visible =
            !state.layout.rightSideBar.visible;
        }),
      );
    },

    DELETE_SELECTION: () => blueprint.deletePartsBySelection(),

    PARTY: () =>
      // party mode easter egg
      document.body.classList[
        document.body.classList.contains('party') ? 'remove' : 'add'
      ]('party'),
  };

  return [keyMap, handlers] as [KeyMap, Handlers];
}
