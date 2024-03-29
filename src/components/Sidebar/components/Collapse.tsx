import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Button from 'components/Button';
import { ButtonHTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

export interface CollapseProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  expanded?: boolean;
  position: 'left' | 'right';
}

const Trigger = styled(Button, {
  width: theme.sizes.sidebarCollapseButtonWidth,
  height: theme.sizes.sidebarCollapseButtonHeight,
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
        transform: 'translate(calc(100%), 50%)',
        right: 0,
        borderWidth: `${theme.sizes[1]} ${theme.sizes[1]} ${theme.sizes[1]} 0 !important`,
        borderRadius: `0 ${theme.radii.regular} ${theme.radii.regular} 0`,
      },

      right: {
        transform: 'translate(calc(-100%), 50%)',
        left: 0,
        borderWidth: `${theme.sizes[1]} 0 ${theme.sizes[1]} ${theme.sizes[1]} !important`,
        borderRadius: `${theme.radii.regular} 0 0 ${theme.radii.regular}`,
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

export function Collapse({ expanded, position, ...props }: CollapseProps) {
  return (
    <Trigger {...props} position={position} expanded={expanded}>
      {position === 'left' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </Trigger>
  );
}
