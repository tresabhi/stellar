import '@react-three/fiber';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { merge } from 'lodash';
import { memo } from 'react';
// import { type as fuelTankType } from './FuelTank';

export const icon = <LockIcon />;

export const vanillaData = {
  n: 'Root',
  p: {
    x: 0,
    y: 0,
  },
  o: {
    x: 1,
    y: 1,
    z: 0,
  },
  t: '-Infinity',
};

export const data = merge(vanillaData, {
  '.stellar': {
    label: 'Internally Unlabeled Part',
    visible: true,
    locked: false,
  },
});

// export type allTypes =

export type vanillaType = typeof vanillaData & { n: 'Root' };

export type type = typeof data & { n: 'Root' };

export const Component = memo(() => <mesh />);
