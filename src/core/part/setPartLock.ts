import { Blueprint } from 'game/Blueprint';
import setPartsLock from './setPartsLock';

export default function setPartLock(
  id: string,
  locked: boolean,
  blueprint?: Blueprint,
) {
  setPartsLock([id], locked, blueprint);
}
