import Button from 'components/Button';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';

export interface SearchItemProps
  extends ComponentPropsWithoutRef<typeof Button> {
  icon?: ReactNode;
  note?: string;
}

const Container = styled(Button, {
  display: 'flex',
  gap: theme.space.gapRelatedMajor,
  padding: theme.space.padding,
  color: theme.colors.textHighContrast,

  defaultVariants: {
    transparent: true,
  },
});

const IconContainer = styled('div', {
  width: theme.sizes[12],
  height: theme.sizes[12],

  '& > svg': {
    display: 'block',
    width: '100%',
    height: '100%',
  },
});

const Label = styled('span', {
  flex: 1,
  fontSize: theme.fontSizes[12],
  textAlign: 'left',
});

const Note = styled('span', {
  color: theme.colors.textLowContrast,
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
});

export function SearchItem({
  icon,
  note,
  children,
  ...props
}: SearchItemProps) {
  return (
    <Container {...props}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <Label>{children}</Label>
      <Note>{note}</Note>
    </Container>
  );
}
