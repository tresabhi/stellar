import { invalidate } from '@react-three/fiber';
import useApp from 'stores/app';
import boundsStore from 'stores/bounds';

export default function panToPart(id: string) {
  const { camera } = useApp.getState().editor;
  const { bounds } = boundsStore[id];

  if (camera) {
    camera.position.set(bounds.x, bounds.y, camera.position.z);
    invalidate();
    // TODO: implement zoom
    // (camera as OrthographicCamera).zoom = 1 / Math.max(bounds.width, bounds.height) / 2;
  }
}
