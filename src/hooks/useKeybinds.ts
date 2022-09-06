import { mutateApp } from 'core/app/mutateApp';
import {
  fileExport,
  fileImport,
  fileOpen,
  fileSave,
  fileSaveAs,
  loadBlueprint,
  versionRedo,
  versionUndo,
} from 'core/blueprint';
import { popupClose, popupOpen } from 'core/interface';
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
import produce from 'immer';
import { isNull } from 'lodash';
import { bind as mousetrapBind } from 'mousetrap';
import { useEffect } from 'react';
import useApp, { Popup, Tab, Tool } from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import useSettings, { InterfaceMode, UseSettings } from 'stores/useSettings';
import { getInterfaceMode } from 'utilities/getInterfaceMode';

const tabOrder = [Tab.Create, Tab.Layout, Tab.Staging, Tab.Export];

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
  preventOnNonLayoutTab: boolean;
  action: 'keydown' | 'keyup' | 'keypress';
}

const bindDefaultOptions: BindOptions = {
  preventDefault: true,
  preventRepeats: true,
  preventWhenInteractingWithUI: true,
  preventOnNonLayoutTab: true,
  action: 'keydown',
};

const bind = (
  keys: string | string[],
  callback: () => void,
  options?: Partial<BindOptions>,
) => {
  const mergedOptions = { ...bindDefaultOptions, ...options };

  mousetrapBind(
    keys,
    (event) => {
      const {
        interface: { isInteracting, tab },
      } = useApp.getState();

      if (
        (mergedOptions.preventRepeats ? !event.repeat : true) &&
        (mergedOptions.preventWhenInteractingWithUI ? !isInteracting : true) &&
        (mergedOptions.preventOnNonLayoutTab ? tab === Tab.Layout : true)
      ) {
        if (mergedOptions.preventDefault) event.preventDefault();

        callback();
      }
    },
    mergedOptions.action,
  );
};

const useKeybinds = () => {
  const toTool = (tool: Tool) => () =>
    mutateApp((draft) => {
      draft.editor.tool = tool;
    });
  const toLayout = () =>
    mutateApp((draft) => {
      draft.interface.tab = Tab.Layout;
    });

  useEffect(() => {
    bind('ctrl+a', () => selectPartsOnly(useBlueprint.getState().part_order));
    bind(
      'esc',
      () => {
        const {
          interface: { popup },
        } = useApp.getState();

        if (!isNull(popup)) {
          popupClose();
        } else {
          unselectAllParts();
        }
      },
      { preventWhenInteractingWithUI: false },
    );

    bind(
      'p a r t y',
      () => {
        // party mode easter egg
        document.body.classList.toggle('party');
      },
      { preventOnNonLayoutTab: false },
    );

    bind(['del', 'backspace'], deletePartsBySelection);

    bind('alt+1', () => {
      useSettings.setState(
        produce((draft: UseSettings) => {
          draft.interface.tabs.layout.leftSidebar.visible =
            !draft.interface.tabs.layout.leftSidebar.visible;
        }),
      );
    });
    bind('alt+2', () => {
      useSettings.setState(
        produce((draft: UseSettings) => {
          if (getInterfaceMode() === InterfaceMode.Compact) {
            draft.interface.tabs.layout.rightSidebar.visible.inCompactMode =
              !draft.interface.tabs.layout.rightSidebar.visible.inCompactMode;
          } else {
            draft.interface.tabs.layout.rightSidebar.visible.inComfortableMode =
              !draft.interface.tabs.layout.rightSidebar.visible
                .inComfortableMode;
          }
        }),
      );
    });

    bind(
      ['ctrl+tab', ']'],
      () => {
        mutateApp((draft) => {
          draft.interface.tab =
            draft.interface.tab === tabOrder[tabOrder.length - 1]
              ? tabOrder[0]
              : tabOrder[tabOrder.indexOf(draft.interface.tab) + 1];
        });
      },
      { preventOnNonLayoutTab: false },
    );
    bind(
      ['ctrl+shift+tab', '['],
      () => {
        mutateApp((draft) => {
          draft.interface.tab =
            draft.interface.tab === 0
              ? tabOrder[tabOrder.length - 1]
              : tabOrder[tabOrder.indexOf(draft.interface.tab) - 1];
        });
      },
      { preventOnNonLayoutTab: false },
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
      preventRepeats: false,
    });
    bind(['ctrl+shift+z', 'ctrl+y'], versionRedo, {
      preventRepeats: false,
    });

    bind('1', toTool(Tool.Move));
    bind('2', toTool(Tool.Pan));

    bind(
      'space',
      () => {
        mutateApp((draft) => {
          draft.editor.isPanning = true;
        });
      },
      { preventRepeats: true, action: 'keydown' },
    );
    bind(
      'space',
      () => {
        mutateApp((draft) => {
          draft.editor.isPanning = false;
        });
      },
      { action: 'keyup' },
    );

    bind('ctrl+n', () => {
      loadBlueprint();
      toLayout();
    });
    bind('ctrl+o', () => {
      fileOpen();
      toLayout();
    });
    bind(
      'ctrl+s',
      () => {
        fileSave();
        toLayout();
      },
      { preventOnNonLayoutTab: true },
    );
    bind(
      'ctrl+shift+s',
      () => {
        fileSaveAs();
        toLayout();
      },
      { preventOnNonLayoutTab: true },
    );
    bind('ctrl+i', () => {
      fileImport();
      toLayout();
    });
    bind('ctrl+e', () => {
      fileExport();
      toLayout();
    });

    bind('ctrl+c', copyPartsBySelection);
    bind('ctrl+x', cutPartsBySelection);
    bind('ctrl+v', pasteParts);
    bind('ctrl+d', duplicateParts);
    bind('ctrl+g', groupPartsBySelection);
    bind('ctrl+shift+g', ungroupGroupsBySelection);

    bind('ctrl+shift+i', () => popupOpen(Popup.InsertPart));
    bind(['ctrl+r', 'f2'], () => {
      if (useBlueprint.getState().selections.length > 0) {
        popupOpen(Popup.RenameParts);
      }
    });
  }, []);
};
export default useKeybinds;
