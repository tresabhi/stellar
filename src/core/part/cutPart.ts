import { Blueprint } from 'game/Blueprint';
import cutParts from './cutParts';

export default function cutPart(id: string, blueprint?: Blueprint) {
  cutParts([id], blueprint);
}
