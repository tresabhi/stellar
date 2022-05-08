import { Blueprint } from 'game/Blueprint';
import { cloneDeep } from 'lodash';
import { AnyPart } from 'types/Parts';
import { getPartRegistry } from './getPartRegistry';
import { removePartMetaData } from './removePartMetaData';

export const exportifyPart = (part: AnyPart, context: Blueprint) => {
  const clonedPart = cloneDeep(part);
  const customExportifier = getPartRegistry(part.n)?.exportify;

  if (customExportifier) {
    return customExportifier(clonedPart, context);
  } else {
    return removePartMetaData(clonedPart as AnyPart);
  }
};
