import { Button } from 'components/Button';
import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  memo,
  MouseEvent,
  ReactNode,
} from 'react';
import { styled, theme } from 'stitches.config';

export interface ItemProps extends InputHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  note?: string;
  noteURL?: string;
  icon?: ReactNode;
  iconGap?: boolean;
  ref?: ForwardedRef<HTMLButtonElement>;
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

const ANote = styled('a', {
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
  fontFamily: theme.fonts.mono,
  textDecoration: 'underline',
});

const Note = styled('span', {
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
  fontFamily: theme.fonts.mono,
});

export const Item = memo<ItemProps>(
  forwardRef<HTMLButtonElement, ItemProps>(
    ({ children, note, icon, iconGap, noteURL, ...props }, ref) => {
      const handleANoteClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
      };

      return (
        // @ts-ignore
        <Container {...props} ref={ref}>
          {icon || iconGap ? <IconContainer>{icon}</IconContainer> : null}
          <Label>{children}</Label>
          {noteURL ? (
            <ANote target="_blank" onClick={handleANoteClick} href={noteURL}>
              {note}
            </ANote>
          ) : (
            <Note>{note}</Note>
          )}
        </Container>
      );
    },
  ),
  ({ name: prevName }, { name: nextName }) => prevName === nextName,
);
