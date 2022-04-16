import { immerable } from 'immer';
import { AnyVanillaPart } from 'interfaces/part';
import { cloneDeep } from 'lodash';
import { FC } from 'react';
import { Box2, Group } from 'three';
import DeepPartial from 'types/DeepPartial';
import { UUID } from 'types/Parts';
import safeClassMerge from 'utilities/safeClassMerge';
import { NIL, v4 as UUIDV4 } from 'uuid';

export interface VanillaPart {
  readonly n: string;
}

export interface SavedPart extends VanillaPart {
  ID: UUID;
  parentID?: UUID;

  label: string;
  hidden: boolean;
  locked: boolean;
}

type NullSafeExporter<
  VanillaState extends VanillaPart | null,
  SavedState extends SavedPart,
> = VanillaState extends null ? SavedState : VanillaState & SavedState;

type DosntExtendsNull<Type> = Type extends null ? false : true;

abstract class Part<
  VanillaState extends VanillaPart | null,
  SavedState extends SavedPart = NullSafeExporter<VanillaState, SavedPart>,
> implements SavedPart
{
  [immerable] = true;

  abstract readonly n: string;
  readonly ID: UUID = NIL;
  parentID?: string | undefined = undefined;
  label = 'Unnamed Part';
  selected = false;
  hidden = false;
  locked = false;

  THREERef: { current: Group | null } = { current: null };
  boundingBox = new Box2();
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

  abstract readonly isExportable: DosntExtendsNull<VanillaState>;
  abstract readonly hasTransformations: boolean;

  abstract updateBoundingBox(): void;

  // #region data managers
  hydrate(data: DeepPartial<SavedState>) {
    safeClassMerge(this, data);
  }

  /**
   * _❕ Parts like `Group` can export multiple parts_
   * TODO: add Part[] in a way again
   */
  export<
    ExportedState = VanillaState extends null
      ? null
      : VanillaState | AnyVanillaPart[],
  >(): ExportedState {
    if (this.isExportable) {
      const clonedThis = cloneDeep(this);
      const exportable: Partial<VanillaState> = {};

      Object.keys(clonedThis).forEach((key) => {
        const value = (clonedThis as any)[key];

        if (!this.nonExportableKeys.includes(key)) {
          (exportable as any)[key] = value;
        }
      });

      return exportable as ExportedState;
    } else {
      return null as unknown as ExportedState;
    }
  }

  save(): SavedState {
    const clonedThis = cloneDeep(this);
    const saved: Partial<SavedState> = {};

    Object.keys(clonedThis).forEach((key) => {
      const value = (clonedThis as any)[key];

      if (
        !this.nonExportableKeys.includes(key) ||
        this.savableKeys.includes(key)
      ) {
        (saved as any)[key] = value;
      }
    });

    return saved as SavedState;
  }
  // #endregion

  abstract readonly IconComponent: FC<any>;
  abstract readonly LayoutComponent: FC<any>;

  constructor(ID?: UUID, parentID?: UUID) {
    this.ID = ID ?? UUIDV4();
    this.parentID = parentID;

    this.nonExportableKeys.push(...Object.getOwnPropertyNames(this));
    this.nonExportableKeys.splice(this.nonExportableKeys.indexOf('n'), 1);
  }
}
export default Part;
