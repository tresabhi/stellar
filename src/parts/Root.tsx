import '@react-three/fiber';
import { ReactComponent as Icon } from 'assets/icons/question-mark.svg';
import { PartModule } from 'core/types/Parts';
import { FC } from 'react';
import { NIL } from 'uuid';

export interface RootVanillaType {
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
  t: '-Infinity';
}
export interface RootType extends RootVanillaType {
  meta: {
    label: string;
    visible: boolean;
    locked: boolean;

    ID: string;
    parentID: string;
  };
}

export const VANILLA_DATA: RootVanillaType = {
  p: { x: 0, y: 0 },
  o: { x: 1, y: 1, z: 0 },
  t: '-Infinity',
};
export const DATA: RootType = {
  ...VANILLA_DATA,

  meta: {
    label: 'Unknown Parts',
    visible: true,
    locked: false,

    ID: NIL,
    parentID: NIL,
  },
};

const LayoutComponent: FC = () => <mesh />;

const RootPart: PartModule = {
  VANILLA_DATA,
  DATA,

  Icon,
  LayoutComponent,

  isExportable: false,
};
export default RootPart;
