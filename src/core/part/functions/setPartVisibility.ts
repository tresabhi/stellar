import { Blueprint } from 'game/Blueprint';
import { setPartsVisibility } from './setPartsVisibility';

export const setPartVisibility = (
  id: string,
  hidden: boolean,
  draft?: Blueprint,
) => {
  setPartsVisibility([id], hidden, draft);
};
