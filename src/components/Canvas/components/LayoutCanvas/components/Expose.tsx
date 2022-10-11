import { useThree } from '@react-three/fiber';
import { mutateApp } from 'core/app';

export const Expose = () => {
  const { camera, invalidate } = useThree((state) => state);

  mutateApp((draft) => {
    draft.editor.camera = camera;
    draft.editor.invalidateFrame = invalidate;
  });

  return null;
};
