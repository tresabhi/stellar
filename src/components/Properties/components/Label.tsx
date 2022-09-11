import { styled, theme } from 'stitches.config';

/**
 * Warning: This component is meant to be used only inside of other Properties
 * Primitives
 */
export const Label = styled('span', {
  fontSize: theme.fontSizes[10],
  color: theme.colors.textLowContrast,
});
