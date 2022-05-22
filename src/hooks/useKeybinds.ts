import { fileSave, versionRedo, versionUndo } from 'core/blueprint';
import {
  deletePartsBySelection,
  groupPartsBySelection,
  selectPartsOnly,
  translateTranslatablePartsBySelection as translate,
  unselectAllParts,
} from 'core/part';
import useApp, { ToolType } from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
import useSettings, { UseSettings } from 'hooks/useSettings';
import produce from 'immer';
import { bind } from 'mousetrap';
import { useEffect } from 'react';
import { Vector2 } from 'three';

const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

// TODO: make this date driven
const TRANSLATE = 1;
const MAJOR_TRANSLATE = 10;

const upVector = new Vector2(0, TRANSLATE);
const downVector = new Vector2(0, -TRANSLATE);
const leftVector = new Vector2(-TRANSLATE, 0);
const rightVector = new Vector2(TRANSLATE, 0);
const upMajorVector = new Vector2(0, MAJOR_TRANSLATE);
const downMajorVector = new Vector2(0, -MAJOR_TRANSLATE);
const leftMajorVector = new Vector2(-MAJOR_TRANSLATE, 0);
const rightMajorVector = new Vector2(MAJOR_TRANSLATE, 0);

const useKeybinds = () => {
  // BIG TODO: Make this date driven
  const tool = (name: ToolType) => () => useApp.setState({ tool: name });

  useEffect(() => {
    bind('ctrl+a', () => selectPartsOnly(useBlueprint.getState().partOrder));
    bind('esc', unselectAllParts);

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

    bind('up', () => translate(upVector));
    bind('down', () => translate(downVector));
    bind('left', () => translate(leftVector));
    bind('right', () => translate(rightVector));
    bind('shift+up', () => translate(upMajorVector));
    bind('shift+down', () => translate(downMajorVector));
    bind('shift+left', () => translate(leftMajorVector));
    bind('shift+right', () => translate(rightMajorVector));

    bind('ctrl+z', (event) => {
      event.preventDefault();
      versionUndo();
    });
    bind('ctrl+shift+z', (event) => {
      event.preventDefault();
      versionRedo();
    });

    bind('ctrl+g', (event) => {
      event.preventDefault();
      groupPartsBySelection();
    });

    bind('ctrl+s', (event) => {
      event.preventDefault();
      fileSave();
    });

    bind('1', tool('transform'));
    bind('2', tool('pan'));

    bind(
      'space',
      () => {
        useApp.setState((draft) => {
          draft.isSpaceDown = true;
        });
      },
      'keydown',
    );
    bind(
      'space',
      () => {
        useApp.setState((draft) => {
          draft.isSpaceDown = false;
        });
      },
      'keyup',
    );
  }, []);
};
export default useKeybinds;
