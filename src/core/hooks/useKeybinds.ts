import { BlueprintHook } from 'core/hooks/useBlueprint';
import appStore, { AppType } from 'core/stores/app';
import produce from 'immer';
import { useHotkeys } from 'react-hotkeys-hook';

// TODO: Find a way to make this cleaner
const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

export default function useKeybinds(blueprint: BlueprintHook) {
  // BIG TODO: make this automated through settings

  // switch to next tab
  useHotkeys('ctrl+tab', (event) => {
    event.preventDefault();

    appStore.setState((state) => ({
      tab:
        state.tab === tabOrder[tabOrder.length - 1]
          ? tabOrder[0]
          : tabOrder[tabOrder.indexOf(state.tab) + 1],
    }));
  });

  // toggle left side bar
  useHotkeys('alt+1', (event) => {
    event.preventDefault();

    appStore.setState(
      produce((state: AppType) => {
        state.layout.leftSideBar.visible = !state.layout.leftSideBar.visible;
      }),
    );
  });

  // toggle right side bar
  useHotkeys('alt+2', (event) => {
    event?.preventDefault();

    appStore.setState(
      produce((state: AppType) => {
        state.layout.rightSideBar.visible = !state.layout.rightSideBar.visible;
      }),
    );
  });

  // delete parts
  useHotkeys('del', () => {
    blueprint.deletePartsBySelection();
  });
}
