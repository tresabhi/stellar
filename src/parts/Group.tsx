import { useHelper } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/group.svg';
import PartCluster from 'components/PartCluster';
import { memo, useRef } from 'react';
import { BoxHelper, Group as ThreeGroup } from 'three';
import { PartIDs, PartModule, ReactivePartComponentProps } from 'types/Parts';
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

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
  };

  useHelper(mesh, BoxHelper, 'purple');

  return <PartCluster onClick={handleClick} parentID={ID} />;
}, compareIDProps);

export const GroupIcon = Icon;

const GroupPart: PartModule = {
  data: GroupData,
  Icon: GroupIcon,
  LayoutComponent: GroupLayoutComponent,
};
export default GroupPart;
