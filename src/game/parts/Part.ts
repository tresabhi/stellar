import { ParentId } from 'types/Parts';

export interface VanillaPart {
  /**
   * The name of the part by which it is recognized/categorized
   */
  readonly n: string;
}

export interface Part extends VanillaPart {
  /**
   * Internal id of the part (usually made up of random numbers and letters)
   */
  readonly id: string;
  /**
   * Id of the parent group (`null` if at root level)
   */
  parent_id: ParentId;

  /**
   * Human-readable label for that specific part that can be changed in the UI
   */
  label: string;
  /**
   * Part is selected by the user or not
   */
  selected: boolean;
  /**
   * Part is hidden temporarily from view by the user
   */
  visible: boolean;
  /**
   * Part is made non-intractable by the user
   */
  locked: boolean;
}

export const VanillaPartData: VanillaPart = {
  n: 'Unknown',
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
