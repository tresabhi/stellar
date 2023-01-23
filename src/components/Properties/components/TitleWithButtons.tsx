import { HTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';
import { Title as TitlePrimitive } from './Title';

export interface TitleWithButtonProps extends HTMLAttributes<HTMLSpanElement> {
  buttons: ReactNode;
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelatedRegular,
});

const Title = styled(TitlePrimitive, {
  flex: 1,
});

export function TitleWithButton({ buttons, ...props }: TitleWithButtonProps) {
  return (
    <Container>
      <Title {...props} />
      {buttons}
    </Container>
  );
}
