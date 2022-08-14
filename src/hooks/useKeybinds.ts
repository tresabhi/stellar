import { fileExport, fileImport, fileOpen, fileSaveAs, loadBlueprint, versionRedo, versionUndo } from 'core/blueprint';
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
import { popupClose, popupOpen } from 'core/ui';
import useApp, { POPUP, TAB, TOOL } from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useSettings, { UseSettings } from 'hooks/useSettings';
import produce from 'immer';
import { isNull } from 'lodash';
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
  preventWhenInteractingWithUI: boolean;
  action: 'keydown' | 'keyup' | 'keypress';
}

const bindDefaultOptions: BindOptions = {
  preventDefault: true,
  preventRepeats: true,
  preventWhenInteractingWithUI: true,
  action: 'keydown',
};

const bind = (keys: string | string[], callback: () => void, options?: Partial<BindOptions>) => {
  const mergedOptions = { ...bindDefaultOptions, ...options };

  mousetrapBind(
    keys,
    (event) => {
      const { isInteractingWithUI } = useApp.getState();

      if (
        (mergedOptions.preventRepeats ? !event.repeat : true) &&
        (mergedOptions.preventWhenInteractingWithUI ? !isInteractingWithUI : true)
      ) {
        if (mergedOptions.preventDefault) event.preventDefault();

        callback();
      }
    },
    mergedOptions.action,
  );
};

const useKeybinds = () => {
  // BIG TODO: Make this date driven
  const tool = (name: TOOL) => () => useApp.setState({ tool: name });

  useEffect(() => {
    bind('ctrl+a', () => selectPartsOnly(useBlueprint.getState().part_order));
    bind(
      'esc',
      () => {
        const { popup } = useApp.getState();

        if (!isNull(popup)) {
          popupClose();
        } else {
          unselectAllParts();
        }
      },
      { preventWhenInteractingWithUI: false },
    );

    bind('p a r t y', () => {
      // party mode easter egg
      document.body.classList.toggle('party');
    });

    bind('del', deletePartsBySelection);
    bind('backspace', deletePartsBySelection);

    bind('alt+1', () => {
      useSettings.setState(
        produce((draft: UseSettings) => {
          draft.layout.leftSideBar.visible = !draft.layout.leftSideBar.visible;
        }),
      );
    });

    bind('alt+2', () => {
      useSettings.setState(
        produce((draft: UseSettings) => {
          draft.layout.rightSideBar.visible = !draft.layout.rightSideBar.visible;
        }),
      );
    });

    bind('ctrl+tab', () => {
      useApp.setState((state) => ({
        tab: state.tab === tabOrder[tabOrder.length - 1] ? tabOrder[0] : tabOrder[tabOrder.indexOf(state.tab) + 1],
      }));
    });

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
      preventRepeats: false,
    });
    bind('ctrl+shift+z', versionRedo, {
      preventRepeats: false,
    });
    bind('ctrl+y', versionRedo, {
      preventRepeats: false,
    });

    bind('1', tool(TOOL.MOVE));
    bind('2', tool(TOOL.PAN));

    bind(
      'space',
      () => {
        useApp.setState({ isPanning: true });
      },
      { preventRepeats: true, action: 'keydown' },
    );
    bind(
      'space',
      () => {
        useApp.setState({ isPanning: false });
      },
      { action: 'keyup' },
    );

    bind('ctrl+n', loadBlueprint);
    bind('ctrl+o', fileOpen);
    bind('ctrl+s', fileSaveAs);
    bind('ctrl+i', fileImport);
    bind('ctrl+e', fileExport);

    bind('ctrl+c', copyPartsBySelection);
    bind('ctrl+x', cutPartsBySelection);
    bind('ctrl+v', pasteParts);
    bind('ctrl+d', duplicateParts);
    bind('ctrl+g', groupPartsBySelection);
    bind('ctrl+shift+g', ungroupGroupsBySelection);
    bind('ctrl+shift+i', () => popupOpen(POPUP.ADD_PART));
  }, []);
};
export default useKeybinds;
