import { Part, PartData } from 'game/parts/Part';

export const metadataKeys = (Object.keys(PartData) as (keyof Part)[]).filter(
  (key) => key !== 'n',
);

export default function removeMetaData(part: Part) {
  metadataKeys.forEach((key) => {
    delete part[key];
  });

  return part;
}
