import { Blueprint } from 'game/Blueprint';

export const disposeBoundingBoxes = (ids: string[], state: Blueprint) => {
  ids.forEach((id) => {
    state.boundingBoxes.delete(id);
  });
};
