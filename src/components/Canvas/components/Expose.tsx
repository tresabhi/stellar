import { useThree } from '@react-three/fiber';
import mutateApp from 'core/app/mutateApp';
import { OrthographicCamera } from 'three';

export default function Expose() {
  const camera = useThree((state) => state.camera);
  const canvas = useThree((state) => state.gl.domElement);

  mutateApp((draft) => {
    draft.editor.camera = camera as OrthographicCamera;
    draft.editor.canvas = canvas;
  });

  return null;
}
