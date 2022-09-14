import { Input as InputPrimitive } from 'components/Input';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export enum InputWithIconSide {
  Left,
  Right,
}

export interface InputWithIconProps
  extends InputHTMLAttributes<HTMLInputElement> {
  iconSide?: InputWithIconSide;
  icon: ReactNode;
}

const Container = styled('div', {
  display: 'flex',
  padding: `0 ${theme.space.padding}`,
  gap: theme.space.gapRelatedMajor,
  borderRadius: theme.radii[4],
  height: theme.sizes.inputSizeMajor,
  justifyContent: 'center',
  alignItems: 'center',
  border: theme.borderStyles.componentInteractive,
  cursor: 'text',

  '&:hover': {
    border: theme.borderStyles.componentInteractiveHover,
  },
  '&:active, &:focus-within': {
    border: theme.borderStyles.componentInteractiveActive,
  },
});

const Input = styled(InputPrimitive, {
  fontSize: theme.fontSizes[12],
  flex: 1,
  height: '100%',
});

const IconContainer = styled('div', {
  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
    color: theme.colors.textLowContrast,
    display: 'block',
  },
});

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ iconSide = InputWithIconSide.Right, icon, ...props }, ref) => {
    return (
      <Container>
        {iconSide === InputWithIconSide.Left && (
          <IconContainer>{icon}</IconContainer>
        )}
        <Input {...props} ref={ref} />
        {iconSide === InputWithIconSide.Right && (
          <IconContainer>{icon}</IconContainer>
        )}
      </Container>
    );
  },
);
