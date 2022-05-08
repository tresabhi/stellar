import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import blueprintStore from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';

export const getPart = <Type extends Part>(ID: UUID, state?: Blueprint) => {
  const blueprintState = state ?? blueprintStore.getState();
  return blueprintState.parts.get(ID) as Type | undefined;
};
