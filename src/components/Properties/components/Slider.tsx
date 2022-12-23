import {
  Slider as SliderPrimitive,
  SliderProps as SliderPrimitiveProps,
} from 'components/Slider';
import { styled } from 'stitches.config';
import { PropertyWithLabel } from '../types/propertyWithLabel';
import { Label } from './Label';

export interface SliderProps extends SliderPrimitiveProps, PropertyWithLabel {}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export function Slider({ label, ...props }: SliderProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <SliderPrimitive {...props} />
    </Container>
  );
}
