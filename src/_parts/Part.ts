import DeepPartial from 'types/DeepPartial';
import { PartID } from 'types/Parts';

export interface ExportedPart {}
export interface SavedPart extends ExportedPart {
  parentID?: PartID;
  label: string;
  hidden: boolean;
  locked: boolean;
}

abstract class Part<E extends ExportedPart, S extends SavedPart> {
  parentID?: PartID;
  abstract ID: PartID;

  label = 'Unnamed Part';
  selected = false;
  hidden = false;
  locked = false;

  abstract import: (state: DeepPartial<E>) => void;
  abstract export: () => E;
  abstract save: () => S;
}
export default Part;
