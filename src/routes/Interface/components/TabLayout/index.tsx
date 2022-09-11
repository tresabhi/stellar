import { LayoutCanvas } from 'components/Canvas';
import { TabContainer } from 'components/TabContainer';
import { FC } from 'react';
import { styled } from 'stitches.config';
import { Tab } from 'stores/useApp';
import { LeftSidebar } from './components/LeftSidebar';
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

export const TabLayout: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  return (
    <TabContainer tab={Tab.Layout}>
      <Toolbar />

      <HorizontalContainer>
        <LeftSidebar swapSecondTab={swapSecondTab} />
        <LayoutCanvas />
        <RightSidebar swapSecondTab={swapSecondTab} />
      </HorizontalContainer>
    </TabContainer>
  );
};
