import { copyPartsBySelection } from './copyPartsBySelection';
import { pasteParts } from './pasteParts';

export const duplicateParts = () => {
  copyPartsBySelection();
  pasteParts();
};
