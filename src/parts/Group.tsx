import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { AnyPart, PartModule } from 'core/types/Parts';
import { merge } from 'lodash';
import { memo } from 'react';
import { DefaultPartData } from './Default';

export type GroupData = DefaultPartData & {
  n: 'Group';
  parts: AnyPart[];

  p: never;
  o: never;
  t: never;
};

export const GroupData = merge<{}, DefaultPartData, Partial<GroupData>>(
  {},
  DefaultPartData,
  {
    n: 'Group',
    parts: [],
  },
) as GroupData;

const LayoutComponent = memo(() => <mesh />);

const Group: PartModule = {
  data: GroupData,

  Icon,
  LayoutComponent,

  isExportable: false,
};
export default Group;
