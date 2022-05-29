import useBounds, { UseBounds } from 'hooks/useBounds';
import produce from 'immer';

/**
 * This function does not accept ThreeJS Vector2 for performance reasons
 */
export const translateBounds = (ids: string[], x: number, y: number) => {
  useBounds.setState(
    produce<UseBounds>((draft) => {
      ids.forEach((id) => {
        const bound = draft.parts.get(id);

        if (bound) {
          bound.min.x += x;
          bound.min.y += y;
          bound.max.x += x;
          bound.max.y += y;
        }
      });
    }),
  );
};
