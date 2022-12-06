import { invalidate, useThree } from '@react-three/fiber';
import { mutateApp } from 'core/app';

export const Expose = () => {
  const camera = useThree((state) => state.camera);

  mutateApp((draft) => {
    draft.editor.camera = camera;
    draft.editor.invalidateFrame = invalidate;
  });

  return null;
};
