import produce from 'immer';
import partRegistryStore, {
  PartRegistryItem,
  PartRegistryStore,
} from 'stores/partRegistry';

export const registerPart = (name: string, item: PartRegistryItem) => {
  partRegistryStore.setState(
    produce((draft: PartRegistryStore) => {
      draft.set(name, item);
    }),
  );
};
