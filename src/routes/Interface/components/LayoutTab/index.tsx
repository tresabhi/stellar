import Canvas from 'components/Canvas';
import TabContainer from 'routes/Interface/components/TabContainer';
import { styled } from 'stitches.config';
import useApp from 'stores/app';
import LeftSidebar from './components/LeftSidebar';
import QuickControls from './components/QuickControls';
import RightSidebar from './components/RightSidebar';
import Toolbar from './components/Toolbar';

export interface TabContentProps {
  visible: boolean;
}

export const HorizontalContainer = styled('div', {
  display: 'flex',
  flex: 1,
});

export const CanvasContainer = styled('div', {
  position: 'relative',
  flex: 1,
});

export default function LayoutTab() {
  const zenMode = useApp((state) => state.interface.focusMode);

  return (
    <TabContainer>
      <Toolbar />

      <HorizontalContainer>
        {!zenMode && <LeftSidebar />}

        <CanvasContainer>
          <Canvas />
          <QuickControls />
        </CanvasContainer>

        {!zenMode && <RightSidebar />}
      </HorizontalContainer>
    </TabContainer>
  );
}
