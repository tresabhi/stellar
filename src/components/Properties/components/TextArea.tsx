import { styled, theme } from 'stitches.config';

export const TextArea = styled('textarea', {
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
  color: theme.colors.textHighContrast,
  backgroundColor: theme.colors.componentInteractive,
  border: theme.borderStyles.interactive,
  borderRadius: theme.radii.regular,
  resize: 'none',
  height: theme.sizes.propertiesTextAreaHeight,
  padding: theme.space.paddingRegular,

  '&:hover': {
    backgroundColor: theme.colors.componentInteractiveHover,
    border: theme.borderStyles.interactive,
  },
  '&:focus': {
    outline: theme.borderStyles.interactiveActive,
  },
});
