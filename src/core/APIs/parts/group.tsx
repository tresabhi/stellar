import '@react-three/fiber';
import { ReactComponent as GroupIcon } from 'assets/icons/group.svg';
import { memo } from 'react';
import * as RootBlueprint from '../blueprint/root';
import * as RootPart from './root';

export const icon = GroupIcon;

const typedParts: RootBlueprint.anyPartTypeArray = [];
export const data = {
  '.stellar': {
    ...RootPart.data['.stellar'],
    label: 'Unlabeled Group',
  },

  parts: typedParts,
};

type constantTypes = { n: 'Group' };

export type type = typeof data & constantTypes;

export const Component = memo(() => <mesh />);
