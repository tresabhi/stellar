import * as ScrollArea from 'components/ScrollArea';
import { HTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

const StyledRoot = styled(ScrollArea.Root, {
  flex: '1 0 0',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapUnrelatedMajor,
});

export function Root(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <StyledRoot>
      <ScrollArea.Viewport>
        <Wrapper {...props} />
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </StyledRoot>
  );
}
