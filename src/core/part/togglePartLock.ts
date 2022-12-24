import mutateBlueprint from 'core/blueprint/mutateBlueprint';

export default function togglePartLock(id: string) {
  mutateBlueprint((draft) => {
    draft.parts[id].locked = !draft.parts[id].locked;
  });
}
