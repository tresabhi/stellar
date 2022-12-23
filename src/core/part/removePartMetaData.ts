import { Part, PartData } from 'game/parts/Part';

export const partMetaDataKeys = (
  Object.keys(PartData) as (keyof Part)[]
).filter((key) => key !== 'n');

export default function removePartMetaData(part: Part) {
  partMetaDataKeys.forEach((key) => {
    delete part[key];
  });

  return part;
}
