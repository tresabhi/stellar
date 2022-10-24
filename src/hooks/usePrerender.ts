import useKeybinds from 'hooks/useKeybinds';
import { useTranslator } from 'hooks/useTranslator';
import { globalStyles } from 'stitches.config';
import useApp from 'stores/useApp';
import getStellarContext from 'utilities/getStellarContext';
import { prettifyVersion } from 'utilities/prettifyVersion';
import packageJSON from '../../package.json';

export const usePrerender = () => {
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

  // const version = stellarContext.version.split('.');
  // document.title = `${stellarContext.title} ${version[0]}.${version[1]}`;
  const prettifiedVersion = prettifyVersion(packageJSON.version);
  document.title = `${stellarContext.title}${
    prettifiedVersion ? ` ${prettifiedVersion}` : ''
  }`;

  const rerenderDocumentTitle = () => {
    const {
      file: { handle, hasUnsavedChanges },
    } = useApp.getState();

    document.title = `${stellarContext.title} ${
      handle ? `- ${handle.name}` : `${prettifiedVersion}`
    }${hasUnsavedChanges ? '*' : ''}`;
  };

  useApp.subscribe(
    (state) => state.file.hasUnsavedChanges,
    rerenderDocumentTitle,
  );
  useApp.subscribe((state) => state.file.handle, rerenderDocumentTitle);
};
