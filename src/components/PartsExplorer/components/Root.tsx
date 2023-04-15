import * as ScrollArea from 'components/ScrollArea';
import getPart from 'core/part/getPart';
import unselectAll from 'core/part/unselectAll';
import { Group } from 'game/parts/Group';
import { MouseEvent } from 'react';
import { styled } from 'stitches.config';
import useBlueprint from 'stores/blueprint';
import { ParentId } from 'types/Parts';
import { Item } from './Item';

export interface ContainerProps {
  visible?: boolean;
  indent?: number;
  parentId: ParentId;
}

const PrimitiveScrollArea = styled(ScrollArea.Root, {
  flex: '1 0 0',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export function Root({ parentId, indent = 0, ...props }: ContainerProps) {
  const partOrder = useBlueprint((state) => {
    if (parentId === null) {
      return state.part_order;
    }
    return getPart<Group>(parentId, state).part_order;
  });
  const children = partOrder.map((id) => (
    <Item indent={indent} id={id} key={`part-${id}`} />
  ));

  const handleScrollAreaClick = () => unselectAll();
  const handleWrapperClick = (event: MouseEvent) => event.stopPropagation();

  return (
    <PrimitiveScrollArea>
      <ScrollArea.Viewport onClick={handleScrollAreaClick}>
        <Wrapper {...props} onClick={handleWrapperClick}>
          {children}
        </Wrapper>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </PrimitiveScrollArea>
  );
}
