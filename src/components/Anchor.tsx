import { styled, theme } from 'stitches.config';

const Anchor = styled('a', {
  color: theme.colors.textLowContrast,
  borderRadius: theme.radii.sharp,
  cursor: 'default',

  '&[href]': {
    textDecoration: 'underline',
    cursor: 'pointer',

    '&:hover': {
      color: theme.colors.textHighContrast,
      textDecoration: 'none',
    },
    '&:focus': {
      outline: theme.borderStyles.interactiveActive,
      textDecoration: 'none',
    },
  },

  variants: {
    accent: {
      true: {
        color: theme.colors.textLowContrast_accent,

        '&:hover': {
          color: theme.colors.textHighContrast_accent,
        },
        '&:focus': {
          outline: theme.borderStyles.interactiveActive_accent,
        },
      },
    },

    monoSpace: {
      true: {
        fontFamily: theme.fonts.mono,
      },
    },
  },

  defaultVariants: {
    accent: true,
  },
});
export default Anchor;
