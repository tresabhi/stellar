import { intersection } from 'lodash';

export default function lastIntersection<Type>(
  array1: Type[],
  array2: Type[],
): Type | undefined {
  const intersections = intersection(array1, array2);
  return intersections[intersections.length - 1];
}
