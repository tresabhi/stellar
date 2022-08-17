import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';
import useApp, { Tab } from 'stores/useApp';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  variants: {
    visible: {
      false: {
        display: 'none',
      },
    },
  },
});

export interface TabContainerProps {
  tab: Tab;
  children: ReactNode;
}

export const TabContainer: FC<TabContainerProps> = ({ tab, children }) => {
  const currentTab = useApp((state) => state.tab);

  return <Container visible={currentTab === tab}>{children}</Container>;
};
