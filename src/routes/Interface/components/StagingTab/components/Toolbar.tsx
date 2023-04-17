import {
  CardStackPlusIcon,
  CursorArrowIcon,
  HandIcon,
  ResetIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import * as ToolbarPrimitive from 'components/Toolbar';
import mutateApp from 'core/app/mutateApp';
import deleteSelectedStage from 'core/blueprint/deleteSelectedStage';
import insertStage from 'core/blueprint/insertStage';
import redoVersion from 'core/blueprint/redoVersion';
import undoVersion from 'core/blueprint/undoVersion';
import useTranslator from 'hooks/useTranslator';
import { useEffect } from 'react';
import useApp, { Tool } from 'stores/app';
import useVersionControl from 'stores/versionControl';

function Toolbar() {
  const { t } = useTranslator();
  const hasUndos = useVersionControl((state) => state.index > -1);
  const hasRedos = useVersionControl(
    (state) => state.history.length - 1 > state.index,
  );
  const tool = useApp((state) =>
    state.editor.isSpacePanning || state.editor.isTouchPanning
      ? Tool.Pan
      : state.editor.tool,
  );

  useEffect(() => {
    mutateApp((draft) => {
      if (draft.editor.tool !== Tool.Pan) draft.editor.tool = Tool.Transform;
    });
  }, []);

  return (
    <ToolbarPrimitive.Root>
      <ToolbarPrimitive.Group>
        <ToolbarPrimitive.DropdownMenu
          icon={
            <>
              {tool === Tool.Pan && <HandIcon />}
              {tool === Tool.Transform && <CursorArrowIcon />}
            </>
          }
        >
          <ToolbarPrimitive.DropdownMenuItem
            icon={<HandIcon />}
            keybind="Space"
            onClick={() =>
              mutateApp((draft) => {
                draft.editor.tool = Tool.Pan;
              })
            }
          >
            {t`tabs.layout.toolbar.tool.pan`}
          </ToolbarPrimitive.DropdownMenuItem>
          <ToolbarPrimitive.DropdownMenuItem
            icon={<CursorArrowIcon />}
            keybind="V"
            onClick={() =>
              mutateApp((draft) => {
                draft.editor.tool = Tool.Transform;
              })
            }
          >
            {t`tabs.layout.toolbar.tool.stage`}
          </ToolbarPrimitive.DropdownMenuItem>
        </ToolbarPrimitive.DropdownMenu>
      </ToolbarPrimitive.Group>

      <ToolbarPrimitive.Group>
        <ToolbarPrimitive.Button onClick={() => insertStage()}>
          <CardStackPlusIcon />
        </ToolbarPrimitive.Button>
        <ToolbarPrimitive.Button onClick={() => deleteSelectedStage()}>
          <TrashIcon />
        </ToolbarPrimitive.Button>
      </ToolbarPrimitive.Group>

      <ToolbarPrimitive.Group>
        <ToolbarPrimitive.Button
          onClick={() => undoVersion()}
          disabled={!hasUndos}
        >
          <ResetIcon />
        </ToolbarPrimitive.Button>

        <ToolbarPrimitive.Button
          onClick={() => redoVersion()}
          disabled={!hasRedos}
        >
          <ResetIcon style={{ transform: 'scaleX(-1)' }} />
        </ToolbarPrimitive.Button>
      </ToolbarPrimitive.Group>
    </ToolbarPrimitive.Root>
  );
}
export default Toolbar;
