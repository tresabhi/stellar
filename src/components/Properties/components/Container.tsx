import * as ScrollArea from 'components/ScrollArea';
import { FC, HTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

const Root = styled(ScrollArea.Root, {
  flex: '1 0 0',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapUnrelatedMajor,
});

export const Container: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <Root>
    <ScrollArea.Viewport>
      <Wrapper {...props} />
    </ScrollArea.Viewport>

    <ScrollArea.Scrollbar orientation="vertical">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
  </Root>
);
