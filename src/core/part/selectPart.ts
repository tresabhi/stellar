import { Blueprint } from 'game/Blueprint';
import selectParts from './selectParts';

export default function selectPart(id: string, blueprint?: Blueprint) {
  selectParts([id], blueprint);
}
