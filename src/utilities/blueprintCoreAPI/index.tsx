import { cloneDeep, merge } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { updateBlueprint } from 'utilities/blueprints';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';
import { type as rootPartType } from 'utilities/parts/Root';

export default class blueprintCoreAPI {
  blueprint: rootBlueprintType;

  setPartState: Array<Dispatch<SetStateAction<rootPartType>>> = [];

  constructor(blueprint: Object) {
    (() => {
      this.blueprint = updateBlueprint(blueprint);

      this.blueprint.parts.forEach((part, index) => {
        [this.blueprint.parts[index], this.setPartState[index]] =
          useState(part);
      });
    })();
  }

  createPart(data: rootPartType, index?: number, updateParts = false) {
    (() => {})();
  }

  deletePart(index: number) {}

  mutatePartData(data: rootPartType, index: number) {
    // alert(JSON.stringify(data));
    this.setPartState[index](
      merge(cloneDeep(this.blueprint.parts[index]), data),
    );
  }
}
