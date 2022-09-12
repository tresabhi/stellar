import {
  Slider as SliderPrimitive,
  SliderProps as SliderPrimitiveProps
} from 'components/Slider';
import { FC } from 'react';
import { styled } from 'stitches.config';
import { PropertyWithLabel } from '../types/propertyWithLabel';
import { Label } from './Label';

export interface SliderProps extends SliderPrimitiveProps, PropertyWithLabel {}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const Slider: FC<SliderProps> = ({ label, ...props }) => (
  <Container>
    <Label>{label}</Label>
    <SliderPrimitive {...props} />
  </Container>
);
