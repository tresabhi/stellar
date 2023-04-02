import { Part, PartData, VanillaPart, VanillaPartData } from 'game/parts/Part';

const vanillaKeys = Object.keys(VanillaPartData);
export const metadataKeys = (Object.keys(PartData) as (keyof Part)[]).filter(
  (key) => !vanillaKeys.includes(key),
);

export default function removeMetaData(part: Part) {
  metadataKeys.forEach((key) => {
    delete part[key];
  });

  return part as VanillaPart;
}
