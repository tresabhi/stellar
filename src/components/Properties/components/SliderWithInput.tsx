import SliderPrimitive, { SliderProps } from 'components/Slider';
import { MIXED_VALUE_PLACEHOLDER } from 'hooks/propertyControllers/useNumericalInputProperty';
import {
  FocusEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { styled, theme } from 'stitches.config';
import evaluateExpression from 'utilities/evaluateExpression';
import PropertyWithLabel from '../types/propertyWithLabel';
import PropertyWithUnit from '../types/propertyWithUnit';
import { Input, InputRef } from './Input';
import { Label } from './Label';

export interface SliderWithInputProps
  extends SliderProps,
  PropertyWithLabel,
  PropertyWithUnit {
  indeterminate?: boolean;
}

export interface SliderWithInputRef extends HTMLDivElement {
  setValue: (newValue: number) => void;
  setIndeterminate: (newIndeterminate: boolean) => void;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 2,
  gap: theme.space.gapRelated,
});

const Content = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.gapRelatedMajor,
});

const Slider = styled(SliderPrimitive, {
  flex: 2,
});

export const SliderWithInput = forwardRef<
SliderWithInputRef,
SliderWithInputProps
>(
  (
    {
      label,
      min = 0,
      max = 100,
      step = 1,
      unit,
      indeterminate: givenIndeterminate = false,
      value: givenValue,
      defaultValue = min,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const container = useRef<HTMLDivElement>(null);
    const input = useRef<InputRef>(null);
    const [value, setValue] = useState(defaultValue ?? min);
    const [indeterminate, setIndeterminate] = useState(givenIndeterminate);

    const normalizedValue = useCallback(
      (newValue: number) => (indeterminate ? MIXED_VALUE_PLACEHOLDER : `${newValue}`),
      [indeterminate],
    );

    const handleSliderValueChange = (newValue: number) => {
      if (givenValue === undefined && input.current) {
        input.current.value = normalizedValue(newValue);
        input.current.resize();

        setValue(newValue);
      }

      if (onValueChange) onValueChange(newValue);
    };
    const handleInputBlur = (event: FocusEvent<InputRef>) => {
      if (givenValue === undefined) {
        let evaluated = evaluateExpression(event.target.value);

        if (Number.isNaN(evaluated)) {
          event.target.value = normalizedValue(givenValue ?? value);
        } else {
          evaluated = Math.round(evaluated / step) * step;
          evaluated = Math.min(max, Math.max(min, evaluated));
          event.target.value = normalizedValue(evaluated);

          if (onValueChange) onValueChange(evaluated);
          setValue(evaluated);
        }
        event.target.resize();
      }
    };

    useEffect(() => {
      if (container.current) {
        (container.current as SliderWithInputRef).setValue = (
          newValue: number,
        ) => {
          if (input.current) {
            input.current.value = normalizedValue(newValue);
            input.current.resize();
          }

          setValue(newValue);
        };
        (container.current as SliderWithInputRef).setIndeterminate = setIndeterminate;
      }
    }, [normalizedValue]);

    useImperativeHandle(ref, () => container.current as SliderWithInputRef);

    return (
      <Container ref={container}>
        {label && <Label>{label}</Label>}

        <Content>
          <Slider
            {...props}
            value={givenValue ?? value}
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            onValueChange={handleSliderValueChange}
            disabled // stop from focusing
          />
          <Input
            ref={input}
            unit={unit}
            defaultValue={normalizedValue(givenValue ?? value)}
            onBlur={handleInputBlur}
          />
        </Content>
      </Container>
    );
  },
);
