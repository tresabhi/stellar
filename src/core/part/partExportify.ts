import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { getPartRegistry } from './getPartRegistry';
import { removePartMetaData } from './removePartMetaData';

export const partExportify = (part: Part, context: Blueprint) => {
  const clonedPart = cloneDeep(part);
  const customExportifier = getPartRegistry(part.n)?.exportify;

  if (customExportifier) {
    return customExportifier(clonedPart, context);
  } else {
    return removePartMetaData(clonedPart as Part);
  }
};
