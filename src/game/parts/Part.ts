import { ParentId } from 'types/Parts';

export interface VanillaPart {
  readonly n: string;
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

export const vanillaPartData: VanillaPart = {
  n: 'Part',
};

export const partData: Part = {
  ...vanillaPartData,

  id: '',
  parent: null,
  label: undefined,
  selected: false,
  visible: true,
  locked: false,
};
