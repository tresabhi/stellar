import { mutateBounds } from 'core/app';

export const translateAllBoundingBoxes = (x: number, y: number) => {
  mutateBounds((draft) => {
    draft.parts.forEach(({ bounds, needsUpdate }) => {
      if (!needsUpdate) {
        bounds.x += x;
        bounds.y += y;
      }
    });
  });
};
