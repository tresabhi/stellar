import { styled, theme } from 'stitches.config';

export const TextArea = styled('textarea', {
  fontFamily: theme.fonts.mono,
  fontSize: theme.fontSizes[10],
  color: theme.colors.textHighContrast,
  backgroundColor: theme.colors.componentBackground,
  border: theme.borderStyles.componentInteractive,
  borderRadius: theme.radii[4],
  resize: 'none',
  height: theme.sizes.propertiesTextAreaHeight,
  padding: theme.space.padding,

  '&:hover': {
    backgroundColor: theme.colors.componentBackgroundHover,
    border: theme.borderStyles.componentInteractive,
  },
  '&:focus': {
    outline: theme.borderStyles.componentInteractiveActive,
  },
});
