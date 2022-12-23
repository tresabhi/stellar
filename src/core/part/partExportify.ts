import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import { getPartRegistry } from './getPartRegistry';
import removePartMetaData from './removePartMetaData';

export default function partExportify(part: Part, blueprint: Blueprint) {
  const clonedPart = cloneDeep(part);
  const customExportifier = getPartRegistry(part.n)?.exportify;

  if (customExportifier) {
    return customExportifier(clonedPart, blueprint);
  }
  return removePartMetaData(clonedPart as Part);
}
