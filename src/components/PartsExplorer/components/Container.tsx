import * as ScrollArea from 'components/ScrollArea';
import { getPart, unselectAllParts } from 'core/part';
import { Group } from 'game/parts/Group';
import { FC } from 'react';
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

export const Container: FC<ContainerProps> = ({
  parentId: parent,
  indent = 0,
  ...props
}) => {
  const part_order = useBlueprint((state) => {
    if (parent === null) {
      return state.part_order;
    } else {
      const part = getPart<Group>(parent, state);
      if (part) return part.part_order;
    }
  });

  if (part_order !== undefined) {
    const children = part_order.map((id) => (
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

  return null;
};
