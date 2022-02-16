import { ReactComponent as Icon } from 'assets/icons/question-mark.svg';
import { memo } from 'react';
import { PartAddress } from 'types/Blueprint';
import { AnyPart, PartModule } from 'types/Parts';
import compareAddressesProps from 'utilities/compareAddressesProps';

export interface PartWithMeta {
  meta: {
    address: PartAddress;

    label: string;
    visible: boolean;
    locked: boolean;
    selected: boolean;
  };
}

export interface PartWithTranslations extends PartWithMeta {
  // `n` is not provided to avoid type overwrites
  p: { x: number; y: number };
  o: { x: number; y: number; z: number };
  t: '-Infinity';
}

export const DefaultPartData: PartWithTranslations = {
  meta: {
    address: [],

    label: 'Unknown Part',
    visible: true,
    locked: true,

    selected: false,
  },

  p: { x: 0, y: 0 },
  o: { x: 1, y: 1, z: 0 },
  t: '-Infinity',
};

export const DefaultPartLayoutComponent = memo(
  () => <mesh />,
  compareAddressesProps,
);

export const DefaultPartIcon = Icon;

const DefaultPart: PartModule = {
  data: DefaultPartData as AnyPart,

  Icon: DefaultPartIcon,
  LayoutComponent: DefaultPartLayoutComponent,

  isExportable: true,
};
export default DefaultPart;
