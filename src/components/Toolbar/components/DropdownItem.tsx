import { Button } from 'components/Button';
import { FC, InputHTMLAttributes, MouseEvent, ReactNode, useRef } from 'react';
import { styled, theme } from 'stitches.config';

export interface DropdownItemProps
  extends InputHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: string;
  keybind?: ReactNode;
}

const Trigger = styled(Button, {
  display: 'flex',
  gap: theme.sizes[8],
  padding: theme.sizes[8],
  borderRadius: theme.radii[4],
  alignItems: 'center',
});

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

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  icon,
  keybind,
  disabled,
  onClick,
  ...props
}) => {
  const trigger = useRef<HTMLButtonElement>(null!);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const wrapper = trigger.current.parentElement?.parentElement;

    if (wrapper instanceof HTMLDetailsElement) wrapper.open = false;
    if (onClick) onClick(event);
  };

  return (
    // @ts-ignore
    <Trigger
      ref={trigger}
      disabled={disabled}
      priority={disabled ? 'disabled' : undefined}
      onClick={handleClick}
      {...props}
    >
      <IconContainer disabled={disabled}>{icon}</IconContainer>
      <Label disabled={disabled}>{children}</Label>
      <Keybind>{keybind}</Keybind>
    </Trigger>
  );
};
