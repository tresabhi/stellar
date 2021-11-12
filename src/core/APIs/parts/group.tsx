import '@react-three/fiber';
import { ReactComponent as FuelTankIcon } from 'assets/icons/fuel-tank.svg';
import { memo } from 'react';
import * as RootPart from './root';
import * as RootBlueprint from '../blueprint/root';

export const icon = <FuelTankIcon />;

const typedParts: RootBlueprint.partArrayType = [];
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
