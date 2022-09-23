import { LayoutCanvas as LayoutCanvasPrimitive } from 'components/Canvas';
import { FC } from 'react';
import { TabContainer } from 'routes/Interface/components/TabContainer';
import { styled } from 'stitches.config';
import { LeftSidebar } from './components/LeftSidebar';
import { SelectMultiple } from './components/LeftSidebar/components/SelectMultiple';
import { RightSidebar } from './components/RightSidebar';
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

const LayoutCanvas = styled(LayoutCanvasPrimitive, {
  width: '100%',
  height: '100%',
});

export const LayoutTab: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  return (
    <TabContainer>
      <Toolbar />

      <HorizontalContainer>
        <LeftSidebar swapSecondTab={swapSecondTab} />
        <CanvasContainer>
          <LayoutCanvas />
          <SelectMultiple />
        </CanvasContainer>
        <RightSidebar swapSecondTab={swapSecondTab} />
      </HorizontalContainer>
    </TabContainer>
  );
};
