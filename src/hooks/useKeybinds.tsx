import { invalidate } from '@react-three/fiber';
import {
  MOVE_STEP_MAJOR,
  MOVE_STEP_REGULAR,
} from 'components/LayoutCanvas/components/Outlines/components/TransformControls/components/TransformNode';
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
import prompt from 'core/interface/prompt';
import copySelected from 'core/part/copySelected';
import cutPartsBySelection from 'core/part/cutSelected';
import deleteSelected from 'core/part/deleteSelected';
import duplicateSelected from 'core/part/duplicateSelected';
import groupSelected from 'core/part/groupSelected';
import panToSelected from 'core/part/panToSelected';
import paste from 'core/part/paste';
import selectConcurrent from 'core/part/selectConcurrent';
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
const upVector: PrimitiveVector2Tuple = [0, MOVE_STEP_REGULAR];
const downVector: PrimitiveVector2Tuple = [0, -MOVE_STEP_REGULAR];
const leftVector: PrimitiveVector2Tuple = [-MOVE_STEP_REGULAR, 0];
const rightVector: PrimitiveVector2Tuple = [MOVE_STEP_REGULAR, 0];
const upMajorVector: PrimitiveVector2Tuple = [0, MOVE_STEP_MAJOR];
const downMajorVector: PrimitiveVector2Tuple = [0, -MOVE_STEP_MAJOR];
const leftMajorVector: PrimitiveVector2Tuple = [-MOVE_STEP_MAJOR, 0];
const rightMajorVector: PrimitiveVector2Tuple = [MOVE_STEP_MAJOR, 0];

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

    bind('up', () => translate(upVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('down', () => translate(downVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('left', () => translate(leftVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('right', () => translate(rightVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+up', () => translate(upMajorVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+down', () => translate(downMajorVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+left', () => translate(leftMajorVector), {
      preventRepeats: false,
      preventOnNonTransformTool: true,
    });
    bind('shift+right', () => translate(rightMajorVector), {
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
    bind(['3', 'enter'], () => {
      const { tool } = useApp.getState().editor;

      if (tool === Tool.Edit) {
        mutateApp((draft) => {
          draft.editor.tool = Tool.Transform;
        });
      } else {
        const { selections } = useBlueprint.getState();

        if (selections.length >= 1) {
          if (selections.length > 1) selectConcurrent(selections[0]);
          mutateApp((draft) => {
            draft.editor.tool = Tool.Edit;
          });
        }
      }
    });

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
      () => {
        loadBlueprint();
        toLayout();
      },
      { preventOnNonEditingTab: false },
    );
    bind(
      'ctrl+o',
      async () => {
        await openFile();
        toLayout();
      },
      { preventOnNonEditingTab: false },
    );
    bind('ctrl+s', () => saveFile());
    bind('ctrl+shift+s', () => saveFileAs());
    bind(
      'ctrl+i',
      async () => {
        await importFile();
        toLayout();
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

    bind('ctrl+shift+i', () => prompt(InsertPartPrompt, true, 'insert-part'), {
      preventOnNonTransformTool: true,
    });
    bind('ctrl+r', () => {
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
