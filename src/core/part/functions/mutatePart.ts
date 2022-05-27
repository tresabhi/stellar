import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { mutateParts } from './mutateParts';

export const mutatePart = <Type extends Part>(
  id: string,
  mutator: (draft: Type) => void,
  state?: Blueprint,
) => {
  mutateParts([id], mutator, state);
};
