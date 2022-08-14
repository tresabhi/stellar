import useApp from 'stores/useApp';
import useKeybinds from 'hooks/useKeybinds';
import useStellarContext from 'hooks/useStellarContext';
import useTranslator from 'hooks/useTranslator';
import { isMobile } from 'react-device-detect';
import { globalStyles, themeDark } from 'stitches.config';

const usePostrender = () => {
  const stellarContext = useStellarContext();
  useTranslator();
  globalStyles();
  useKeybinds();

  // Temporarily enforce dark mode
  document.getElementById('root')?.classList.add(themeDark);

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

  if (window.location.pathname === '/') {
    window.location.pathname = isMobile ? '/mobile' : '/desktop';
  }

  const version = stellarContext.version.split('.');
  document.title = `${stellarContext.title} ${version[0]}.${version[1]}`;

  const rerenderDocumentTitle = () => {
    const { fileHandle } = useApp.getState();
    const { hasUnsavedChanges } = useApp.getState();

    document.title = `${stellarContext.title} ${fileHandle ? `- ${fileHandle.name}` : `${version[0]}.${version[1]}`}${
      hasUnsavedChanges ? '*' : ''
    }`;
  };

  useApp.subscribe((state) => state.hasUnsavedChanges, rerenderDocumentTitle);
  useApp.subscribe((state) => state.fileHandle, rerenderDocumentTitle);
};
export default usePostrender;
