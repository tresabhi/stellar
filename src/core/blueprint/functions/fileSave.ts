import useApp from 'hooks/useApp';
import { fileSaveAs } from './fileSaveAs';
import { fileWrite } from './fileWrite';

export const fileSave = () => {
  const fileHandle = useApp.getState().fileHandle;

  if (fileHandle) {
    fileWrite();
  } else {
    fileSaveAs();
  }
};
