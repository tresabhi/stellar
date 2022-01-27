import '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { AnyPartTypeArray } from 'interfaces/blueprint/root';
import { PartModule } from 'core/types/Parts';
import { merge } from 'lodash';
import { memo } from 'react';
import RootPart, { RootType } from './Root';

export interface GroupType extends RootType {
  n: 'Group';
  parts: AnyPartTypeArray;
}

const DATA = merge<{}, RootType, Partial<GroupType>>({}, RootPart.DATA, {
  n: 'Group',
  parts: [],
}) as GroupType;

const LayoutComponent = memo(() => <mesh />);

const GroupPart: PartModule = {
  DATA,
  Icon,
  LayoutComponent,

  isExportable: false,
};
export default GroupPart;
