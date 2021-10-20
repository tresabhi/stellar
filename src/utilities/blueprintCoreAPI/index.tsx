import { merge } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { updateBlueprint } from 'utilities/blueprints';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';
import { type as rootPartType } from 'utilities/parts/Root';

export default class blueprintCoreAPI {
  blueprint: rootBlueprintType;

  setPartsState: Dispatch<SetStateAction<Array<rootPartType>>>;

  constructor(blueprint: Object) {
    (() => {
      this.blueprint = updateBlueprint(blueprint);

      [this.blueprint.parts, this.setPartsState] = useState([
        ...this.blueprint.parts,
      ]);
    })();
  }

  createPart(data: rootPartType, index?: number, updateParts = false) {
    (() => {})();
  }

  deletePart(index: number) {}

  mutatePartData(data: rootPartType, index: number) {
    const newPartData = merge(this.blueprint.parts[index], data);
    const newParts = [...this.blueprint.parts];

    newParts[index] = newPartData;
    this.setPartsState(newParts);
  }
}
