import partRegistryStore, {
  PartRegistryItem,
  UsePartRegistry,
} from 'stores/usePartRegistry';
import produce from 'immer';

export const registerPart = (name: string, item: PartRegistryItem) => {
  partRegistryStore.setState(
    produce((draft: UsePartRegistry) => {
      draft.set(name, item);
    }),
  );
};
