import { useState } from 'react';
import { type as rootBlueprintType } from 'utilities/blueprints/Root';
import { type as rootPartType } from 'utilities/parts/Root';

export default class BlueprintEditorCore {
  parts: Array<{ data: rootPartType; setData: Function }> = [];

  constructor(blueprint: rootBlueprintType) {
    blueprint.parts.forEach((part: rootPartType) => {
      const [data, setData] = useState(part);
      this.parts.push({ data, setData });
    });
  }
}
