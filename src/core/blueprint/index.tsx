import { type as rootBlueprintType } from 'assets/blueprints/Root';
import { type as rootPartType } from 'core/blueprint/parts/Root';
import { merge } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

export default class blueprintCoreAPI {
  state: rootBlueprintType;
  setState: Dispatch<SetStateAction<rootBlueprintType>>;

  constructor(
    blueprint: rootBlueprintType,
    setBlueprint: Dispatch<SetStateAction<rootBlueprintType>>,
  ) {
    this.state = blueprint;
    this.setState = setBlueprint;
  }

  createPart(data: rootPartType, insertIndex?: number) {
    // let newParts: Array<rootPartType>;
    // if (insertIndex) {
    //   const oldParts = [...this.state.parts];
    //   newParts = oldParts.map((item, index) => {
    //     if (index < insertIndex) return item;
    //     if (index > insertIndex) return oldParts[index - 1];
    //     if (index === insertIndex) return data;
    //   });
    //   newParts.push(oldParts[oldParts.length - 1]);
    // } else {
    //   newParts = [...this.state.parts, data];
    // }
    // this.setState(newParts);
  }

  deletePart(index: number) {
    this.setState({
      ...this.state,
      parts: this.state.parts.filter((part, partIndex) => {
        return partIndex !== index;
      }),
    });
  }

  mutatePartData(data: rootPartType, index: number) {
    this.setState({
      ...this.state,
      parts: this.state.parts.map((part, partIndex) => {
        return partIndex === index ? { ...merge(part, data) } : part;
      }),
    });
  }
}
