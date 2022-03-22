import DeepPartial from 'types/DeepPartial';
import { PartID } from 'types/Parts';
import { NIL, v4 as UUIDV4 } from 'uuid';

export interface ExportedPart {
  readonly n: string;
}
export interface SavedPart extends ExportedPart {
  parentID?: PartID;
  label: string;
  hidden: boolean;
  locked: boolean;
}

abstract class Part<E extends ExportedPart, S extends SavedPart> {
  abstract readonly n: string;
  parentID?: PartID;
  readonly ID: PartID = NIL;

  label = 'Unnamed Part';
  selected = false;
  hidden = false;
  locked = false;

  abstract import: (state: DeepPartial<E>) => void;
  abstract export: () => E;
  abstract save: () => S;

  constructor() {
    this.ID = UUIDV4();
  }
}
export default Part;
