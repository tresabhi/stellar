import { ComponentProps } from '@stitches/react';
import { styled, theme } from 'stitches.config';

export interface LabelProps extends ComponentProps<typeof Primitive> {
  hint?: string;
}

const Container = styled('div', {
  display: 'flex',
  gap: theme.space.gapRelated,
});

const Primitive = styled('span', {
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
});

export function Label({ hint, ...props }: LabelProps) {
  return hint ? (
    <Container>
      <Primitive {...props} />
    </Container>
  ) : (
    <Primitive {...props} />
  );
}
