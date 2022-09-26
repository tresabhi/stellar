import { mutateBounds } from 'core/app';

export const translateAllBoundingBoxes = (x: number, y: number) => {
  mutateBounds((draft) => {
    draft.parts.forEach(({ bounds, needsUpdate }) => {
      if (!needsUpdate) {
        bounds.position.x += x;
        bounds.position.y += y;
      }
    });
  });
};
