import { cloneDeep } from 'lodash';
import { createRef, FC } from 'react';
import { Box2, Group, Mesh } from 'three';
import DeepPartial from 'types/DeepPartial';
import {
  AnyVanillaPart,
  PartID,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import safeClassMerge from 'utilities/safeClassMerge';
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
  private nonExportableKeys: string[] = [];
  private savableKeys = [
    'n',
    'ID',
    'parentID',
    'label',
    'selected',
    'hidden',
    'locked',
  ];

  static isExportable = true;
  static hasTransformations = false;

  abstract updateBoundingBox(): void;

  import(data: DeepPartial<Saved>) {
    safeClassMerge(this, data);
  }
  /**
   * _❕ Parts like `Group` can export multiple parts_
   */
  export(): Exported | AnyVanillaPart[] {
    const clonedThis = cloneDeep(this);
    const exportable: Partial<Exported> = {};

    Object.keys(clonedThis).forEach((key) => {
      const value = (clonedThis as any)[key];

      if (!this.nonExportableKeys.includes(key)) {
        (exportable as any)[key] = value;
      }
    });

    return exportable as Exported;
  }
  save(): Saved {
    const clonedThis = cloneDeep(this);
    const saved: Partial<Saved> = {};

    Object.keys(clonedThis).forEach((key) => {
      const value = (clonedThis as any)[key];

      if (
        !this.nonExportableKeys.includes(key) ||
        this.savableKeys.includes(key)
      ) {
        (saved as any)[key] = value;
      }
    });

    return saved as Saved;
  }

  static IconComponent: FC;
  abstract LayoutComponent: FC<ReactivePartComponentProps>;
  static PropertyComponent?: FC<PropertyComponentProps>;

  constructor(ID?: PartID, parentID?: PartID) {
    this.ID = ID ?? UUIDV4();
    this.parentID = parentID;
    this.nonExportableKeys.push(...Object.getOwnPropertyNames(this));
    this.nonExportableKeys.splice(this.nonExportableKeys.indexOf('n'), 1);
  }
}
export default Part;
