import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { memo } from 'react';
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
  return <group></group>;
}, compareIDProps);

export const GroupIcon = Icon;

const GroupPart: PartModule = {
  data: GroupData,
  Icon: GroupIcon,
  LayoutComponent: GroupLayoutComponent,
};
export default GroupPart;
