import {
  Checkbox as CheckboxPrimitive,
  CheckboxProps as CheckboxPrimitiveProps,
  CheckboxRef
} from 'components/Checkbox';
import { forwardRef } from 'react';
import { styled, theme } from 'stitches.config';
import { PropertyWithLabel } from '../types/propertyWithLabel';
import { Label as LabelPrimitive } from './Label';

export interface CheckboxProps
  extends CheckboxPrimitiveProps,
    PropertyWithLabel {}

const Container = styled('div', {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelatedMajor,
});

const Label = styled(LabelPrimitive, {
  flex: 1,
});

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ label, ...props }, ref) => (
    <Container>
      <CheckboxPrimitive {...props} ref={ref} />
      <Label>{label}</Label>
    </Container>
  ),
);
