import { styled, theme } from 'stitches.config';

export const Group = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    unrelated: {
      true: {
        gap: theme.space.gapUnrelatedMajor,
      },

      false: {
        gap: theme.space.gapRelated,
      },
    },
  },

  defaultVariants: {
    unrelated: false,
  },
});
