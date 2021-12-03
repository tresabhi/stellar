import * as blueprintStore from 'core/stores/blueprint';

export default function (store: blueprintStore.type) {
  const hook = {
    add: () => {
      store.setState((state) => ({ num: state.num + 1 }));
    },
  };

  return hook;
}
