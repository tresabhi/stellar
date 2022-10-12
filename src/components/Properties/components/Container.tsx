import * as ScrollArea from 'components/ScrollArea';
import { FC, HTMLAttributes } from 'react';
import { styled, theme } from 'stitches.config';

const Root = styled(ScrollArea.Root, {
  flex: '1 0 0',
  overflow: 'hidden',
});

const Viewport = styled(ScrollArea.Viewport, {
  width: '100%',
  height: '100%',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: theme.space.paddingMajor,
  gap: theme.space.gapUnrelatedMajor,
});

export const Container: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <Root>
      <Viewport>
        <Wrapper {...props} />
      </Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </Root>
  );
};
