import useApp from 'stores/app';
import boundsStore from 'stores/bounds';
import { OrthographicCamera } from 'three';

export const panToPart = (id: string) => {
  const { camera } = useApp.getState().editor;
  const { bounds } = boundsStore[id];

  if (camera) {
    camera.position.set(bounds.x, bounds.y, camera.position.z);
    (camera as OrthographicCamera).zoom =
      1 / Math.max(bounds.width, bounds.height) / 2;
  }
};
