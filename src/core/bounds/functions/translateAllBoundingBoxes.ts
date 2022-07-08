import useBounds, { UseBounds } from 'hooks/useBounds';
import produce from 'immer';

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
