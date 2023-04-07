import { ORIGIN } from 'components/LayoutCanvas/components/EditControls/components/FuelTankControls';
import boundsStore, { Bounds } from 'stores/bounds';
import { Box2, Vector2 } from 'three';
import { radToDeg } from 'three/src/math/MathUtils';
import epsilonEquality from 'utilities/epsilonEquality';

export const ROTATIONAL_EPSILON = radToDeg(Number.EPSILON);

export const emptyBounds: Bounds = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotation: 0,
};

export default function getBoundsFromParts(
  ids: string[],
  useMutualAngle = true,
) {
  const box2 = new Box2();
  const point = new Vector2();
  const center = new Vector2();
  const firstAngle = boundsStore[ids[0]].bounds.rotation;
  const angle =
    useMutualAngle &&
    ids.every((id) => {
      const modulus =
        (boundsStore[id].bounds.rotation - firstAngle) % (Math.PI / 2);
      const equality =
        epsilonEquality(modulus, 0, ROTATIONAL_EPSILON) ||
        epsilonEquality(modulus, Math.PI / 2, ROTATIONAL_EPSILON) ||
        epsilonEquality(modulus, -Math.PI / 2, ROTATIONAL_EPSILON);

      return equality;
    })
      ? boundsStore[ids[0]].bounds.rotation
      : 0;

  ids.forEach((id) => {
    const { bounds } = boundsStore[id];

    center.set(bounds.x, bounds.y);
    box2
      .expandByPoint(
        point
          .set(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
          .rotateAround(center, bounds.rotation)
          .rotateAround(ORIGIN, -angle),
      )
      .expandByPoint(
        point
          .set(bounds.x - bounds.width / 2, bounds.y + bounds.height / 2)
          .rotateAround(center, bounds.rotation)
          .rotateAround(ORIGIN, -angle),
      )
      .expandByPoint(
        point
          .set(bounds.x - bounds.width / 2, bounds.y - bounds.height / 2)
          .rotateAround(center, bounds.rotation)
          .rotateAround(ORIGIN, -angle),
      )
      .expandByPoint(
        point
          .set(bounds.x + bounds.width / 2, bounds.y - bounds.height / 2)
          .rotateAround(center, bounds.rotation)
          .rotateAround(ORIGIN, -angle),
      );
  });

  const width = box2.max.x - box2.min.x;
  const height = box2.max.y - box2.min.y;

  center
    .set((box2.min.x + box2.max.x) / 2, (box2.min.y + box2.max.y) / 2)
    .rotateAround(ORIGIN, angle);

  const { x } = center;
  const { y } = center;
  const rotation = angle;

  const bounds: Bounds = { x, y, width, height, rotation };
  return { bounds, hasMutualAngle: true };
}
