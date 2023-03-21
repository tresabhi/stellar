import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { styled, theme } from 'stitches.config';

export const Item = styled(ToggleGroupPrimitive.Item, {
  padding: theme.space.paddingMinor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapRelatedRegular,
  fontSize: theme.fontSizes[10],
  cursor: 'pointer',
  flex: 1,
  borderRadius: theme.radii.regular,

  '&[data-state="off"]': {
    backgroundColor: theme.colors.componentInteractive,
    color: theme.colors.textHighContrast,
  },

  '&[data-state="on"]': {
    zIndex: 1,
    backgroundColor: theme.colors.componentInteractive_accent,
    color: theme.colors.textHighContrast_accent,
    outline: theme.borderStyles.interactive_accent,
  },
});
