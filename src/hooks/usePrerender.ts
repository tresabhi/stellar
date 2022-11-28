import useKeybinds from 'hooks/useKeybinds';
import { useTranslator } from 'hooks/useTranslator';
import { globalStyles } from 'stitches.config';
import useApp from 'stores/app';
import getStellarContext from 'utilities/getStellarContext';
import { prettifyVersion } from 'utilities/prettifyVersion';
import packageJSON from '../../package.json';

export const usePrerender = () => {
  const stellarContext = getStellarContext();
  useTranslator();
  globalStyles();
  useKeybinds();

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
