import { styled, theme } from 'stitches.config';

const Input = styled('input', {
  color: theme.colors.textHighContrast,
  padding: 0,
  minWidth: 0,

  '&::placeholder': {
    color: theme.colors.textLowContrast,
  },
});
export default Input;
