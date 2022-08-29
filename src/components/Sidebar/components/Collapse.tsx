import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from 'components/Button';
import { FC, InputHTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

export interface CollapseProps extends InputHTMLAttributes<HTMLButtonElement> {
  expanded?: boolean;
  position: 'left' | 'right';
}

const Trigger = styled(Button, {
  width: theme.sizes.inputSizeMinor,
  height: theme.sizes.inputSizeMajor,
  position: 'absolute',
  top: '50%',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    border: { true: {} },

    position: {
      left: {
        transform: 'translate(calc(100% - 0.5px), 50%)',
        right: 0,
        borderWidth: `${theme.sizes[1]} ${theme.sizes[1]} ${theme.sizes[1]} 0 !important`,
        borderRadius: `0 ${theme.radii[4]} ${theme.radii[4]} 0`,
      },

      right: {
        transform: 'translate(calc(-100% + 0.5px), 50%)',
        left: 0,
        borderWidth: `${theme.sizes[1]} 0 ${theme.sizes[1]} ${theme.sizes[1]} !important`,
        borderRadius: `${theme.radii[4]} 0 0 ${theme.radii[4]}`,
      },
    },

    expanded: {
      true: {
        '& > svg': {
          transform: 'rotate(180deg)',
        },
      },
    },
  },

  defaultVariants: {
    border: true,
  },
});

export const Collapse: FC<CollapseProps> = ({
  expanded,
  position,
  ...props
}) => (
  // @ts-ignore
  <Trigger {...props} position={position} expanded={expanded}>
    {position === 'left' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
  </Trigger>
);
