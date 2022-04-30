import { ParentID, UUID } from "types/Parts";

export interface VanillaPart {
  readonly n: string;
}

export interface Part extends VanillaPart {
  readonly ID: UUID;
  parentID: ParentID;

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

  ID: '',
  parentID: null,
  label: 'Unlabeled Part',
  selected: false,
  hidden: false,
  locked: false,
};
