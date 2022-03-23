import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { getPart } from 'interfaces/blueprint';
import { FC } from 'react';
import { Box2, Vector2 } from 'three';
import { PartIDs, ReactivePartComponentProps } from 'types/Parts';
import Part, { PartData } from './Part';

export interface GroupData extends PartData {
  partOrder: PartIDs;
}

class Group extends Part<null> implements GroupData {
  readonly n = 'Group';
  partOrder: PartIDs = [];

  Icon = Icon;

  LayoutComponent: FC<ReactivePartComponentProps> = () => null;

  updateBoundingBox = () => {
    let newBoundingBox = new Box2(new Vector2(0, 0), new Vector2(0, 0));
    this.partOrder.forEach((partID) => {
      const part = getPart(partID);
      if (part) newBoundingBox.union(part.boundingBox);
    });

    return newBoundingBox;
  };
}
export default Group;
