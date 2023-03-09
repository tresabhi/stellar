import { usePartWithTransformations } from 'game/parts/PartWithTransformations';
import { RefObject } from 'react';
import { Object3D } from 'three';
import usePartCanvasControls from './usePartCanvasControls';
import usePartVisibility from './usePartVisibility';
import usePartWithBounds from './usePartWithBounds';

const usePhysicalPart = (
  id: string,
  object: RefObject<Object3D>,
  flipLighting = true,
) => {
  const props = usePartCanvasControls(id);
  usePartWithTransformations(id, object, flipLighting);
  usePartWithBounds(id, object);
  usePartVisibility(id, object);

  return props;
};
export default usePhysicalPart;
