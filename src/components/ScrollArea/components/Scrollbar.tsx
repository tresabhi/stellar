import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { styled, theme } from 'stitches.config';

export const Scrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  padding: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidth}) / 2)`,
  backgroundColor: theme.colors.appBackground2,

  '&:hover': {
    padding: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidthHover}) / 2)`,
  },

  '&[data-orientation="vertical"]': {
    width: theme.sizes.scrollbarThumbWidth,
    borderLeft: theme.borderStyles.interactive,
  },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: theme.sizes.scrollbarThumbWidth,
    borderTop: theme.borderStyles.interactive,
  },

  '&[data-orientation="vertical"]:hover': {
    width: theme.sizes.scrollbarThumbWidthHover,
  },
  '&[data-orientation="horizontal"]:hover': {
    height: theme.sizes.scrollbarThumbWidthHover,
  },
});
