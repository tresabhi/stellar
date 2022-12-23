import { Blueprint } from 'game/Blueprint';
import copyParts from './copyParts';

export default function copyPart(id: string, blueprint?: Blueprint) {
  copyParts([id], blueprint);
}
