/*
const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];
*/

export default function useKeybinds() {
  // BIG TODO: make this automated through settings
  // const blueprint = useBlueprint();
  /*
  useEffect(() => {
    // tab switching
    window.addEventListener(
      'keypress',
      createKeybind(
        () =>
          appStore.setState((state) => ({
            tab:
              state.tab === tabOrder[tabOrder.length - 1]
                ? tabOrder[0]
                : tabOrder[tabOrder.indexOf(state.tab) + 1],
          })),
        ['Control', 'Tab'],
      ),
    );

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
}
