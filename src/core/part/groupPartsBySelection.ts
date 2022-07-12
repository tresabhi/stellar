import useBlueprint from 'hooks/useBlueprint';
import { groupParts } from './groupParts';

export const groupPartsBySelection = () => {
  const blueprintState = useBlueprint.getState();

  groupParts(
    blueprintState.selections,
    blueprintState.selections[blueprintState.selections.length - 1],
  );
};
