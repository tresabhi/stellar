import { ComponentProps } from '@stitches/react';
import Hint from 'components/Hint';
import { styled, theme } from 'stitches.config';

export interface LabelProps extends ComponentProps<typeof Container> {
  hint?: string;
}

const Container = styled('div', {
  display: 'flex',
  gap: theme.space.gapRelatedRegular,
  alignItems: 'center',
  justifyContent: 'space-between',
  color: theme.colors.textLowContrast,
});

const Primitive = styled('span', {
  fontSize: theme.fontSizes[10],
});

export function Label({ hint, children, ...props }: LabelProps) {
  return (
    <Container {...props}>
      <Primitive>{children}</Primitive>
      {hint && <Hint>{hint}</Hint>}
    </Container>
  );
}
