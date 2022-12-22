import { useThree } from '@react-three/fiber';
import { mutateApp } from 'core/app';

export function Expose() {
  const camera = useThree((state) => state.camera);

  mutateApp((draft) => {
    draft.editor.camera = camera;
  });

  return null;
}
