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

    overflow: {
      true: {
        overflowY: 'auto',
      },
    },
  },

  defaultVariants: {
    visible: false,
    overflow: false,
  },
});

export interface TabContainerProps {
  tab: Tab;
  children: ReactNode;
  overflow?: boolean;
}

export const TabContainer: FC<TabContainerProps> = ({
  tab,
  children,
  overflow,
}) => {
  const currentTab = useApp((state) => state.interface.tab);

  return (
    <Container overflow={overflow} visible={currentTab === tab}>
      {children}
    </Container>
  );
};
