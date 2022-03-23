import { isArray, merge } from 'lodash';
import { AnyPartMap } from 'types/Blueprint';
import DeepPartial from 'types/DeepPartial';
import { AnyVanillaPart, PartIDs } from 'types/Parts';

class Blueprint {
  readonly format_version = 0;

  center = 0;
  offset = { x: 0, y: 0 };
  stages: { partIndexes: number[] }[] = [];

  selections: PartIDs = [];
  parts: AnyPartMap = new Map();
  partOrder: PartIDs = [];

  import(data: DeepPartial<Blueprint>) {
    merge(this, data);
  }
  export() {
    let exportedParts: AnyVanillaPart[] = [];

    this.partOrder.forEach((partID) => {
      const currentExport = this.parts.get(partID)!.export();

      if (currentExport) {
        if (isArray(currentExport)) {
          exportedParts.push(...currentExport);
        } else {
          exportedParts.push(currentExport);
        }
      }
    });

    return {
      'GENERATED BY STELLAR - A Professional Blueprint Editor':
        'https://stellaredit.web.app/',

      center: this.center,
      offset: this.offset,
      parts: exportedParts,
      stages: this.stages, // this type will change in the future
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
