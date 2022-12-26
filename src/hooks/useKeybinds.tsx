import { invalidate } from '@react-three/fiber';
import mutateApp from 'core/app/mutateApp';
import mutatePrompts from 'core/app/mutatePrompts';
import mutateSettings from 'core/app/mutateSettings';
import exportFile from 'core/blueprint/exportFile';
import importFile from 'core/blueprint/importFile';
import loadBlueprint from 'core/blueprint/loadBlueprint';
import openFile from 'core/blueprint/openFile';
import redoVersion from 'core/blueprint/redoVersion';
import saveFile from 'core/blueprint/saveFile';
import saveFileAs from 'core/blueprint/saveFileAs';
import undoVersion from 'core/blueprint/undoVersion';
import prompt from 'core/interface/prompt';
import copySelected from 'core/part/copySelected';
import cutPartsBySelection from 'core/part/cutSelected';
import deleteSelected from 'core/part/deleteSelected';
import duplicateSelected from 'core/part/duplicateSelected';
import groupSelected from 'core/part/groupSelected';
import panToSelected from 'core/part/panToSelected';
import paste from 'core/part/paste';
import selectConcurrentAtRoot from 'core/part/selectConcurrentAtRoot';
import translateSelectedRecursive from 'core/part/translateSelectedRecursive';
import ungroupSelected from 'core/part/ungroupSelected';
import unselectAll from 'core/part/unselectAll';
import { bind as mousetrapBind } from 'mousetrap';
import { useEffect } from 'react';
import InsertPartPrompt from 'routes/components/InsertPartPrompt';
import RenamePartsPrompt from 'routes/components/RenamePartsPrompt';
import useApp, { Tab, Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import usePrompts from 'stores/prompts';
import { InterfaceMode, UseSettings } from 'stores/settings';
import { MethodIds } from 'types/Parts';
import getInterfaceMode from 'utilities/getInterfaceMode';
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
  translateSelectedRecursive(vector[0], vector[1]);
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
  keys: MethodIds,
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
    bind('ctrl+a', selectConcurrentAtRoot);
    bind(
      'esc',
      () => {
        if (usePrompts.getState().prompts.length > 0) {
          mutatePrompts((draft) => {
            draft.prompts.pop();
          });
        } else {
          unselectAll();
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

    bind(['del', 'backspace'], deleteSelected);

    bind('alt+1', () => {
      mutateSettings((draft: UseSettings) => {
        const { leftSidebar } = draft.interface.tabs.layout;
        leftSidebar.visible = !leftSidebar.visible;
      });
    });
    bind('alt+2', () => {
      mutateSettings((draft: UseSettings) => {
        const { visible } = draft.interface.tabs.layout.rightSidebar;

        if (getInterfaceMode() === InterfaceMode.Compact) {
          visible.inCompactMode = !visible.inCompactMode;
        } else {
          visible.inComfortableMode = !visible.inComfortableMode;
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

    bind('ctrl+c', copySelected);
    bind('ctrl+x', cutPartsBySelection);
    bind('ctrl+v', paste);
    bind('ctrl+d', duplicateSelected);
    bind('ctrl+g', groupSelected);
    bind('ctrl+shift+g', ungroupSelected);

    bind('ctrl+shift+i', () => prompt(InsertPartPrompt, true, 'insert-part'));
    bind('ctrl+r', () => {
      if (useBlueprint.getState().selections.length > 0) {
        prompt(RenamePartsPrompt, true, 'rename-parts');
      }
    });

    bind('.', panToSelected);
  }, []);
};
export default useKeybinds;
