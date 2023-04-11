import { invalidate } from '@react-three/fiber';
import { POSITION_SNAP_SIZE } from 'components/Canvas/components/TransformControls/components/TransformNode';
import { WEBSITE } from 'constants/social';
import { GH_REPO_URL } from 'constants/sourceCode';
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
import confirmProgressReset from 'core/interface/confirmProgressReset';
import prompt from 'core/interface/prompt';
import copySelected from 'core/part/copySelected';
import createSnippetSelected from 'core/part/createSnippetSelected';
import cutPartsBySelection from 'core/part/cutSelected';
import deleteSelected from 'core/part/deleteSelected';
import duplicateSelected from 'core/part/duplicateSelected';
import enterEditMode from 'core/part/enterEditMode';
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
import SettingsPrompt from 'routes/components/SettingsPrompt';
import useApp, { Tab, Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import usePrompts from 'stores/prompts';
import { UseSettings } from 'stores/settings';
import { MethodIds } from 'types/Parts';
import getTouchscreenMode from 'utilities/getTouchscreenMode';

export const TAB_ORDER = [Tab.Create, Tab.Layout, Tab.Staging, Tab.Export];

type PrimitiveVector2Tuple = [number, number];

const translate = (vector: PrimitiveVector2Tuple) => {
  translateSelectedRecursive(vector[0], vector[1]);
  invalidate();
};

interface BindOptions {
  preventDefault: boolean;
  preventRepeats: boolean;
  preventWhenInteractingWithUI: boolean;
  preventOnNonEditingTab: boolean;
  preventOnNonTransformTool: boolean;
  action: 'keydown' | 'keyup' | 'keypress';
}

const bindDefaultOptions: BindOptions = {
  preventDefault: true,
  preventRepeats: true,
  preventWhenInteractingWithUI: true,
  preventOnNonEditingTab: true,
  preventOnNonTransformTool: false,
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
      if (mergedOptions.preventDefault) event.preventDefault();
      const {
        interface: { isInteracting, tab },
        editor: { tool, isSpacePanning, isTouchPanning },
      } = useApp.getState();

      if (
        (mergedOptions.preventRepeats ? !event.repeat : true) &&
        (mergedOptions.preventWhenInteractingWithUI ? !isInteracting : true) &&
        (mergedOptions.preventOnNonEditingTab
          ? tab === Tab.Layout || tab === Tab.Staging
          : true) &&
        (mergedOptions.preventOnNonTransformTool
          ? tool === Tool.Transform && !isSpacePanning && !isTouchPanning
          : true)
      ) {
        callback();
      }
    },
    mergedOptions.action,
  );
};

export default function useKeybinds() {
  const toTool = (tool: Tool) => () =>
    mutateApp((draft) => {
      draft.editor.tool = tool;
    });
  const toLayout = () =>
    mutateApp((draft) => {
      draft.interface.tab = Tab.Layout;
    });

  useEffect(() => {
    bind('ctrl+a', selectConcurrentAtRoot, { preventOnNonTransformTool: true });
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

        if (useApp.getState().editor.tool === Tool.Edit) {
          mutateApp((draft) => {
            draft.editor.tool = Tool.Transform;
          });
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
      { preventOnNonEditingTab: false },
    );

    bind(['del', 'backspace'], deleteSelected, {
      preventOnNonTransformTool: true,
    });

    bind('alt+1', () => {
      mutateSettings((draft: UseSettings) => {
        const { leftSidebar } = draft.interface.tabs.layout;
        leftSidebar.visible = !leftSidebar.visible;
      });
    });
    bind('alt+2', () => {
      mutateSettings((draft: UseSettings) => {
        const { visible } = draft.interface.tabs.layout.rightSidebar;

        if (getTouchscreenMode()) {
          visible.inTouchscreenMode = !visible.inTouchscreenMode;
        } else {
          visible.inDesktopMode = !visible.inDesktopMode;
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
          draft.interface.tab =
            draft.interface.tab === TAB_ORDER[TAB_ORDER.length - 1]
              ? TAB_ORDER[0]
              : TAB_ORDER[TAB_ORDER.indexOf(draft.interface.tab) + 1];
        });
      },
      { preventOnNonEditingTab: false },
    );
    bind(
      ['ctrl+shift+tab', '['],
      () => {
        mutateApp((draft) => {
          draft.interface.tab =
            draft.interface.tab === 0
              ? TAB_ORDER[TAB_ORDER.length - 1]
              : TAB_ORDER[TAB_ORDER.indexOf(draft.interface.tab) - 1];
        });
      },
      { preventOnNonEditingTab: false },
    );

    bind('up', () => translate([0, POSITION_SNAP_SIZE]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('down', () => translate([0, -POSITION_SNAP_SIZE]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('left', () => translate([-POSITION_SNAP_SIZE, 0]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('right', () => translate([POSITION_SNAP_SIZE, 0]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+up', () => translate([0, 1]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+down', () => translate([0, -1]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+left', () => translate([-1, 0]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+right', () => translate([1, 0]), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });

    bind('ctrl+z', undoVersion, {
      preventRepeats: false,
    });
    bind(['ctrl+shift+z', 'ctrl+y'], redoVersion, {
      preventRepeats: false,
    });

    bind('1', toTool(Tool.Pan));
    bind(['2', 'v'], toTool(Tool.Transform));
    bind(['3', 'enter'], enterEditMode);

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

    bind(
      'ctrl+n',
      async () => {
        toLayout();
        if (await confirmProgressReset()) loadBlueprint();
      },
      { preventOnNonEditingTab: false },
    );
    bind(
      'ctrl+o',
      async () => {
        await openFile();
        if (await confirmProgressReset()) toLayout();
      },
      { preventOnNonEditingTab: false },
    );
    bind('ctrl+s', () => saveFile());
    bind('ctrl+shift+s', () => saveFileAs());
    bind(
      'ctrl+i',
      async () => {
        await importFile();
        if (await confirmProgressReset()) toLayout();
      },
      { preventOnNonEditingTab: false },
    );
    bind('ctrl+e', () => exportFile());

    bind('ctrl+c', copySelected, { preventOnNonTransformTool: true });
    bind('ctrl+x', cutPartsBySelection, { preventOnNonTransformTool: true });
    bind('ctrl+v', paste, { preventOnNonTransformTool: true });
    bind('ctrl+d', duplicateSelected, { preventOnNonTransformTool: true });
    bind('ctrl+g', groupSelected, { preventOnNonTransformTool: true });
    bind('ctrl+shift+g', ungroupSelected, { preventOnNonTransformTool: true });
    bind('ctrl+m', createSnippetSelected, { preventOnNonTransformTool: true });

    bind('i', () => prompt(InsertPartPrompt, true, 'insert-part'), {
      preventOnNonTransformTool: true,
    });
    bind('f2', () => {
      if (useBlueprint.getState().selections.length > 0) {
        prompt(RenamePartsPrompt, true, 'rename-parts');
      }
    });
    bind('ctrl+,', () => prompt(SettingsPrompt), {
      preventOnNonEditingTab: false,
    });

    bind('.', panToSelected);

    bind('f1', () => window.open(WEBSITE, '_blank'), {
      preventOnNonEditingTab: false,
    });
    bind('f4', () => window.open(`${GH_REPO_URL}issues/new/choose`, '_blank'), {
      preventOnNonEditingTab: false,
    });
  }, []);
}
