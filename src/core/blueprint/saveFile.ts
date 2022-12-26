import useApp from 'stores/app';
import saveFileAs from './saveFileAs';
import writeFile from './writeFile';

export default function saveFile() {
  if (useApp.getState().file.handle) {
    writeFile();
  } else {
    saveFileAs();
  }
}
