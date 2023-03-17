import InputPrimitive from 'components/Input';
import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { styled, theme } from 'stitches.config';
import createInputEscape from 'utilities/createInputEscape';
import PropertyWithLabel from '../types/propertyWithLabel';
import PropertyWithUnit from '../types/propertyWithUnit';
import { Label } from './Label';

const MAX_CHARACTERS = 6;

export interface InputProps
  extends ComponentPropsWithoutRef<typeof InputPrimitive>,
    PropertyWithLabel,
    PropertyWithUnit {}

export interface InputRef extends HTMLInputElement {
  resize: () => void;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: theme.space.gapRelatedRegular,
  cursor: 'text',
});

const FieldContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space.paddingMinor,
  gap: theme.space.gapRelatedRegular,
  backgroundColor: theme.colors.componentInteractive,
  border: theme.borderStyles.interactive,
  cursor: 'text',
  borderRadius: theme.radii.regular,

  '&:hover': {
    backgroundColor: theme.colors.componentInteractiveHover,
    border: theme.borderStyles.interactiveHover,
  },

  '&:active, &:focus, &:focus-within': {
    backgroundColor: theme.colors.componentInteractiveActive,
    border: theme.borderStyles.interactiveActive,
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
    const input = useRef<HTMLInputElement>(null);
    const handleContainerClick = () => {
      input.current?.focus();
      input.current?.select();
    };
    const resize = () => {
      if (input.current) {
        input.current.style.width = `${Math.min(
          input.current.value.length,
          MAX_CHARACTERS,
        )}ch`;
      }
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      resize();
      if (onChange) onChange(event);
    };
    const handleKeyDown = createInputEscape(onKeyDown);

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
