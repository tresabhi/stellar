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
