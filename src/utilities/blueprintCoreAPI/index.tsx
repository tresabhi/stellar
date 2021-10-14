import { Dispatch, SetStateAction } from 'react';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';

export default class blueprintCoreAPI {
  blueprint: rootBlueprintType;
  setBlueprint: Dispatch<SetStateAction<rootBlueprintType>>;

  constructor(
    blueprint: rootBlueprintType,
    setBlueprint: Dispatch<SetStateAction<rootBlueprintType>>,
  ) {
    this.blueprint = { ...blueprint };
    this.setBlueprint = setBlueprint;
  }

  shallowMerge = (merge: Object) => {
    this.setBlueprint({ ...this.blueprint, ...merge });
  };

  deletePart = (index: number) => {
    alert(index);
    this.blueprint.parts.splice(index, 1);
    this.shallowMerge({
      parts: this.blueprint.parts,
    });
  };
}
