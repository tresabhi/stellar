import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'hooks/useBlueprint';

export const getPart = <Type extends Part>(id: string, state?: Blueprint) => {
  const blueprintState = state ?? useBlueprint.getState();
  return blueprintState.parts.get(id) as Type | undefined;
};
