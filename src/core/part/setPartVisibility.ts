import { Blueprint } from 'game/Blueprint';
import setPartsVisibility from './setPartsVisibility';

export default function setPartVisibility(
  id: string,
  hidden: boolean,
  blueprint?: Blueprint,
) {
  setPartsVisibility([id], hidden, blueprint);
}
