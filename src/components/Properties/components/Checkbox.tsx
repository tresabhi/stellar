import {
  Checkbox as CheckboxPrimitive,
  CheckboxProps as CheckboxPrimitiveProps,
  CheckboxRef,
} from 'components/Checkbox';
import { forwardRef, useImperativeHandle, useRef } from 'react';
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
  cursor: 'pointer',
});

const Label = styled(LabelPrimitive, {
  flex: 1,
});

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({ label, ...props }, ref) => {
    const checkbox = useRef<CheckboxRef>(null);

    useImperativeHandle(ref, () => checkbox.current as CheckboxRef);

    const handleContainerClick = () => {
      (checkbox.current as HTMLButtonElement | null)?.click();
    };

    return (
      <Container onClick={handleContainerClick}>
        <CheckboxPrimitive {...props} ref={checkbox} />
        <Label>{label}</Label>
      </Container>
    );
  },
);
