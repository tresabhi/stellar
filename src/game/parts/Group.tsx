import { ReactComponent as Icon } from 'assets/icons/group.svg';
import PartCluster from 'components/PartCluster';
import { FC } from 'react';
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
