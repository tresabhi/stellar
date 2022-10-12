import useApp from 'stores/useApp';
import useBounds from 'stores/useBounds';

export const panToPart = (id: string) => {
  const partBounds = useBounds.getState().parts.get(id);
  const { camera } = useApp.getState().editor;

  if (partBounds) {
    camera?.position.set(
      partBounds.bounds.x,
      partBounds.bounds.y,
      camera.position.z,
    );
  }
};
