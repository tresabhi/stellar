import '@react-three/fiber';
import { ReactComponent as GroupIcon } from 'assets/icons/group.svg';
import { memo } from 'react';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as RootPart from './Root';

// is typed first to stop circular references
const typedParts: RootBlueprint.AnyPartTypeArray = [];
const DATA = {
  ...RootPart.data,

  identity: {
    ...RootPart.data.identity,
    label: 'Group',
  },

  n: 'Group' as 'Group',
  parts: typedParts,
};

export type GroupType = typeof DATA;

const Icon = GroupIcon;

const LayoutComponent = memo(() => <mesh />);

const Group: RootPart.PartModule = {
  DATA,

  Icon,

  LayoutComponent,
};
export default Group;
