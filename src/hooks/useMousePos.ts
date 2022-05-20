import { ThreeEvent, useThree } from '@react-three/fiber';
import { Vector2 } from 'three';

const useMousePos = () => {
  const {
    camera,
    gl: { domElement: canvas },
  } = useThree();

  const getMousePos = (
    event: MouseEvent | PointerEvent | ThreeEvent<PointerEvent>,
  ) => {
    const boundingRect = canvas.getBoundingClientRect();
    const canvasRelativeX =
      ((event as ThreeEvent<PointerEvent>).nativeEvent?.clientX ??
        (event as MouseEvent).clientX) - boundingRect.left;
    const canvasRelativeY =
      ((event as ThreeEvent<PointerEvent>).nativeEvent?.clientY ??
        (event as MouseEvent).clientY) - boundingRect.top;
    const centerRelativeX = canvasRelativeX - canvas.clientWidth / 2;
    const centerRelativeY = -(canvasRelativeY - canvas.clientHeight / 2);
    const zoomRelativeX = centerRelativeX / camera.zoom;
    const zoomRelativeY = centerRelativeY / camera.zoom;
    const offsetRelativeX = zoomRelativeX + camera.position.x;
    const offsetRelativeY = zoomRelativeY + camera.position.y;

    return new Vector2(offsetRelativeX, offsetRelativeY);
  };

  return getMousePos;
};
export default useMousePos;
