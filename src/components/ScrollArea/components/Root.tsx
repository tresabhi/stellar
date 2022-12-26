import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { styled } from 'stitches.config';

const StyledRoot = styled(ScrollAreaPrimitive.Root, {
  overflow: 'hidden',
});

export function Root(props: ScrollAreaPrimitive.ScrollAreaProps) {
  return <StyledRoot {...props} type="scroll" />;
}
