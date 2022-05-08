import { Blueprint } from 'game/Blueprint';
import blueprintStore from 'hooks/useBlueprint';
import produce from 'immer';

export const mutateBlueprintVersionless = (
  producer: (state: Blueprint) => void,
) => {
  const nextState = produce(blueprintStore.getState(), producer);
  blueprintStore.setState(nextState);
};
