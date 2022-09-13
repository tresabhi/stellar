import { getPart, unselectAllParts } from 'core/part';
import { Group } from 'game/parts/Group';
import { isNull } from 'lodash';
import { FC } from 'react';
import { styled } from 'stitches.config';
import useBlueprint from 'stores/useBlueprint';
import { ParentId } from 'types/Parts';
import { Listing } from './Listing';

export interface ContainerProps {
  fullHeight?: boolean;
  visible?: boolean;
  indent?: number;
  overflow?: boolean;
  parentId: ParentId;
}

export const StyledContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  variants: {
    fullHeight: {
      true: {
        flex: '1 1 0',
      },
    },

    visible: {
      false: {
        display: 'none',
      },
    },

    overflow: {
      true: {
        overflowY: 'auto',
        overflowX: 'clip',
      },
    },
  },

  defaultVariants: {
    visible: true,
  },
});

export const Container: FC<ContainerProps> = ({
  parentId: parent,
  indent = 0,
  ...props
}) => {
  const part_order = useBlueprint((state) =>
    isNull(parent)
      ? state.part_order
      : getPart<Group>(parent, state)!.part_order,
  );
  const children = part_order.map((id) => (
    <Listing indent={indent} id={id} key={`part-${id}`} />
  ));

  const handleClick = () => unselectAllParts();

  return (
    <StyledContainer {...props} onClick={handleClick}>
      {children}
    </StyledContainer>
  );
};
