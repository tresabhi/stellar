import { usePartWithTransformations } from 'game/parts/PartWithTransformations';
import { MutableRefObject } from 'react';
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
  wrapper: MutableRefObject<Group>,
  mesh: MutableRefObject<Mesh>,
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
