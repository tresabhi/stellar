import useDragControls from './useDragControls';
import useSelectionControl from './useSelectionControl';

export default function usePartCanvasControls(id: string) {
  return {
    onClick: useSelectionControl(id),
    onPointerDown: useDragControls(id),
  };
}
