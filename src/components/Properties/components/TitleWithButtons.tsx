import { FC, HTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';
import { Title as TitlePrimitive } from './Title';

export interface TitleWithButtonProps extends HTMLAttributes<HTMLSpanElement> {
  buttons: ReactNode;
}

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelated,
});

const Title = styled(TitlePrimitive, {
  flex: 1,
});

export const TitleWithButton: FC<TitleWithButtonProps> = ({
  buttons,
  ...props
}) => (
  <Container>
    <Title {...props} />
    {buttons}
  </Container>
);
