import { Dispatch, SetStateAction } from 'react';
import { updateBlueprint } from 'utilities/blueprints';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';
import { type as rootPartType } from 'utilities/parts/Root';

export default class blueprintCoreAPI {
  blueprint: rootBlueprintType;

  setPartState: Array<Dispatch<SetStateAction<rootPartType>>> = [];
  constructor(blueprint: Object) {
    (() => {
      this.blueprint = updateBlueprint(blueprint);
    })();
  }

  createPart(data: rootPartType, index?: number, updateParts = false) {
    (() => {})();
  }

  deletePart(index: number) {}

  mutatePartData(data: rootPartType, index: number) {}
}
