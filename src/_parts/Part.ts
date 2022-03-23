import { basicExport, basicImport, basicSave } from 'interfaces/part';
import { FC } from 'react';
import { Box2 } from 'three';
import DeepPartial from 'types/DeepPartial';
import {
  AnyVanillaPart,
  PartID,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import { NIL, v4 as UUIDV4 } from 'uuid';

export type PartExport = {} | null;

export interface PartData {
  ID: PartID;
  parentID?: PartID;
  label: string;
  hidden: boolean;
  locked: boolean;
}

abstract class Part<T extends PartExport> implements PartData {
  abstract readonly n: string;
  readonly ID: PartID = NIL;
  label = 'Unnamed Part';
  selected = false;
  hidden = false;
  locked = false;

  abstract Icon: FC;

  abstract LayoutComponent: FC<ReactivePartComponentProps>;
  PropertyComponent?: FC<PropertyComponentProps>;

  boundingBox = new Box2();
  abstract updateBoundingBox(): void;

  import(data: DeepPartial<T & PartData>) {
    return basicImport<T>(this, data);
  }
  /**
   * _❕ Parts like `Group` can export multiple parts_
   */
  export(): T | AnyVanillaPart[] {
    return basicExport<T>(this);
  }
  save() {
    return basicSave<T>(this);
  }

  constructor() {
    this.ID = UUIDV4();
  }
}
export default Part;
