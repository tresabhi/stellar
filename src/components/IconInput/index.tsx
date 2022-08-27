import { Input as InputComponent } from 'components/Input';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export enum IconSide {
  Left,
  Right,
}

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  iconSide?: IconSide;
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

  '&:hover': {
    border: theme.borderStyles.componentInteractiveHover,
  },
  '&:active, &:focus-within': {
    border: theme.borderStyles.componentInteractiveActive,
  },
});

const Input = styled(InputComponent, {
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

export const IconInput = forwardRef<HTMLInputElement, SearchProps>(
  ({ iconSide = IconSide.Right, icon, ...props }, ref) => {
    return (
      <Container>
        {iconSide === IconSide.Left && <IconContainer>{icon}</IconContainer>}
        <Input {...props} ref={ref} />
        {iconSide === IconSide.Right && <IconContainer>{icon}</IconContainer>}
      </Container>
    );
  },
);
