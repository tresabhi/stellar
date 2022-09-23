import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export interface TabContainerProps {
  children: ReactNode;
}

export const TabContainer: FC<TabContainerProps> = ({ children }) => (
  <Container>{children}</Container>
);
