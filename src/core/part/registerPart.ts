import produce from 'immer';
import partRegistryStore, {
  PartRegistryItem,
  UsePartRegistry,
} from 'stores/usePartRegistry';

export const registerPart = (name: string, item: PartRegistryItem) => {
  partRegistryStore.setState(
    produce((draft: UsePartRegistry) => {
      draft.set(name, item);
    }),
  );
};
