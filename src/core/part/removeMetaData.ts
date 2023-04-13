import { Part, partData, VanillaPart, vanillaPartData } from 'game/parts/Part';

const vanillaPartKeys = Object.keys(vanillaPartData);
export const partMetadataKeys = (
  Object.keys(partData) as (keyof Part)[]
).filter((key) => !vanillaPartKeys.includes(key));

export default function removeMetaData(part: Part) {
  partMetadataKeys.forEach((key) => {
    delete part[key];
  });

  return part as VanillaPart;
}
