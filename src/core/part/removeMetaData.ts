import { Part, partData, VanillaPart, vanillaPartData } from 'game/parts/Part';

const vanillaKeys = Object.keys(vanillaPartData);
export const metadataKeys = (Object.keys(partData) as (keyof Part)[]).filter(
  (key) => !vanillaKeys.includes(key),
);

export default function removeMetaData(part: Part) {
  metadataKeys.forEach((key) => {
    delete part[key];
  });

  return part as VanillaPart;
}
