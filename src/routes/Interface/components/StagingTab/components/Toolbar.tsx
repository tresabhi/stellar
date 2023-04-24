import {
  CardStackPlusIcon,
  CursorArrowIcon,
  HandIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import * as ToolbarPrimitive from 'components/Toolbar';
import mutateApp from 'core/app/mutateApp';
import deleteSelectedStage from 'core/blueprint/deleteSelectedStage';
import insertStage from 'core/blueprint/insertStage';
import useTranslator from 'hooks/useTranslator';
import { useEffect } from 'react';
import useApp, { Tool } from 'stores/app';
import {
  UniversalToolbarControlsLeft,
  UniversalToolbarControlsRight,
} from '../../LayoutTab/components/Toolbar';

function Toolbar() {
  const { t } = useTranslator();
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
        <UniversalToolbarControlsLeft />

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

      <UniversalToolbarControlsRight />
    </ToolbarPrimitive.Root>
  );
}
export default Toolbar;
