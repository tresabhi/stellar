import { sideToPoint } from 'components/Canvas/components/LayoutCanvas/components/Outlines/components/ResizeControls/components/ResizeNode';
import boundsStore, { Bounds } from 'stores/bounds';
import { Box2, Vector2 } from 'three';

export const getBoundsFromParts = (ids: string[]) => {
  if (ids.length > 0) {
    const box2 = new Box2();
    const point = new Vector2();
    const angle = boundsStore[ids[0]].bounds.rotation;
    const noMutualAngle = ids.some(
      (id) => boundsStore[id].bounds.rotation !== angle,
    );

    if (noMutualAngle) {
      ids.forEach((id) => {
        const { bounds } = boundsStore[id];

        box2
          .expandByPoint(point.set(...sideToPoint(bounds, [-1, 1])))
          .expandByPoint(point.set(...sideToPoint(bounds, [1, 1])))
          .expandByPoint(point.set(...sideToPoint(bounds, [1, -1])))
          .expandByPoint(point.set(...sideToPoint(bounds, [-1, -1])));
      });

      const bounds: Bounds = {
        width: box2.max.x - box2.min.x,
        height: box2.max.y - box2.min.y,
        x: (box2.min.x + box2.max.x) / 2,
        y: (box2.min.y + box2.max.y) / 2,
        rotation: 0,
      };

      return { bounds, hasMutualAngle: false };
    } else {
      ids.forEach((id) => {
        const { bounds } = boundsStore[id];
        const offset = Math.hypot(bounds.x, bounds.y);
        const offsetAngle = Math.atan2(bounds.y, bounds.x);
        const rotatedOffsetAngle = offsetAngle - angle;
        const rotatedOffsetX = offset * Math.cos(rotatedOffsetAngle);
        const rotatedOffsetY = offset * Math.sin(rotatedOffsetAngle);

        box2
          .expandByPoint(
            point.set(
              rotatedOffsetX - bounds.width / 2,
              rotatedOffsetY + bounds.height / 2,
            ),
          )
          .expandByPoint(
            point.set(
              rotatedOffsetX + bounds.width / 2,
              rotatedOffsetY + bounds.height / 2,
            ),
          )
          .expandByPoint(
            point.set(
              rotatedOffsetX + bounds.width / 2,
              rotatedOffsetY - bounds.height / 2,
            ),
          )
          .expandByPoint(
            point.set(
              rotatedOffsetX - bounds.width / 2,
              rotatedOffsetY - bounds.height / 2,
            ),
          );
      });

      const rotatedBoundsOffsetX = (box2.min.x + box2.max.x) / 2;
      const rotatedBoundsOffsetY = (box2.min.y + box2.max.y) / 2;
      const boundsOffset = Math.hypot(
        rotatedBoundsOffsetX,
        rotatedBoundsOffsetY,
      );
      const rotatedBoundsOffsetAngle = Math.atan2(
        rotatedBoundsOffsetY,
        rotatedBoundsOffsetX,
      );
      const boundsOffsetAngle = rotatedBoundsOffsetAngle + angle;
      const x = boundsOffset * Math.cos(boundsOffsetAngle);
      const y = boundsOffset * Math.sin(boundsOffsetAngle);
      const width = box2.max.x - box2.min.x;
      const height = box2.max.y - box2.min.y;
      const rotation = angle;

      const bounds: Bounds = {
        x,
        y,
        width,
        height,
        rotation,
      };

      return { bounds, hasMutualAngle: true };
    }
  } else {
    const bounds: Bounds = { x: 0, y: 0, width: 0, height: 0, rotation: 0 };

    return { bounds, hasMutualAngle: true };
  }
};
