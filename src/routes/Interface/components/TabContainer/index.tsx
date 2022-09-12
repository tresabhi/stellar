import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  variants: {
    overflow: {
      true: {
        overflowY: 'auto',
      },
    },
  },

  defaultVariants: {
    overflow: false,
  },
});

export interface TabContainerProps {
  children: ReactNode;
  overflow?: boolean;
}

export const TabContainer: FC<TabContainerProps> = ({ children, overflow }) => (
  <Container overflow={overflow}>{children}</Container>
);
