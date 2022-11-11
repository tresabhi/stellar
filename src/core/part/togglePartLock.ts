import { mutateBlueprint } from 'core/blueprint';

export const togglePartLock = (id: string) => {
  mutateBlueprint((draft) => {
    draft.parts[id].locked = !draft.parts[id].locked;
  });
};
