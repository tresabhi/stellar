import { ComponentProps } from '@stitches/react';
import Button from 'components/Button';
import { styled, theme } from 'stitches.config';
import PropertyWithHint from '../types/propertyWithHint';
import PropertyWithLabel from '../types/propertyWithLabel';
import { Label } from './Label';

export interface ToggleButtonProps
  extends ComponentProps<typeof Button>,
    PropertyWithLabel,
    PropertyWithHint {
  selected: boolean;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: theme.space.gapRelated,
  cursor: 'text',
});

const Trigger = styled(Button, {
  borderRadius: theme.radii[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

export function ToggleButton({
  label,
  children,
  selected,
  hint,
  ...props
}: ToggleButtonProps) {
  return (
    <Container>
      <Label hint={hint}>{label}</Label>
      <Trigger {...props} border color={selected ? 'accent' : undefined}>
        {children}
      </Trigger>
    </Container>
  );
}
