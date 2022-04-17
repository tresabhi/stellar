export interface VanillaPart {
  readonly n: string;
}

export interface Part extends VanillaPart {
  readonly ID: string;
  parentID?: string;

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
  label: 'Unknown',
  selected: false,
  hidden: false,
  locked: false,
};
