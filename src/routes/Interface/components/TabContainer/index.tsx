import { ReactNode } from 'react';
import { styled } from 'stitches.config';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

export interface TabContainerProps {
  children: ReactNode;
}

export default function TabContainer({ children }: TabContainerProps) {
  return <Container>{children}</Container>;
}
