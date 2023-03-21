import { Vector3 as Vector3Like } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function parseVector3Like(vector: Vector3Like) {
  if (vector instanceof Vector3) return vector;
  if (typeof vector === 'number') return new Vector3(vector, vector, vector);
  return new Vector3(...vector);
}
