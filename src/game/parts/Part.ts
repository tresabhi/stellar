import { ParentId } from 'types/Parts';

export interface VanillaPart {
  readonly n: string;
  readonly t: '-Infinity';
}

export interface Part extends VanillaPart {
  readonly id: string;
  parent_id: ParentId;

  label: string;
  selected: boolean;
  visible: boolean;
  locked: boolean;
}

export type PartWithoutName = Omit<Part, 'n'>;

export const VanillaPartData: VanillaPart = {
  n: 'Unknown',
  t: '-Infinity',
};

export const PartData: Part = {
  ...VanillaPartData,

  id: '',
  parent_id: null,
  label: 'Unlabeled Part',
  selected: false,
  visible: true,
  locked: false,
};

export const registry = null;
