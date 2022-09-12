import { Input as InputPrimitive } from 'components/Input';
import { useInputEscape } from 'hooks/useInputEscape';
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { styled, theme } from 'stitches.config';
import { PropertyWithLabel } from '../types/propertyWithLabel';
import { PropertyWithUnit } from '../types/propertyWithUnit';
import { Label } from './Label';

const MAX_CHARACTERS = 6;

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    PropertyWithLabel,
    PropertyWithUnit {}

export interface InputRef extends HTMLInputElement {
  resize: () => void;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: theme.space.gapRelated,
  cursor: 'text',
});

const FieldContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space.paddingMinor,
  gap: theme.space.gapRelated,
  backgroundColor: theme.colors.componentBackground,
  border: theme.borderStyles.componentInteractive,
  cursor: 'text',
  borderRadius: theme.radii[4],

  '&:hover': {
    backgroundColor: theme.colors.componentBackgroundHover,
    border: theme.borderStyles.componentInteractiveHover,
  },

  '&:active, &:focus, &:focus-within': {
    backgroundColor: theme.colors.componentBackgroundActive,
    border: theme.borderStyles.componentInteractiveActive,
  },
});

const StyledInput = styled(InputPrimitive, {
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
  color: theme.colors.textHighContrast,
  minWidth: 0,
  width: 0,
});

const Unit = styled('span', {
  font: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
});

export const Input = forwardRef<InputRef, InputProps>(
  (
    { label, unit, onChange, onKeyDown, value, defaultValue, ...props },
    ref,
  ) => {
    const input = useRef<HTMLInputElement>(null!);
    const handleContainerClick = () => {
      input.current.focus();
      input.current.select();
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      resize();
      if (onChange) onChange(event);
    };
    const handleKeyDown = useInputEscape(onKeyDown);
    const resize = () => {
      input.current.style.width = `${Math.min(
        input.current.value.length,
        MAX_CHARACTERS,
      )}ch`;
    };

    useEffect(() => {
      resize();

      (input.current as InputRef).resize = resize;
    });
    useImperativeHandle(ref, () => input.current as InputRef);

    return (
      <Container onClick={handleContainerClick}>
        {label && <Label>{label}</Label>}

        <FieldContainer>
          <StyledInput
            {...props}
            ref={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={value}
            defaultValue={defaultValue}
          />
          <Unit>{unit}</Unit>
        </FieldContainer>
      </Container>
    );
  },
);
