import { useGLTF } from '@react-three/drei';
import useKeybinds from 'hooks/useKeybinds';
import { PART_MODEL_PATH } from 'hooks/usePartModel';
import { useTranslator } from 'hooks/useTranslator';
import { globalStyles } from 'stitches.config';
import useApp from 'stores/useApp';
import usePartRegistry from 'stores/usePartRegistry';
import getStellarContext from 'utilities/getStellarContext';

const usePrerender = () => {
  const stellarContext = getStellarContext();
  useTranslator();
  globalStyles();
  useKeybinds();

  if (stellarContext.codeName !== 'dev') {
    console.log(
      '%cWARNING!',
      `
        background-color: red;
        color: white;
        font-size: 32px;
        font-weight: bold;
      `,
    );
    console.log(
      `%cDo not paste in anything here unless you know what you are doing!Malicious code can harm ${stellarContext.title} and your data (blueprints, snippets, etc.) permanently`,
      `
        background-color: orange;
        color: white;
        font-weight: bold;
        font-size: 16px;
      `,
    );
  }

  const version = stellarContext.version.split('.');
  document.title = `${stellarContext.title} ${version[0]}.${version[1]}`;

  const rerenderDocumentTitle = () => {
    const {
      file: { handle, hasUnsavedChanges },
    } = useApp.getState();

    document.title = `${stellarContext.title} ${
      handle ? `- ${handle.name}` : `${version[0]}.${version[1]}`
    }${hasUnsavedChanges ? '*' : ''}`;
  };

  useApp.subscribe(
    (state) => state.file.hasUnsavedChanges,
    rerenderDocumentTitle,
  );
  useApp.subscribe((state) => state.file.handle, rerenderDocumentTitle);

  usePartRegistry.getState().forEach(({ preload }) => {
    if (preload) {
      const preloads = typeof preload === 'string' ? [preload] : preload;

      preloads.forEach((fileName) => {
        useGLTF.preload(`${PART_MODEL_PATH}${fileName}.gltf`);
      });
    }
  });
};
export default usePrerender;
