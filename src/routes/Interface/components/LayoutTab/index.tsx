import LayoutCanvas from 'components/LayoutCanvas';
import TabContainer from 'routes/Interface/components/TabContainer';
import { styled } from 'stitches.config';
import useApp from 'stores/app';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Toolbar from './components/Toolbar';

export interface TabLayoutProps {
  swapSecondTab: boolean;
}

export interface TabContentProps {
  visible: boolean;
}

const HorizontalContainer = styled('div', {
  display: 'flex',
  flex: 1,
});

const CanvasContainer = styled('div', {
  position: 'relative',
  flex: 1,
});

export default function LayoutTab({ swapSecondTab }: TabLayoutProps) {
  const zenMode = useApp((state) => state.interface.focusMode);

  return (
    <TabContainer>
      <Toolbar />

      <HorizontalContainer>
        {!zenMode && <LeftSidebar swapSecondTab={swapSecondTab} />}

        <CanvasContainer>
          <LayoutCanvas style={{ position: 'absolute' }} />
        </CanvasContainer>

        {!zenMode && <RightSidebar swapSecondTab={swapSecondTab} />}
      </HorizontalContainer>
    </TabContainer>
  );
}
