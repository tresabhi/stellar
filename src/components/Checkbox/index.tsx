import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { styled, theme } from 'stitches.config';

export type { CheckboxProps } from '@radix-ui/react-checkbox';

const Root = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  borderRadius: theme.radii.regular,
  width: '1rem',
  height: '1rem',

  variants: {
    disabled: {
      false: {
        cursor: 'pointer',
        backgroundColor: theme.colors.componentInteractive,
        border: theme.borderStyles.interactive,

        '&:hover': {
          backgroundColor: theme.colors.componentInteractiveHover,
          border: theme.borderStyles.interactiveHover,
        },

        '&[data-state="checked"], &[data-state="indeterminate"]': {
          backgroundColor: theme.colors.componentInteractive_accent,
          border: theme.borderStyles.interactive_accent,
        },

        '&[data-state="checked"]:hover, &[data-state="indeterminate"]:hover': {
          backgroundColor: theme.colors.componentInteractiveHover_accent,
          border: theme.borderStyles.interactiveHover_accent,
        },
      },

      true: {
        backgroundColor: theme.colors.componentNonInteractive,
        border: theme.borderStyles.nonInteractive,

        '&[data-state="checked"], &[data-state="indeterminate"]': {
          backgroundColor: theme.colors.componentNonInteractive_accent,
          border: theme.borderStyles.nonInteractive_accent,
        },
      },
    },
  },

  defaultVariants: { disabled: false },
});
const Indicator = styled(CheckboxPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.textHighContrast,

  '&[data-disabled]': { color: theme.colors.textLowContrast },
});

export default function Checkbox(props: CheckboxPrimitive.CheckboxProps) {
  return (
    <Root {...props}>
      <Indicator>
        <CheckIcon />
      </Indicator>
    </Root>
  );
}
