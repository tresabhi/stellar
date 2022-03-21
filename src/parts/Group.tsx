import { useHelper } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/group.svg';
import PartCluster from 'components/PartCluster';
import { getPart } from 'interfaces/blueprint';
import { getPartModuleByID } from 'interfaces/part';
import { memo, useRef } from 'react';
import { Box2, BoxHelper, Group as ThreeGroup } from 'three';
import { Blueprint } from 'types/Blueprint';
import {
  PartID,
  PartIDs,
  PartModule,
  ReactivePartComponentProps,
} from 'types/Parts';
import compareIDProps from 'utilities/compareIDProps';
import { DefaultPartData, PartWithMeta } from './Default';

export interface Group extends PartWithMeta {
  n: 'Group';
  expanded: boolean;
  partOrder: PartIDs;
}

export const GroupData: Group = {
  meta: {
    ...DefaultPartData.meta,

    label: 'Group',
  },
  n: 'Group',
  expanded: false,
  partOrder: [],
};

const GroupLayoutComponent = memo<ReactivePartComponentProps>(({ ID }) => {
  const mesh = useRef<ThreeGroup>(null!);
  useHelper(mesh, BoxHelper, 'red');

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
  };

  return <PartCluster onClick={handleClick} parentID={ID} />;
}, compareIDProps);

export const GroupIcon = Icon;

export const getGroupBoundingBox = (ID: PartID, state?: Blueprint) => {
  const groupPart = getPart(ID, state) as Group;
  const groupBoundingBox = new Box2();

  groupPart.partOrder.forEach((partID) => {
    const partModule = getPartModuleByID(partID);

    if (partModule) {
      groupBoundingBox.union(partModule.getBoundingBox(partID, state));
    }
  });

  return groupBoundingBox;
};

const GroupPart: PartModule = {
  data: GroupData,
  Icon: GroupIcon,
  getBoundingBox: getGroupBoundingBox,
  LayoutComponent: GroupLayoutComponent,
};
export default GroupPart;
