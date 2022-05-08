import { Blueprint } from 'game/Blueprint';
import produce from 'immer';
import blueprintStore from 'stores/blueprint';

export const mutateBlueprintVersionless = (
  producer: (state: Blueprint) => void,
) => {
  const nextState = produce(blueprintStore.getState(), producer);
  blueprintStore.setState(nextState);
};
