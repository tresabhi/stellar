import { Blueprint } from 'game/Blueprint';
import useBlueprint from 'hooks/useBlueprint';
import produce from 'immer';

export const mutateBlueprintVersionless = (
  producer: (state: Blueprint) => void,
) => {
  const nextState = produce(useBlueprint.getState(), producer);
  useBlueprint.setState(nextState);
};
