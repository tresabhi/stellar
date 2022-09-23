import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export interface TabContainerProps {
  children: ReactNode;
  overflow?: boolean;
}

export const TabContainer: FC<TabContainerProps> = ({ children, overflow }) => (
  <Container>{children}</Container>
);
