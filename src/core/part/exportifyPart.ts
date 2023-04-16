import { Blueprint } from 'game/Blueprint';
import { Part, VanillaPart } from 'game/parts/Part';
import { cloneDeep } from 'lodash';
import getPartRegistry from './getPartRegistry';
import removeMetaData from './removeMetaData';

export default function exportifyPart(
  part: Part,
  blueprint: Blueprint,
): [VanillaPart[], Part[]] {
  const partRegistry = getPartRegistry(part.n);
  const clonedPart = cloneDeep(part);

  if (clonedPart.visible) {
    const customExportifier = partRegistry?.exportify;

    if (customExportifier) return customExportifier(clonedPart, blueprint);
    if (partRegistry?.vanillaData === null) return [[], []];

    return [[removeMetaData(clonedPart as Part)], [clonedPart]];
  }

  return [[], []];
}
