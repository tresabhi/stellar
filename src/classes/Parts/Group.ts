import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { getPart } from 'interfaces/blueprint';
import { memo } from 'react';
import { Box2, Vector2 } from 'three';
import { UUID } from 'types/Parts';
import Part, { SavedPart } from './Part';

export interface SavedGroup extends SavedPart {
  n: 'Group';
  expanded: boolean;
  partOrder: UUID[];
}

class Group extends Part<{}, SavedGroup> implements SavedGroup {
  readonly n = 'Group';
  expanded = false;
  partOrder: UUID[] = [];
  label = this.n;

  updateBoundingBox() {
    let newBoundingBox = new Box2(new Vector2(0, 0), new Vector2(0, 0));
    this.partOrder.forEach((partID) => {
      const part = getPart(partID);
      if (part) newBoundingBox.union(part.boundingBox);
    });

    return newBoundingBox;
  }

  static IconComponent = Icon;
  LayoutComponent = memo(() => null);
}
export default Group;
