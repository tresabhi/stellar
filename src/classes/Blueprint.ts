import { SavedPart, VanillaPart } from 'classes/Parts/Part';
import { immerable } from 'immer';
import { createNewPart } from 'interfaces/blueprint';
import { AnyVanillaPart } from 'interfaces/part';
import { isArray } from 'lodash';
import { AnyPartMap, SavedBlueprint, VanillaBlueprint } from 'types/Blueprint';
import { UUID } from 'types/Parts';
import safeClassMerge from 'utilities/safeClassMerge';

class Blueprint {
  [immerable] = true;

  readonly format_version = 0;
  hasUnsavedChanges = true;

  center = 0;
  offset = { x: 0, y: 0 };
  stages: { partIndexes: number[] }[] = [];
  selections: UUID[] = [];
  parts: AnyPartMap = new Map();
  partOrder: UUID[] = [];

  hydrate(data: VanillaBlueprint | SavedBlueprint) {
    try {
      safeClassMerge(this, data);

      const partsMap: AnyPartMap = new Map();
      const partOrder: UUID[] = [];

      if (data.parts.length > 0) {
        if (isArray(data.parts[0])) {
          // saved blueprint

          (data as SavedBlueprint).parts.forEach(([ID, partData]) => {
            const newPart = createNewPart(partData.n, ID);

            if (newPart) {
              newPart.hydrate(partData as SavedPart);
              partsMap.set(ID, newPart);
            }
          });

          partOrder.push(...(data as SavedBlueprint).partOrder);
        } else {
          // vanilla blueprint

          (data as VanillaBlueprint).parts.forEach((partData) => {
            const newPart = createNewPart(partData.n);

            if (newPart) {
              newPart.hydrate(partData as VanillaPart);
              partsMap.set(newPart.ID, newPart);
            }
          });
        }
      }

      this.parts = partsMap;
      this.partOrder = partOrder;
    } catch (error) {
      // TODO: report any issues with the blueprint
    }
  }
  export() {
    let exportedParts: AnyVanillaPart[] = [];

    this.partOrder.forEach((partID) => {
      const currentExport = this.parts.get(partID)?.export();

      if (currentExport) {
        if (isArray(currentExport)) {
          exportedParts.push(...currentExport);
        } else {
          exportedParts.push(currentExport as AnyVanillaPart);
        }
      }
    });

    return {
      center: this.center,
      offset: this.offset,
      parts: exportedParts,
      stages: this.stages, // TODO: this type will change in the future
    };
  }
  save() {
    // basic save function, modified
    let savedBlueprint: Partial<Blueprint> = {};

    Object.keys(this).forEach((key) => {
      const value = (this as any)[key];

      if (typeof value !== 'function') {
        (savedBlueprint as any)[key] = value;
      }
    });

    return savedBlueprint as Blueprint;
  }
}
export default Blueprint;
