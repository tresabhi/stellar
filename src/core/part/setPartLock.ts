import { Blueprint } from 'game/Blueprint';
import { setPartsLock } from './setPartsLock';

export const setPartLock = (id: string, locked: boolean, draft?: Blueprint) => {
  setPartsLock([id], locked, draft);
};
