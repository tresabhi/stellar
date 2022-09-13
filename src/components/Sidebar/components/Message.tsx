import { styled, theme } from 'stitches.config';

export const Message = styled('span', {
  textAlign: 'center',

  '& > svg': {
    width: '1em',
    height: '1em',
  },

  variants: {
    subMessage: {
      true: {
        color: theme.colors.textLowContrast,
        fontSize: theme.fontSizes[12],
      },

      false: {
        color: theme.colors.textHighContrast,
        fontSize: theme.fontSizes[14],
      },
    },
  },

  defaultVariants: {
    subMessage: false,
  },
});
