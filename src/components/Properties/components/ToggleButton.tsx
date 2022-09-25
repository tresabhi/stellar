import { Button as ButtonPrimitive } from 'components/Button';
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react';
import { styled, theme } from 'stitches.config';
import { PropertyWithLabel } from '../types/propertyWithLabel';
import { Label } from './Label';

export interface ToggleButtonProps
  extends ComponentPropsWithoutRef<typeof ButtonPrimitive>,
    PropertyWithLabel {
  selected: boolean;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: theme.space.gapRelated,
  cursor: 'text',
});

const Trigger = styled(ButtonPrimitive, {
  borderRadius: theme.radii[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

export const ToggleButton = forwardRef<
  ButtonHTMLAttributes<HTMLButtonElement>,
  ToggleButtonProps
>(({ label, children, selected, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Trigger {...props} border color={selected ? 'accent' : undefined}>
        {children}
      </Trigger>
    </Container>
  );
});
