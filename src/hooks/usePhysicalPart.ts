import { usePartWithTransformations } from 'game/parts/PartWithTransformations';
import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
import useDragControls from './useDragControls';
import usePartVisibility from './usePartVisibility';
import usePartWithBounds from './usePartWithBounds';
import useSelectionControl from './useSelectionControl';

/**
 * Combines all usual part hooks in one to reduce ~~bloat~~ what's the word I'm looking for?
 */
const usePhysicalPart = (id: string, mesh: MutableRefObject<Mesh | Group>) => {
  const props = {
    onClick: useSelectionControl(id),
    onPointerDown: useDragControls(id),
  };

  usePartWithTransformations(id, mesh);
  usePartWithBounds(id, mesh);
  usePartVisibility(id, mesh);

  return { props };
};
export default usePhysicalPart;
