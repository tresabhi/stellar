import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import useBlueprint from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';

export const getPart = <Type extends Part>(ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? useBlueprint.getState();
  return blueprintState.parts.get(ID) as Type | undefined;
};
