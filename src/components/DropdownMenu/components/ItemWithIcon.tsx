import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { FC, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';
import { Item } from './Item';

export interface InputWithIconProps
  extends DropdownMenuPrimitive.DropdownMenuItemProps {
  icon?: ReactNode;
  keybind?: ReactNode;
}

const IconContainer = styled('div', {
  width: theme.sizes[16],
  height: theme.sizes[16],

  '& > svg': {
    height: theme.sizes[16],
    width: theme.sizes[16],
    color: theme.colors.textHighContrast,
  },

  variants: {
    disabled: {
      true: {
        '& > svg': {
          color: theme.colors.textLowContrast,
        },
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

const Label = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[12],
  fontFamily: theme.fonts.default,
  textAlign: 'left',
  flex: 1,

  variants: {
    disabled: {
      true: {
        color: theme.colors.textLowContrast,
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

const Keybind = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[10],
  fontFamily: theme.fonts.mono,
});

export const ItemWithIcon: FC<InputWithIconProps> = ({
  icon,
  children,
  keybind,
  ...props
}) => (
  <Item {...props}>
    <IconContainer>{icon}</IconContainer>
    <Label>{children}</Label>
    <Keybind>{keybind}</Keybind>
  </Item>
);
