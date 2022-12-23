import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import mutateParts from './mutateParts';

export default function mutatePart<Type extends Part>(
  id: string,
  mutator: (draft: Type) => void,
  blueprint?: Blueprint,
) {
  mutateParts([id], mutator, false, blueprint);
}
