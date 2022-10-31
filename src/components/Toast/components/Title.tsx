import * as ToastPrimitive from '@radix-ui/react-toast';
import { styled, theme } from 'stitches.config';

export const Title = styled(ToastPrimitive.Title, {
  fontSize: theme.fontSizes[14],
  color: theme.colors.textHighContrast,
});
