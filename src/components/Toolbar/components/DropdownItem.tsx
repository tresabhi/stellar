import { FC, InputHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface DropdownItemProps extends InputHTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  children: string;
  keybind?: ReactNode;
}

const Trigger = styled('div', {
  display: 'flex',
  gap: theme.sizes[8],
  padding: theme.sizes[8],
  borderRadius: theme.radii[4],
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.colors.componentBackgroundHover,
  },
  '&:active': {
    backgroundColor: theme.colors.componentBackgroundActive,
  },
  '&:focus-visible': {
    outline: theme.borderStyles.componentInteractiveActive,
  },
});

const IconContainer = styled('div', {
  width: theme.sizes[16],
  height: theme.sizes[16],

  '& svg': {
    height: theme.sizes[16],
    width: theme.sizes[16],
    color: theme.colors.textHighContrast,
  },
});

const Label = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[12],
  fontFamily: theme.fonts.base,
  textAlign: 'left',
  flex: '1',
});

const Keybind = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[10],
  fontFamily: theme.fonts.mono,
});

export const DropdownItem: FC<DropdownItemProps> = ({ children, icon, keybind, onClick, ...props }) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (onClick) onClick(event);
  };

  return (
    <Trigger onClick={handleClick} {...props}>
      <IconContainer>{icon}</IconContainer>
      <Label>{children}</Label>
      <Keybind>{keybind}</Keybind>
    </Trigger>
  );
};
