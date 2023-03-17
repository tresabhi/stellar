import Button from 'components/Button';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface TabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  icon?: ReactNode;
  selected?: boolean;
  children: string;
}

const Trigger = styled(Button, {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.space.gapRelatedRegular,
  height: theme.sizes.inputSizeMajor,
  borderRadius: `${theme.radii.regular} ${theme.radii.regular} 0 0`,
  maxWidth: theme.sizes.tabMaxWidth,

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    selected: { true: {} },
  },

  compoundVariants: [
    {
      selected: true,

      css: {
        color: theme.colors.textLowContrast_accent,
        backgroundColor: theme.colors.componentInteractive,
        cursor: 'default',

        '&:hover, &:active': {
          backgroundColor: theme.colors.componentInteractive,
        },
      },
    },
    {
      selected: false,

      css: {
        color: theme.colors.textLowContrast,
        backgroundColor: theme.colors.appBackground2,

        '&:hover': {
          backgroundColor: theme.colors.componentInteractiveHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentInteractiveActive,
        },
      },
    },
  ],

  defaultVariants: {
    selected: false,
  },
});

const Label = styled('span', {
  fontSize: theme.fontSizes[14],
});

export function Tab({ icon, selected, children, ...props }: TabProps) {
  return (
    <Trigger {...props} selected={selected}>
      {icon}
      <Label>{children}</Label>
    </Trigger>
  );
}
