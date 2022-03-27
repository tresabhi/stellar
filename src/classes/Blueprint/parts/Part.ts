import { cloneDeep, mergeWith } from 'lodash';
import { createRef, FC } from 'react';
import { Box2, Group, Mesh } from 'three';
import DeepPartial from 'types/DeepPartial';
import {
  AnyVanillaPart,
  PartID,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import { NIL, v4 as UUIDV4 } from 'uuid';

export type ExportedPart = {};

export interface SavedPart extends ExportedPart {
  ID: PartID;
  parentID?: PartID;
  label: string;
  hidden: boolean;
  locked: boolean;
}

abstract class Part<
  Exported extends ExportedPart = ExportedPart,
  Saved extends SavedPart = Exported & SavedPart,
> implements SavedPart
{
  abstract readonly n: string;
  readonly ID: PartID = NIL;
  parentID?: string | undefined = undefined;
  label = 'Unnamed Part';
  selected = false;
  hidden = false;
  locked = false;

  boundingBox = new Box2();
  meshRef = createRef<Mesh | Group>();
  private nonexportable: string[];

  static isExportable = true;
  static hasTransformations = false;

  abstract updateBoundingBox(): void;

  import(data: DeepPartial<Saved>) {
    mergeWith(this, data, (objValue, srcValue) => {
      if (
        typeof srcValue === 'function' ||
        typeof objValue === 'function' ||
        srcValue === undefined
      ) {
        return srcValue;
      } else {
        return objValue;
      }
    });
  }
  /**
   * _❕ Parts like `Group` can export multiple parts_
   */
  export(): Exported | AnyVanillaPart[] {
    const clonedThis = cloneDeep(this);
    const exportable: Partial<Exported> = {};

    Object.keys(clonedThis).forEach((key) => {
      const value = (clonedThis as any)[key];

      if (typeof value !== 'function' && !this.nonexportable.includes(key)) {
        (exportable as any)[key] = value;
      }
    });

    return exportable as Exported;
  }
  save(): Saved {
    const clonedThis = cloneDeep(this);
    const savable: Partial<Saved> = {};

    Object.keys(clonedThis).forEach((key) => {
      const value = (clonedThis as any)[key];

      if (typeof value !== 'function') {
        (savable as any)[key] = value;
      }
    });

    return savable as Saved;
  }

  static IconComponent: FC;
  abstract LayoutComponent: FC<ReactivePartComponentProps>;
  static PropertyComponent?: FC<PropertyComponentProps>;

  constructor(ID?: PartID, parentID?: PartID) {
    this.ID = ID ?? UUIDV4();
    this.parentID = parentID;
    this.nonexportable = Object.getOwnPropertyNames(this);
    this.nonexportable.splice(this.nonexportable.indexOf('n'), 1);
  }
}
export default Part;
