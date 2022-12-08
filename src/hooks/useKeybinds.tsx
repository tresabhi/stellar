import { MagnifyingGlassIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { CheckboxWithLabel } from 'components/CheckboxWithLabel';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Popup from 'components/Popup';
import { SearchItem } from 'components/Search';
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
import { dismissPopup } from 'core/interface/dismissPopup';
import { popup } from 'core/interface/popup';
import {
  copyPartsBySelection,
  cutPartsBySelection,
  deletePartsBySelection,
  getParent,
  getPart,
  groupPartsBySelection,
  insertNewPart,
  panToPartBySelection,
  pasteParts,
  selectAllPartsAtRoot,
  translateTranslatablePartsBySelection,
  ungroupGroupsBySelection,
  unselectAllParts,
} from 'core/part';
import { duplicatePartsBySelection } from 'core/part/duplicatePartsBySelection';
import { RenamePartsOptions } from 'core/part/renameParts';
import { renamePartsBySelection } from 'core/part/renamePartsBySelection';
import { useTranslator } from 'hooks/useTranslator';
import { bind as mousetrapBind } from 'mousetrap';
import { FC, KeyboardEvent, useEffect, useRef } from 'react';
import useApp, { Tab, Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import usePartRegistry from 'stores/partRegistry';
import usePopups, { PopupProps } from 'stores/popups';
import useSettings, { InterfaceMode, UseSettings } from 'stores/settings';
import { getInterfaceMode } from 'utilities/getInterfaceMode';
import { DEFAULT_SNAP, MAJOR_SNAP } from 'utilities/getSnapDistance';
import { usePopupConcurrency } from './usePopupConcurrency';

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
  const { invalidateFrame } = useApp.getState().editor;

  translateTranslatablePartsBySelection(vector[0], vector[1]);
  invalidateFrame && invalidateFrame();
};

// TODO: clean this up
export const InsertPartPopup: FC<PopupProps> = ({ id }) => {
  const { t } = useTranslator();
  const input = useRef<HTMLInputElement>(null);
  const list: SearchItem[] = [];
  const partRegistry = usePartRegistry();
  const { selections } = useBlueprint.getState();
  const lastSelectionId = selections[selections.length - 1];
  const lastSelection = getPart(lastSelectionId);
  let parentId: string | null = null;
  let index: number | undefined = undefined;

  if (lastSelection) {
    if (lastSelection.n === 'Group') {
      parentId = lastSelectionId;
    } else {
      const parent = getParent(lastSelectionId);

      if (parent) {
        parentId = parent.id;
        index = parent.part_order.indexOf(lastSelectionId);
      }
    }
  }

  const handleEscape = () => dismissPopup(id);
  const handleCancelClick = () => dismissPopup(id);

  partRegistry.forEach(({ vanillaData, Icon, data: { label } }, name) => {
    const note =
      vanillaData === null
        ? t`tabs.layout.popup.insert_part.abstract`
        : undefined;

    const handleClick = () => {
      insertNewPart(name, parentId, {
        index,
        nearCamera: true,
        select: true,
      });
      dismissPopup(id);
    };

    list.push({
      string:
        vanillaData === null
          ? `${label} ${t`tabs.layout.popup.insert_part.abstract`}`
          : label,
      node: (
        <Popup.SearchItem
          key={`part-${name}`}
          icon={<Icon />}
          note={note}
          onClick={handleClick}
        >
          {label}
        </Popup.SearchItem>
      ),
      callback: handleClick,
    });
  });

  usePopupConcurrency();

  return (
    <Popup.Container>
      <InputWithIcon
        ref={input}
        icon={<MagnifyingGlassIcon />}
        placeholder={t`tabs.layout.popup.insert_part.input_placeholder`}
        autoFocus
      />

      <Popup.Search
        list={list}
        input={input}
        fallback={
          <Popup.SearchFallback>{t`tabs.layout.popup.insert_part.fallback`}</Popup.SearchFallback>
        }
        escape={handleEscape}
      />

      <Popup.Actions>
        <Popup.Action
          onClick={handleCancelClick}
        >{t`tabs.layout.popup.insert_part.cancel`}</Popup.Action>
      </Popup.Actions>
    </Popup.Container>
  );
};

export const RenamePartsPopup: FC<PopupProps> = ({ id }) => {
  const { t } = useTranslator();
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null);
  const apply = () => {
    input.current &&
      renamePartsBySelection(
        input.current.value,
        useSettings.getState().editor.rename,
      );
    dismissPopup(id);
  };
  const handleClick = (type: keyof RenamePartsOptions) => {
    return () => {
      mutateSettings((draft) => {
        draft.editor.rename[type] = !draft.editor.rename[type];
      });
    };
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      apply();
    } else if (event.key === 'Escape') {
      dismissPopup(id);
    }
  };
  const handleCancelClick = () => dismissPopup(id);
  const handleApplyClick = apply;

  usePopupConcurrency();

  return (
    <Popup.Container>
      <InputWithIcon
        ref={input}
        onKeyDown={handleKeyDown}
        autoFocus
        icon={<Pencil1Icon />}
        placeholder={t`tabs.layout.popup.rename.input_placeholder`}
      />

      <Popup.Content>
        <CheckboxWithLabel
          defaultValue={rename.trim}
          onChange={handleClick('trim')}
        >
          {t`tabs.layout.popup.rename.trim`}
        </CheckboxWithLabel>
        <CheckboxWithLabel
          defaultValue={rename.skipLocked}
          onChange={handleClick('skipLocked')}
        >
          {t`tabs.layout.popup.rename.skip_locked`}
        </CheckboxWithLabel>
        <CheckboxWithLabel
          defaultValue={rename.suffix}
          onChange={handleClick('suffix')}
        >
          {t`tabs.layout.popup.rename.suffix`}
        </CheckboxWithLabel>
      </Popup.Content>

      <Popup.Actions>
        <Popup.Action
          onClick={handleCancelClick}
        >{t`tabs.layout.popup.rename.cancel`}</Popup.Action>
        <Popup.Action
          onClick={handleApplyClick}
          priority="callToAction"
          color="accent"
        >
          {t`tabs.layout.popup.rename.apply`}
        </Popup.Action>
      </Popup.Actions>
    </Popup.Container>
  );
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
        draft.interface.tabs.layout.leftSidebar.visible =
          !draft.interface.tabs.layout.leftSidebar.visible;
      });
    });
    bind('alt+2', () => {
      mutateSettings((draft: UseSettings) => {
        if (getInterfaceMode() === InterfaceMode.Compact) {
          draft.interface.tabs.layout.rightSidebar.visible.inCompactMode =
            !draft.interface.tabs.layout.rightSidebar.visible.inCompactMode;
        } else {
          draft.interface.tabs.layout.rightSidebar.visible.inComfortableMode =
            !draft.interface.tabs.layout.rightSidebar.visible.inComfortableMode;
        }
      });
    });
    bind('alt+z', () => {
      mutateApp((draft) => {
        draft.interface.zenMode = !draft.interface.zenMode;
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
      { preventOnNonLayoutTab: false },
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

    bind('ctrl+shift+i', () => popup(InsertPartPopup, 'insert-part'));
    bind('ctrl+r', () => {
      if (useBlueprint.getState().selections.length > 0) {
        popup(RenamePartsPopup, 'rename-parts');
      }
    });

    bind('.', panToPartBySelection);
  }, []);
};
export default useKeybinds;
