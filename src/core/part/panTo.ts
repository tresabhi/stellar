import { invalidate } from '@react-three/fiber';
import { MAX_ZOOM, MIN_ZOOM } from 'components/PanControls';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import useApp from 'stores/app';
import { MethodIds } from 'types/Parts';
import normalizeIds from 'utilities/normalizeIds';

const FITTING_COEFFICIENT = 0.8;

export default function panTo(ids: MethodIds) {
  const { camera, canvas } = useApp.getState().editor;

  if (ids.length > 0 && camera && canvas) {
    const { bounds } = getBoundsFromParts(normalizeIds(ids), false);

    const scaleX = bounds.width > 0 ? canvas.width / bounds.width : MAX_ZOOM;
    const scaleY = bounds.height > 0 ? canvas.height / bounds.height : MAX_ZOOM;

    camera.position.set(bounds.x, bounds.y, camera.position.z);
    camera.zoom = Math.min(
      MAX_ZOOM,
      Math.max(MIN_ZOOM, FITTING_COEFFICIENT * Math.min(scaleX, scaleY)),
    );

    camera.updateProjectionMatrix();
    invalidate();
  }
}
