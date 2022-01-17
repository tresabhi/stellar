import appStore, { AppType } from 'core/stores/app';
import produce from 'immer';
import Mousetrap from 'mousetrap';

// TODO: Find a way to make this cleaner
const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

export default function manifestKeybinds() {
  // BIG TODO: make this automated through settings
  // const blueprint = useBlueprint();
  /*
    // toggle left side bar
    window.addEventListener(
      'keypress',
      createKeybind(
        () =>
          appStore.setState(
            produce((state: AppType) => {
              state.layout.leftSideBar.visible =
                !state.layout.leftSideBar.visible;
            }),
          ),
        ['Alt', '1'],
      ),
    );

    // toggle right side bar
    window.addEventListener(
      'keypress',
      createKeybind(
        () =>
          appStore.setState(
            produce((state: AppType) => {
              state.layout.rightSideBar.visible =
                !state.layout.rightSideBar.visible;
            }),
          ),
        ['Alt', '1'],
      ),
    );

    // delete parts
    window.addEventListener(
      'keypress',
      createKeybind(() => {
        blueprint.deletePartsBySelection();
      }, 'Delete'),
    );
  }, [blueprint]);
  */

  // switch to next tab
  Mousetrap.bind('ctrl+tab', (event) => {
    appStore.setState((state) => ({
      tab:
        state.tab === tabOrder[tabOrder.length - 1]
          ? tabOrder[0]
          : tabOrder[tabOrder.indexOf(state.tab) + 1],
    }));
  });

  // toggle left side bar
  Mousetrap.bind('alt+1', () => {
    appStore.setState(
      produce((state: AppType) => {
        state.layout.leftSideBar.visible = !state.layout.leftSideBar.visible;
      }),
    );
  });

  // toggle right side bar
  Mousetrap.bind('alt+2', () => {
    appStore.setState(
      produce((state: AppType) => {
        state.layout.rightSideBar.visible = !state.layout.rightSideBar.visible;
      }),
    );
  });
}
