import { Button } from 'components/Button';
import { ComponentPropsWithoutRef, FC } from 'react';
import { styled, theme } from 'stitches.config';

const Trigger = styled(Button, {
  padding: theme.space.paddingMinor,
  fontSize: theme.fontSizes[12],
  borderRadius: theme.radii[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  defaultVariants: {
    border: 'true',
  },
});

export const Action: FC<ComponentPropsWithoutRef<typeof Button>> = (props) => (
  <Trigger {...props} />
);
