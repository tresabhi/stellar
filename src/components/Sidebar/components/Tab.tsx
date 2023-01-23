import Button from 'components/Button';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface TabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  selected?: boolean;
  icon?: ReactNode;
  children: string;
}

const Container = styled(Button, {
  flex: 1,
  display: 'flex',
  gap: theme.space.gapRelatedRegular,
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
  },

  variants: {
    selected: {
      true: {
        color: theme.colors.textLowContrast_accent,
      },

      false: {
        color: theme.colors.textLowContrast,
      },
    },

    transparent: { true: {} },
  },

  defaultVariants: {
    transparent: true,
  },
});

const Label = styled('span', {
  fontSize: theme.fontSizes[12],
});

export function Tab({ selected, icon, children, ...props }: TabProps) {
  return (
    <Container {...props} selected={selected}>
      {icon}
      <Label>{children}</Label>
    </Container>
  );
}
