import { Blueprint } from 'game/Blueprint';
import deleteParts from './deleteParts';

export default function deletePart(id: string, blueprint?: Blueprint) {
  deleteParts([id], blueprint);
}
