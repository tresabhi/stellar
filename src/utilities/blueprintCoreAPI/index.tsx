import { Dispatch, SetStateAction } from 'react';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';
import { type as rootPartType } from 'utilities/parts/Root';

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

  updateState = () => {
    this.shallowMerge(this.blueprint);
  };

  deletePart = (index: number) => {
    this.blueprint.parts.splice(index, 1);
    this.updateState();
  };

  mutatePartData = (index: number, data: rootPartType) => {
    this.blueprint.parts[index] = data;
    this.updateState();
  };

  mutatePartDataByShallowMerge = (index: number, data: rootPartType) => {
    this.blueprint.parts[index] = { ...this.blueprint, ...data };
    this.updateState();
  };
}
