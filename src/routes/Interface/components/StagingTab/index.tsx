import Canvas from 'components/Canvas';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import { CanvasContainer, HorizontalContainer } from '../LayoutTab';
import TabContainer from '../TabContainer';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Toolbar from './components/Toolbar';

export default function StagingTab() {
  const touchscreenMode = useTouchscreenMode();

  return (
    <TabContainer>
      <Toolbar />

      <HorizontalContainer>
        <LeftSidebar />

        <CanvasContainer>
          <Canvas />
        </CanvasContainer>

        {!touchscreenMode && <RightSidebar />}
      </HorizontalContainer>
    </TabContainer>
  );
}
