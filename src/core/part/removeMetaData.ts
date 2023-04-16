import { Part, partData, VanillaPart, vanillaPartData } from 'game/parts/Part';
import { partWithStageData } from 'game/parts/PartWithStage';

const vanillaPartKeys = Object.keys(vanillaPartData);
export const partMetadataKeys = (
  [
    ...Object.keys(partData),
    ...Object.keys(partWithStageData),
  ] as (keyof Part)[]
).filter((key) => !vanillaPartKeys.includes(key));

export default function removeMetaData(part: Part) {
  partMetadataKeys.forEach((key) => {
    delete part[key];
  });

  return part as VanillaPart;
}
