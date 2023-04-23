import { Part, partData, VanillaPart, vanillaPartData } from 'game/parts/Part';
import { partWithStagesData } from 'game/parts/PartWithStages';

const vanillaPartKeys = Object.keys(vanillaPartData);
export const partMetadataKeys = (
  [
    ...Object.keys(partData),
    ...Object.keys(partWithStagesData),
  ] as (keyof Part)[]
).filter((key) => !vanillaPartKeys.includes(key));

export default function removeMetaData(part: Part) {
  partMetadataKeys.forEach((key) => {
    delete part[key];
  });

  return part as VanillaPart;
}
