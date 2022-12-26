import { ThreeEvent, useThree } from '@react-three/fiber';
import { Vector2Tuple } from 'three';

const useMousePosition = () => {
  const {
    camera,
    gl: { domElement: canvas },
  } = useThree();

  const getMousePosition = (
    event: MouseEvent | PointerEvent | ThreeEvent<PointerEvent>,
  ): Vector2Tuple => {
    const boundingRect = canvas.getBoundingClientRect();
    const canvasRelativeX = ((event as ThreeEvent<PointerEvent>).nativeEvent?.clientX
        ?? (event as MouseEvent).clientX) - boundingRect.left;
    const canvasRelativeY = ((event as ThreeEvent<PointerEvent>).nativeEvent?.clientY
        ?? (event as MouseEvent).clientY) - boundingRect.top;
    const centerRelativeX = canvasRelativeX - canvas.clientWidth / 2;
    const centerRelativeY = -(canvasRelativeY - canvas.clientHeight / 2);
    const zoomRelativeX = centerRelativeX / camera.zoom;
    const zoomRelativeY = centerRelativeY / camera.zoom;
    const offsetRelativeX = zoomRelativeX + camera.position.x;
    const offsetRelativeY = zoomRelativeY + camera.position.y;

    return [offsetRelativeX, offsetRelativeY];
  };

  return getMousePosition;
};
export default useMousePosition;
