import { ReactComponent as Icon } from 'assets/icons/question-mark.svg';
import { memo } from 'react';
import { AnyPart, PartID, PartModule } from 'types/Parts';
import compareAddressProps from 'utilities/compareAddressProps';

export interface PartWithMeta {
  meta: {
    parent?: PartID;

    label: string;
    visible: boolean;
    locked: boolean;
    selected: boolean;
  };
}

export interface PartWithTransformations {
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
  t: '-Infinity';
}

export interface PhysicalStellarPart
  extends PartWithMeta,
    PartWithTransformations {}

export const DefaultPartData: PhysicalStellarPart = {
  meta: {
    label: 'Unknown Part',
    visible: true,
    locked: false,

    selected: false,
  },

  p: { x: 0, y: 0 },
  o: { x: 1, y: 1, z: 0 },
  t: '-Infinity',
};

export const DefaultPartLayoutComponent = memo(
  () => <mesh />,
  compareAddressProps,
);

export const DefaultPartIcon = Icon;

const DefaultPart: PartModule = {
  data: DefaultPartData as AnyPart,

  Icon: DefaultPartIcon,
  LayoutComponent: DefaultPartLayoutComponent,

  isExportable: true,
};
export default DefaultPart;
