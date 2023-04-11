import { ParentId } from 'types/Parts';

export interface VanillaPart {
  readonly n: string;
  readonly t: '-Infinity';
}

export interface Part extends VanillaPart {
  readonly id: string;
  parent: ParentId;

  label?: string;
  selected: boolean;
  visible: boolean;
  locked: boolean;
}

export type PartWithoutName = Omit<Part, 'n'>;

export const VanillaPartData: VanillaPart = {
  n: 'Part',
  t: '-Infinity',
};

export const PartData: Part = {
  ...VanillaPartData,

  id: '',
  parent: null,
  label: undefined,
  selected: false,
  visible: true,
  locked: false,
};
