import { Input as InputComponent } from 'components/Input';
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { styled, theme } from 'stitches.config';

const MAX_CHARACTERS = 6;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: theme.space.gapRelated,
});

const Label = styled('span', {
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
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

const Field = styled(InputComponent, {
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
  color: theme.colors.textHighContrast,
  minWidth: 0,
});

const Unit = styled('span', {
  font: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
});

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, unit, onChange, onFocus, onBlur, ...props }, ref) => {
    const input = useRef<HTMLInputElement>(null!);
    const resize = () => {
      input.current.style.width = `${Math.min(
        input.current.value.length,
        MAX_CHARACTERS,
      )}ch`;
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      resize();
      if (onChange) onChange(event);
    };
    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      input.current.select();
      if (onFocus) onFocus(event);
    };
    const handleClick = () => input.current.focus();
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      resize();
      if (onBlur) onBlur(event);
    };

    useImperativeHandle(ref, () => input.current);
    useEffect(resize);

    return (
      <Container onClick={handleClick}>
        <Label>{label}</Label>
        <FieldContainer>
          <Field
            {...props}
            ref={input}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Unit>{unit}</Unit>
        </FieldContainer>
      </Container>
    );
  },
);
