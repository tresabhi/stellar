import '@react-three/fiber';
import { ReactComponent as GroupIcon } from 'assets/icons/group.svg';
import { memo } from 'react';
import * as RootBlueprint from '../../blueprint/types/root';
import * as RootPart from './root';

export const icon = GroupIcon;

// is typed first to stop self relations
const typedParts: RootBlueprint.AnyPartTypeArray = [];
export const data = {
  ...RootPart.data,

  identity: {
    ...RootPart.data.identity,
    label: 'Group',
  },

  n: 'Group' as 'Group',
  parts: typedParts,
};

export type Type = typeof data;

export const Component = memo(() => <mesh />);
