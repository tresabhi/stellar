import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import getPartRegistry from './getPartRegistry';
import removeMetaData from './removeMetaData';

export default function exportifyPart(part: Part, blueprint: Blueprint) {
  const clonedPart = cloneDeep(part);
  const customExportifier = getPartRegistry(part.n)?.exportify;

  if (customExportifier) {
    return customExportifier(clonedPart, blueprint);
  }
  return removeMetaData(clonedPart as Part);
}
