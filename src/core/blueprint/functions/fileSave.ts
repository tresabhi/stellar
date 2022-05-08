import appStore from 'stores/app';
import { fileSaveAs } from './fileSaveAs';
import { fileWrite } from './fileWrite';

export const fileSave = () => {
  const fileHandle = appStore.getState().fileHandle;

  if (fileHandle) {
    fileWrite();
  } else {
    fileSaveAs();
  }
};
