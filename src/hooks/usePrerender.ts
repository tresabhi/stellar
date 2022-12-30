import mutateApp from 'core/app/mutateApp';
import useKeybinds from 'hooks/useKeybinds';
import useTranslator from 'hooks/useTranslator';
import globalStyles from 'stitches.config/styles/global';
import useApp from 'stores/app';
import useSettings from 'stores/settings';
import { getContext } from 'utilities/getContext';
import prettifyVersion from 'utilities/prettifyVersion';
import packageJSON from '../../package.json';

export default function usePrerender() {
  const { title } = getContext();
  useTranslator();
  globalStyles();
  useKeybinds();

  const prettifiedVersion = prettifyVersion(packageJSON.version);
  document.title = `${title}${
    prettifiedVersion ? ` ${prettifiedVersion}` : ''
  }`;

  const rerenderDocumentTitle = () => {
    const {
      file: { handle, hasUnsavedChanges },
    } = useApp.getState();

    document.title = `${title} ${
      handle ? `- ${handle.name}` : `${prettifiedVersion}`
    }${hasUnsavedChanges ? '*' : ''}`;
  };

  useApp.subscribe(
    (state) => state.file.hasUnsavedChanges,
    rerenderDocumentTitle,
  );
  useApp.subscribe((state) => state.file.handle, rerenderDocumentTitle);

  mutateApp((draft) => {
    draft.interface.tab = useSettings.getState().interface.defaultTab;
  });
}
