import { invalidate } from '@react-three/fiber';
import { mutateSettings } from 'core/app';
import { mutateApp } from 'core/app/mutateApp';
import { mutatePopups } from 'core/app/mutatePopups';
import {
  exportFile,
  importFile,
  loadBlueprint,
  openFile,
  redoVersion,
  saveFile,
  saveFileAs,
  undoVersion,
} from 'core/blueprint';
import { popup } from 'core/interface/popup';
import {
  copyPartsBySelection,
  cutPartsBySelection,
  deletePartsBySelection,
  groupPartsBySelection,
  panToPartBySelection,
  pasteParts,
  selectAllPartsAtRoot,
  translateTranslatablePartsBySelection,
  ungroupGroupsBySelection,
  unselectAllParts,
} from 'core/part';
import { duplicatePartsBySelection } from 'core/part/duplicatePartsBySelection';
import { bind as mousetrapBind } from 'mousetrap';
import { useEffect } from 'react';
import { InsertPartPopup } from 'routes/components/InsertPartPopup';
import { RenamePartsPopup } from 'routes/components/RenamePartsPopup';
import useApp, { Tab, Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import usePopups from 'stores/popups';
import { InterfaceMode, UseSettings } from 'stores/settings';
import { getInterfaceMode } from 'utilities/getInterfaceMode';
import { DEFAULT_SNAP, MAJOR_SNAP } from 'utilities/getSnapDistance';

const TAB_ORDER = [Tab.Create, Tab.Layout, Tab.Staging, Tab.Export];

type PrimitiveVector2Tuple = [number, number];
const upVector: PrimitiveVector2Tuple = [0, DEFAULT_SNAP];
const downVector: PrimitiveVector2Tuple = [0, -DEFAULT_SNAP];
const leftVector: PrimitiveVector2Tuple = [-DEFAULT_SNAP, 0];
const rightVector: PrimitiveVector2Tuple = [DEFAULT_SNAP, 0];
const upMajorVector: PrimitiveVector2Tuple = [0, MAJOR_SNAP];
const downMajorVector: PrimitiveVector2Tuple = [0, -MAJOR_SNAP];
const leftMajorVector: PrimitiveVector2Tuple = [-MAJOR_SNAP, 0];
const rightMajorVector: PrimitiveVector2Tuple = [MAJOR_SNAP, 0];

const translate = (vector: PrimitiveVector2Tuple) => {
  translateTranslatablePartsBySelection(vector[0], vector[1]);
  invalidate();
};

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
      const { isInteracting, tab } = useApp.getState().interface;

      if (
        (mergedOptions.preventRepeats ? !event.repeat : true)
        && (mergedOptions.preventWhenInteractingWithUI ? !isInteracting : true)
        && (mergedOptions.preventOnNonLayoutTab ? tab === Tab.Layout : true)
      ) {
        if (mergedOptions.preventDefault) event.preventDefault();

        callback();
      }
    },
    mergedOptions.action,
  );
};

const useKeybinds = () => {
  const toTool = (tool: Tool) => () => mutateApp((draft) => {
    draft.editor.tool = tool;
  });
  const toLayout = () => mutateApp((draft) => {
    draft.interface.tab = Tab.Layout;
  });

  useEffect(() => {
    bind('ctrl+a', selectAllPartsAtRoot);
    bind(
      'esc',
      () => {
        if (usePopups.getState().popups.length > 0) {
          mutatePopups((draft) => {
            draft.popups.pop();
          });
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
      mutateSettings((draft: UseSettings) => {
        draft.interface.tabs.layout.leftSidebar.visible = !draft.interface.tabs.layout.leftSidebar.visible;
      });
    });
    bind('alt+2', () => {
      mutateSettings((draft: UseSettings) => {
        if (getInterfaceMode() === InterfaceMode.Compact) {
          draft.interface.tabs.layout.rightSidebar.visible.inCompactMode = !draft.interface.tabs.layout.rightSidebar.visible.inCompactMode;
        } else {
          draft.interface.tabs.layout.rightSidebar.visible.inComfortableMode = !draft.interface.tabs.layout.rightSidebar.visible.inComfortableMode;
        }
      });
    });
    bind('alt+f', () => {
      mutateApp((draft) => {
        draft.interface.focusMode = !draft.interface.focusMode;
      });
    });

    bind(
      ['ctrl+tab', ']'],
      () => {
        mutateApp((draft) => {
          draft.interface.tab = draft.interface.tab === TAB_ORDER[TAB_ORDER.length - 1]
            ? TAB_ORDER[0]
            : TAB_ORDER[TAB_ORDER.indexOf(draft.interface.tab) + 1];
        });
      },
      { preventOnNonLayoutTab: false },
    );
    bind(
      ['ctrl+shift+tab', '['],
      () => {
        mutateApp((draft) => {
          draft.interface.tab = draft.interface.tab === 0
            ? TAB_ORDER[TAB_ORDER.length - 1]
            : TAB_ORDER[TAB_ORDER.indexOf(draft.interface.tab) - 1];
        });
      },
      { preventOnNonLayoutTab: false },
    );

    bind('up', () => translate(upVector), {
      preventRepeats: false,
    });
    bind('down', () => translate(downVector), {
      preventRepeats: false,
    });
    bind('left', () => translate(leftVector), {
      preventRepeats: false,
    });
    bind('right', () => translate(rightVector), {
      preventRepeats: false,
    });
    bind('shift+up', () => translate(upMajorVector), {
      preventRepeats: false,
    });
    bind('shift+down', () => translate(downMajorVector), {
      preventRepeats: false,
    });
    bind('shift+left', () => translate(leftMajorVector), {
      preventRepeats: false,
    });
    bind('shift+right', () => translate(rightMajorVector), {
      preventRepeats: false,
    });

    bind('ctrl+z', undoVersion, {
      preventRepeats: false,
    });
    bind(['ctrl+shift+z', 'ctrl+y'], redoVersion, {
      preventRepeats: false,
    });

    bind('1', toTool(Tool.Move));
    bind('2', toTool(Tool.Pan));

    bind(
      'space',
      () => {
        mutateApp((draft) => {
          draft.editor.isSpacePanning = true;
        });
      },
      { preventRepeats: true, action: 'keydown' },
    );
    bind(
      'space',
      () => {
        mutateApp((draft) => {
          draft.editor.isSpacePanning = false;
        });
      },
      { action: 'keyup' },
    );

    bind('ctrl+n', () => {
      loadBlueprint();
      toLayout();
    });
    bind('ctrl+o', () => {
      openFile();
      toLayout();
    });
    bind(
      'ctrl+s',
      () => {
        saveFile();
        toLayout();
      },
      { preventOnNonLayoutTab: true },
    );
    bind(
      'ctrl+shift+s',
      () => {
        saveFileAs();
        toLayout();
      },
      { preventOnNonLayoutTab: true },
    );
    bind('ctrl+i', () => {
      importFile();
      toLayout();
    });
    bind('ctrl+e', () => {
      exportFile();
      toLayout();
    });

    bind('ctrl+c', copyPartsBySelection);
    bind('ctrl+x', cutPartsBySelection);
    bind('ctrl+v', pasteParts);
    bind('ctrl+d', duplicatePartsBySelection);
    bind('ctrl+g', groupPartsBySelection);
    bind('ctrl+shift+g', ungroupGroupsBySelection);

    bind('ctrl+shift+i', () => popup(InsertPartPopup, true, 'insert-part'));
    bind('ctrl+r', () => {
      if (useBlueprint.getState().selections.length > 0) {
        popup(RenamePartsPopup, true, 'rename-parts');
      }
    });

    bind('.', panToPartBySelection);
  }, []);
};
export default useKeybinds;
