import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { UUID } from 'types/Parts';
import { mutateParts } from './mutateParts';

export const mutatePart = <Type extends Part>(
  ID: UUID,
  mutator: (draft: Type) => void,
  state?: Blueprint,
) => {
  mutateParts([ID], mutator, state);
};
