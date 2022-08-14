import { Button } from 'components/Button';
import { InputHTMLAttributes, memo, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface ItemProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  note?: string;
  icon?: ReactNode;
  iconGap?: boolean;
}

const Container = styled(Button, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `0 ${theme.space.padding}`,
  gap: theme.space.gapRelatedMajor,
  color: theme.colors.textHighContrast,
  height: theme.sizes.inputHeightMajor,
  borderRadius: theme.radii[4],

  defaultVariants: {
    transparent: true,
  },
});

const IconContainer = styled('div', {
  // container also needs to have a size
  width: theme.sizes[12],
  height: theme.sizes[12],

  '& > svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
  },
});

const Label = styled('span', {
  flex: 1,
  fontSize: theme.fontSizes[12],
  color: theme.colors.textHighContrast,
  textAlign: 'left',
});

const Note = styled('span', {
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
  fontFamily: theme.fonts.mono,
});

export const Item = memo<ItemProps>(
  ({ children, note, icon, iconGap, ...props }) => {
    return (
      // @ts-ignore
      <Container {...props}>
        {icon || iconGap ? <IconContainer>{icon}</IconContainer> : null}
        <Label>{children}</Label>
        <Note>{note}</Note>
      </Container>
    );
  },
  ({ name: prevName }, { name: nextName }) => prevName === nextName,
);
