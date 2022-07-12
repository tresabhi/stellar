import { mutateBlueprint } from 'core/blueprint';

export const togglePartLock = (id: string) => {
  mutateBlueprint((draft) => {
    const part = draft.parts.get(id);

    if (part) part.locked = !part.locked;
  });
};
