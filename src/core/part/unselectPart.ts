import { Blueprint } from 'game/Blueprint';
import unselectParts from './unselectParts';

export default function unselectPart(id: string, blueprint?: Blueprint) {
  unselectParts([id], blueprint);
}
