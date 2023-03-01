import { usePartWithTransformations } from 'game/parts/PartWithTransformations';
import { RefObject } from 'react';
import { Object3D } from 'three';
import usePartCanvasControls from './usePartCanvasControls';
import usePartVisibility from './usePartVisibility';
import usePartWithBounds from './usePartWithBounds';

const usePhysicalPart = (id: string, object: RefObject<Object3D>) => {
  const props = usePartCanvasControls(id);
  usePartWithTransformations(id, object);
  usePartWithBounds(id, object);
  usePartVisibility(id, object);

  return props;
};
export default usePhysicalPart;
