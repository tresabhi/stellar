import { Blueprint } from 'game/Blueprint';
import produce from 'immer';
import useBlueprint from 'stores/useBlueprint';

export const mutateBlueprintVersionless = (
  producer: (state: Blueprint) => void,
) => {
  const nextState = produce(useBlueprint.getState(), producer);
  useBlueprint.setState(nextState);
};
