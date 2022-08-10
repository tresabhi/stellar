import {
  fileExport,
  fileImport,
  fileOpen,
  fileSaveAs,
  loadBlueprint,
  versionRedo,
  versionUndo,
} from 'core/blueprint';
import {
  copyPartsBySelection,
  cutPartsBySelection,
  deletePartsBySelection,
  duplicateParts,
  groupPartsBySelection,
  pasteParts,
  selectPartsOnly,
  translateTranslatablePartsBySelection as translate,
  ungroupGroupsBySelection,
  unselectAllParts,
} from 'core/part';
import useApp, { TAB, TOOL } from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useSettings, { UseSettings } from 'hooks/useSettings';
import produce from 'immer';
import { bind as mousetrapBind } from 'mousetrap';
import { useEffect } from 'react';

const tabOrder = [TAB.LAYOUT, TAB.STAGING, TAB.EXPORT];

// TODO: make this date driven
const TRANSLATE = 1;
const MAJOR_TRANSLATE = 10;

type PrimitiveVector2Tuple = [number, number];
const upVector: PrimitiveVector2Tuple = [0, TRANSLATE];
const downVector: PrimitiveVector2Tuple = [0, -TRANSLATE];
const leftVector: PrimitiveVector2Tuple = [-TRANSLATE, 0];
const rightVector: PrimitiveVector2Tuple = [TRANSLATE, 0];
const upMajorVector: PrimitiveVector2Tuple = [0, MAJOR_TRANSLATE];
const downMajorVector: PrimitiveVector2Tuple = [0, -MAJOR_TRANSLATE];
const leftMajorVector: PrimitiveVector2Tuple = [-MAJOR_TRANSLATE, 0];
const rightMajorVector: PrimitiveVector2Tuple = [MAJOR_TRANSLATE, 0];

interface BindOptions {
  preventDefault: boolean;
  preventRepeats: boolean;
  action: 'keydown' | 'keyup' | 'keypress';
}

const bindDefaultOptions: BindOptions = {
  preventDefault: false,
  preventRepeats: true,
  action: 'keydown',
};

const bind = (
  keys: string | string[],
  callback: () => void,
  options?: Partial<BindOptions>,
) => {
  const mergedOptions = { ...bindDefaultOptions, ...options };

  mousetrapBind(keys, (event) => {
    if (mergedOptions.preventRepeats ? !event.repeat : true) {
      if (mergedOptions.preventDefault) event.preventDefault();

      callback();
    }
  });
};

const useKeybinds = () => {
  // BIG TODO: Make this date driven
  const tool = (name: TOOL) => () => useApp.setState({ tool: name });

  useEffect(() => {
    bind('ctrl+a', () => selectPartsOnly(useBlueprint.getState().partOrder));
    bind('esc', unselectAllParts);

    bind('p a r t y', () => {
      // party mode easter egg
      document.body.classList.toggle('party');
    });

    bind('del', deletePartsBySelection);
    bind('backspace', deletePartsBySelection);

    bind(
      'alt+1',
      () => {
        useSettings.setState(
          produce((draft: UseSettings) => {
            draft.layout.leftSideBar.visible =
              !draft.layout.leftSideBar.visible;
          }),
        );
      },
      { preventDefault: true },
    );

    bind(
      'alt+2',
      () => {
        useSettings.setState(
          produce((draft: UseSettings) => {
            draft.layout.rightSideBar.visible =
              !draft.layout.rightSideBar.visible;
          }),
        );
      },
      { preventDefault: true },
    );

    bind(
      'ctrl+tab',
      () => {
        useApp.setState((state) => ({
          tab:
            state.tab === tabOrder[tabOrder.length - 1]
              ? tabOrder[0]
              : tabOrder[tabOrder.indexOf(state.tab) + 1],
        }));
      },
      { preventDefault: true },
    );

    bind('up', () => translate(...upVector), {
      preventRepeats: false,
    });
    bind('down', () => translate(...downVector), {
      preventRepeats: false,
    });
    bind('left', () => translate(...leftVector), {
      preventRepeats: false,
    });
    bind('right', () => translate(...rightVector), {
      preventRepeats: false,
    });
    bind('shift+up', () => translate(...upMajorVector), {
      preventRepeats: false,
    });
    bind('shift+down', () => translate(...downMajorVector), {
      preventRepeats: false,
    });
    bind('shift+left', () => translate(...leftMajorVector), {
      preventRepeats: false,
    });
    bind('shift+right', () => translate(...rightMajorVector), {
      preventRepeats: false,
    });

    bind('ctrl+z', versionUndo, {
      preventDefault: true,
      preventRepeats: false,
    });
    bind('ctrl+shift+z', versionRedo, {
      preventDefault: true,
      preventRepeats: false,
    });

    bind('1', tool(TOOL.MOVE));
    bind('2', tool(TOOL.PAN));

    bind(
      'space',
      () => {
        useApp.setState({
          isPanning: true,
        });
      },
      { preventRepeats: true, action: 'keydown' },
    );
    bind(
      'space',
      () => {
        useApp.setState({
          isPanning: false,
        });
      },
      { action: 'keyup' },
    );

    bind('ctrl+n', loadBlueprint, { preventDefault: true });
    bind('ctrl+o', fileOpen, { preventDefault: true });
    bind('ctrl+s', fileSaveAs, { preventDefault: true });
    bind('ctrl+i', fileImport, { preventDefault: true });
    bind('ctrl+e', fileExport, { preventDefault: true });

    bind('ctrl+c', copyPartsBySelection);
    bind('ctrl+x', cutPartsBySelection);
    bind('ctrl+v', pasteParts);
    bind('ctrl+d', duplicateParts, { preventDefault: true });
    bind('ctrl+g', groupPartsBySelection, { preventDefault: true });
    bind('ctrl+shift+g', ungroupGroupsBySelection, { preventDefault: true });
  }, []);
};
export default useKeybinds;
