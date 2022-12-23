import { Blueprint } from 'game/Blueprint';
import selectPartsOnly from './selectPartsOnly';

// TODO: rename to selectPartsConcurrently
export default function selectPartOnly(id: string, blueprint?: Blueprint) {
  selectPartsOnly([id], blueprint);
}
