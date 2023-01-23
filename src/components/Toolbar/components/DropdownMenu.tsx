import { CaretDownIcon } from '@radix-ui/react-icons';
import * as DropdownMenuPrimitive from 'components/DropdownMenu';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface DropdownMenuProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  icon: ReactNode;
  disabled?: boolean;
}

const Root = styled(DropdownMenuPrimitive.Root, {});

const Trigger = styled(DropdownMenuPrimitive.Trigger, {
  listStyle: 'none',
  width: theme.sizes[40],
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.sizes[4],

  '&::-webkit-details-marker': {
    display: 'none',
  },

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    disabled: {
      true: {
        color: theme.colors.textLowContrast,
      },

      false: {
        cursor: 'pointer',
        color: theme.colors.textHighContrast,

        '&:hover': {
          backgroundColor: theme.colors.componentHovered,
        },
        '&:active': {
          backgroundColor: theme.colors.componentPressed,
        },
        '&:focus': {
          outline: theme.borderStyles.borderInteractivePressed,
        },
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

const Caret = styled(CaretDownIcon, {
  width: `${theme.sizes[8]} !important`,
  height: `${theme.sizes[8]} !important`,

  variants: {
    disabled: {
      false: {
        [`${Trigger}[data-state="open"] &`]: {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
});

export function DropdownMenu({
  children,
  icon,
  disabled,
  ...props
}: DropdownMenuProps) {
  return (
    <Root {...props}>
      <Trigger disabled={disabled}>
        {icon}
        <Caret disabled={disabled} />
      </Trigger>

      {!disabled && (
        <DropdownMenuPrimitive.Content>
          {children}
        </DropdownMenuPrimitive.Content>
      )}
    </Root>
  );
}
