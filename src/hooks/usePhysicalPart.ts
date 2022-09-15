import { usePartWithTransformations } from 'game/parts/PartWithTransformations';
import { RefObject } from 'react';
import { Group, Mesh } from 'three';
import useDragControls from './useDragControls';
import usePartVisibility from './usePartVisibility';
import usePartWithBounds from './usePartWithBounds';
import useSelectionControl from './useSelectionControl';

/**
 * Combines all usual part hooks in one to reduce boilerplate
 */
const usePhysicalPart = (
  id: string,
  wrapper: RefObject<Group>,
  mesh: RefObject<Mesh>,
) => {
  const props = {
    onClick: useSelectionControl(id),
    onPointerDown: useDragControls(id),
  };

  usePartWithTransformations(id, wrapper);
  usePartWithBounds(id, wrapper, mesh);
  usePartVisibility(id, wrapper);

  return { props };
};
export default usePhysicalPart;
