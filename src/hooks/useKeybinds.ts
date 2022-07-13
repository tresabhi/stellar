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
import { bind } from 'mousetrap';
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

const useKeybinds = () => {
  // BIG TODO: Make this date driven
  const tool = (name: TOOL) => () => useApp.setState({ tool: name });

  useEffect(() => {
    bind('ctrl+a', () => selectPartsOnly(useBlueprint.getState().partOrder));
    bind('esc', () => unselectAllParts());

    bind('p a r t y', () => {
      // party mode easter egg
      document.body.classList.toggle('party');
    });

    bind('del', deletePartsBySelection);
    bind('backspace', deletePartsBySelection);

    bind('alt+1', (event) => {
      event?.preventDefault();

      useSettings.setState(
        produce((draft: UseSettings) => {
          draft.layout.leftSideBar.visible = !draft.layout.leftSideBar.visible;
        }),
      );
    });

    bind('alt+2', (event) => {
      event?.preventDefault();

      useSettings.setState(
        produce((draft: UseSettings) => {
          draft.layout.rightSideBar.visible =
            !draft.layout.rightSideBar.visible;
        }),
      );
    });

    bind('ctrl+tab', (event) => {
      useApp.setState((state) => ({
        tab:
          state.tab === tabOrder[tabOrder.length - 1]
            ? tabOrder[0]
            : tabOrder[tabOrder.indexOf(state.tab) + 1],
      }));
    });

    bind('up', () => translate(...upVector));
    bind('down', () => translate(...downVector));
    bind('left', () => translate(...leftVector));
    bind('right', () => translate(...rightVector));
    bind('shift+up', () => translate(...upMajorVector));
    bind('shift+down', () => translate(...downMajorVector));
    bind('shift+left', () => translate(...leftMajorVector));
    bind('shift+right', () => translate(...rightMajorVector));

    bind('ctrl+z', (event) => {
      event.preventDefault();
      versionUndo();
    });
    bind('ctrl+shift+z', (event) => {
      event.preventDefault();
      versionRedo();
    });

    bind('1', tool(TOOL.MOVE));
    bind('2', tool(TOOL.PAN));

    bind(
      'space',
      (event) => {
        if (!event.repeat) {
          useApp.setState((draft) => {
            draft.isPanning = true;
          });
        }
      },
      'keydown',
    );
    bind(
      'space',
      () => {
        useApp.setState((draft) => {
          draft.isPanning = false;
        });
      },
      'keyup',
    );
  }, []);

  bind('ctrl+n', (event) => {
    event.preventDefault();
    loadBlueprint();
  });
  bind('ctrl+o', (event) => {
    event.preventDefault();
    fileOpen();
  });
  bind('ctrl+s', (event) => {
    event.preventDefault();
    fileSaveAs();
  });
  bind('ctrl+i', fileImport);
  bind('ctrl+e', (event) => {
    event.preventDefault();
    fileExport();
  });

  bind('ctrl+c', () => copyPartsBySelection());
  bind('ctrl+x', () => cutPartsBySelection());
  bind('ctrl+v', pasteParts);
  bind('ctrl+d', (event) => {
    event.preventDefault();
    duplicateParts();
  });
  bind('ctrl+g', (event) => {
    event.preventDefault();
    groupPartsBySelection();
  });
  bind('ctrl+shift+g', (event) => {
    event.preventDefault();
    ungroupGroupsBySelection();
  });
};
export default useKeybinds;
