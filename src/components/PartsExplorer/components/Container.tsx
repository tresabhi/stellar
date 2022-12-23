import * as ScrollArea from 'components/ScrollArea';
import getPart from 'core/part/getPart';
import unselectAllParts from 'core/part/unselectAllParts';
import { Group } from 'game/parts/Group';
import { styled } from 'stitches.config';
import useBlueprint from 'stores/blueprint';
import { ParentId } from 'types/Parts';
import { Listing } from './Listing';

export interface ContainerProps {
  fullHeight?: boolean;
  visible?: boolean;
  indent?: number;
  overflow?: boolean;
  parentId: ParentId;
}

const Root = styled(ScrollArea.Root, {
  flex: '1 0 0',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export function Container({ parentId, indent = 0, ...props }: ContainerProps) {
  const partOrder = useBlueprint((state) => {
    if (parentId === null) {
      return state.part_order;
    }
    return getPart<Group>(parentId, state).part_order;
  });
  const children = partOrder.map((id) => (
    <Listing indent={indent} id={id} key={`part-${id}`} />
  ));

  const handleClick = () => unselectAllParts();

  return (
    <Root>
      <ScrollArea.Viewport onClick={handleClick}>
        <Wrapper {...props}>{children}</Wrapper>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </Root>
  );
}
