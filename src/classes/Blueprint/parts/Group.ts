import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { getPart } from 'interfaces/blueprint';
import { FC } from 'react';
import { Box2, Vector2 } from 'three';
import { PartIDs, ReactivePartComponentProps } from 'types/Parts';
import Part, { SavedPart } from './Part';

export interface GroupData extends SavedPart {
  n: 'Group';
  expanded: boolean;
  partOrder: PartIDs;
}

class Group extends Part<GroupData> implements GroupData {
  readonly n = 'Group';
  expanded = false;
  partOrder: PartIDs = [];

  hasTransformations = false;

  updateBoundingBox = () => {
    let newBoundingBox = new Box2(new Vector2(0, 0), new Vector2(0, 0));
    this.partOrder.forEach((partID) => {
      const part = getPart(partID);
      if (part) newBoundingBox.union(part.boundingBox);
    });

    return newBoundingBox;
  };

  static IconComponent = Icon;
  static LayoutComponent: FC<ReactivePartComponentProps> = () => null;
}
export default Group;

const test = new Group();
test.export();
