import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import getPartRegistry from './getPartRegistry';
import removeMetaData from './removeMetaData';

export default function exportifyPart(part: Part, blueprint: Blueprint) {
  const partRegistry = getPartRegistry(part.n);
  const clonedPart = cloneDeep(part);
  const customExportifier = partRegistry?.exportify;

  if (customExportifier) return customExportifier(clonedPart, blueprint);
  if (partRegistry?.vanillaData === null) return null;

  return removeMetaData(clonedPart as Part);
}
