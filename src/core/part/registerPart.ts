import { mutatePartRegistry } from 'core/app';
import { Part } from 'game/parts/Part';
import { PartRegistryItem, UsePartRegistry } from 'stores/usePartRegistry';

export const registerPart = (name: string, item: PartRegistryItem<Part>) => {
  mutatePartRegistry((draft: UsePartRegistry) => {
    draft.set(name, item);
  });
};
