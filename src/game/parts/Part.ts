import { ParentId } from 'types/Parts';

export interface VanillaPart {
  readonly n: string;
}

export interface Part extends VanillaPart {
  readonly id: string;
  parentId: ParentId;

  label: string;
  selected: boolean;
  hidden: boolean;
  locked: boolean;
}

export const VanillaPartData: VanillaPart = {
  n: 'Unknown',
};

export const PartData: Part = {
  ...VanillaPartData,

  id: '',
  parentId: null,
  label: 'Unlabeled Part',
  selected: false,
  hidden: false,
  locked: false,
};
