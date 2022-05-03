import { useThree } from '@react-three/fiber';
import { Vector2 } from 'three';

const useMousePos = () => {
  const {
    mouse,
    camera,
    gl: { domElement: canvas },
  } = useThree();

  return () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    return new Vector2(
      (mouse.x * canvasWidth) / camera.zoom / 2 + camera.position.x,
      (mouse.y * canvasHeight) / camera.zoom / 2 + camera.position.y,
    );
  };
};
export default useMousePos;
