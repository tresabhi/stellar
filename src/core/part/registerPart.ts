import { mutatePartRegistry } from 'core/app';
import { PartRegistryItem, UsePartRegistry } from 'stores/usePartRegistry';

export const registerPart = (name: string, item: PartRegistryItem) => {
  mutatePartRegistry((draft: UsePartRegistry) => {
    draft.set(name, item);
  });
};
