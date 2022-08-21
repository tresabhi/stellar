import { styled, theme } from 'stitches.config';

export const Input = styled('input', {
  color: theme.colors.textHighContrast,
  padding: 0, // TODO: remove this when normalized css is installed

  '&::placeholder': {
    color: theme.colors.textLowContrast,
  },
});
