import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';

export const declareBoundNeedsUpdate = (id: string) => {
  if (boundsStore[id]) {
    boundsStore[id].needsRecomputation = true;
    const part = useBlueprint.getState().parts.get(id);

    if (part?.parentId) declareBoundNeedsUpdate(part.parentId);
  }
};
