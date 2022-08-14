import produce from 'immer';
import useBounds, { UseBounds } from 'stores/useBounds';

export const translateAllBoundingBoxes = (x: number, y: number) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      draft.parts.forEach(({ bounds, needsUpdate }, id) => {
        if (!needsUpdate) {
          bounds.min.x += x;
          bounds.min.y += y;
          bounds.max.x += x;
          bounds.max.y += y;
        }
      });
    }),
  );
};
