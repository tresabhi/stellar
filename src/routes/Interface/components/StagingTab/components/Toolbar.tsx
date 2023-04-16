import { CardStackPlusIcon } from '@radix-ui/react-icons';
import * as ToolbarPrimitive from 'components/Toolbar';
import insertStage from 'core/blueprint/insertStage';

function Toolbar() {
  return (
    <ToolbarPrimitive.Root>
      <ToolbarPrimitive.Group />

      <ToolbarPrimitive.Group>
        <ToolbarPrimitive.Button onClick={() => insertStage()}>
          <CardStackPlusIcon />
        </ToolbarPrimitive.Button>
      </ToolbarPrimitive.Group>

      <ToolbarPrimitive.Group />
    </ToolbarPrimitive.Root>
  );
}
export default Toolbar;
