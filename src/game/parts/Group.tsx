import { ReactComponent as Icon } from 'assets/icons/group.svg';
import PartCluster from 'components/PartCluster';
import { getPart } from 'interfaces/blueprint';
import {
  BoundingBoxComputer,
  getPartBoundingBoxComputer,
} from 'interfaces/part';
import { FC } from 'react';
import { Box2 } from 'three';
import { PartComponentProps, UUID } from 'types/Parts';
import { Part, PartData } from './Part';

export interface Group extends Part {
  readonly n: 'Group';
  expanded: boolean;
  partOrder: UUID[];
}

export const GroupData: Group = {
  ...PartData,

  n: 'Group',
  label: 'Group',
  expanded: false,
  partOrder: [],
};

export const GroupLayoutComponent: FC<PartComponentProps> = ({ ID }) => {
  return <PartCluster parentID={ID} />;
};

export const GroupIcon = Icon;

export const GroupBoundingBoxComputer: BoundingBoxComputer<Group> = (state) => {
  const box2 = new Box2();

  state.partOrder.forEach((ID) => {
    const part = getPart(ID);

    if (part) {
      const boundingBoxComputer = getPartBoundingBoxComputer(part.n);

      if (boundingBoxComputer) {
        const boundingBox = boundingBoxComputer(part);

        box2.union(boundingBox);
      }
    }
  });

  return box2;
};