import { mutateBounds } from 'core/app';

export const translateAllBoundingBoxes = (x: number, y: number) => {
  mutateBounds((draft) => {
    draft.parts.forEach(({ bounds, needsUpdate }, id) => {
      if (!needsUpdate) {
        bounds.min.x += x;
        bounds.min.y += y;
        bounds.max.x += x;
        bounds.max.y += y;
      }
    });
  });
};
