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
  gap: theme.space.gapRelated,
  height: theme.sizes.inputSizeMajor,
  borderRadius: `${theme.radii[4]} ${theme.radii[4]} 0 0`,
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
        backgroundColor: theme.colors.componentBackground,
        cursor: 'default',

        '&:hover, &:active': {
          backgroundColor: theme.colors.componentBackground,
        },
      },
    },
    {
      selected: false,

      css: {
        color: theme.colors.textLowContrast,
        backgroundColor: theme.colors.appBackground2,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
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

export function Tab({
  icon, selected, children, ...props
}: TabProps) {
  return (
    <Trigger {...props} selected={selected}>
      {icon}
      <Label>{children}</Label>
    </Trigger>
  );
}
