import useApp from 'stores/useApp';
import { saveFileAs } from './saveFileAs';
import { writeFile } from './writeFile';

export const saveFile = () => {
  if (useApp.getState().file.handle) {
    writeFile();
  } else {
    saveFileAs();
  }
};
