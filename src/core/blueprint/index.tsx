import { merge } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { updateBlueprint } from 'utilities/blueprints';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';
import { type as rootPartType } from 'utilities/parts/Root';

export default class blueprintCoreAPI {
  state: rootBlueprintType;
  setState: Dispatch<SetStateAction<rootBlueprintType>>;

  constructor(blueprint: Object) {
    // wrapped in anonymous function to let us use react states
    (() => {
      [this.state, this.setState] = useState(updateBlueprint(blueprint));
    })();
  }

  createPart(data: rootPartType, index?: number) {
    (() => {})();
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
