import { useThree } from '@react-three/fiber';

const useMousePos = () => {
  const mouse = useThree((state) => state.mouse);
  const canvas = useThree((state) => state.gl.domElement);
  const camera = useThree((state) => state.camera);

  return () => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    return [
      (mouse.x * canvasWidth) / camera.zoom / 2 + camera.position.x,
      (mouse.y * canvasHeight) / camera.zoom / 2 + camera.position.y,
    ] as [number, number];
  };
};
export default useMousePos;
