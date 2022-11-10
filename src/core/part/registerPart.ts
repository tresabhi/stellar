import { mutatePartRegistry } from 'core/app';
import { Part } from 'game/parts/Part';
import { PartRegistryItem, UsePartRegistry } from 'stores/partRegistry';

export const registerPart = (name: string, item: PartRegistryItem<Part>) => {
  mutatePartRegistry((draft: UsePartRegistry) => {
    draft.set(name, item);
  });
};
