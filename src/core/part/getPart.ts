import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/blueprint';

export default function getPart<Type extends Part>(
  id: string,
  blueprint?: Blueprint,
): Type {
  if (blueprint) {
    return blueprint.parts[id] as Type;
  }
  return getPart<Type>(id, useBlueprint.getState());
}
