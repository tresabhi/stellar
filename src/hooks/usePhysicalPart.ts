import { usePartWithTransformations } from 'game/parts/PartWithTransformations';
import { RefObject } from 'react';
import { Object3D } from 'three';
import useDragControls from './useDragControls';
import usePartVisibility from './usePartVisibility';
import usePartWithBounds from './usePartWithBounds';
import useSelectionControl from './useSelectionControl';

/**
 * Combines all usual part hooks in one to reduce boilerplate
 */
const usePhysicalPart = (id: string, object: RefObject<Object3D>) => {
  const props = {
    onClick: useSelectionControl(id),
    onPointerDown: useDragControls(id),
  };

  usePartWithTransformations(id, object);
  usePartWithBounds(id, object);
  usePartVisibility(id, object);

  return props;
};
export default usePhysicalPart;
