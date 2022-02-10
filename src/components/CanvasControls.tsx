import { useThree } from '@react-three/fiber';
import { useWheel } from '@use-gesture/react';

const CanvasControls = () => {
  const camera = useThree(({ camera }) => camera);
  const canvas = useThree(({ gl }) => gl.domElement);

  useWheel(
    (event) => {
      camera.position.x += event.delta[0] / camera.zoom;
      camera.position.y -= event.delta[1] / camera.zoom;
    },
    { target: canvas },
  );
  // usePinch((event) => {}, { target: canvas });

  return null;
};

export default CanvasControls;
