import { PartData } from 'game/parts/Part';
import { AnyPart } from 'types/Parts';

export const partMetaDataKeys = Object.keys(PartData).filter(
  (key) => key !== 'n',
);

export const removePartMetaData = (part: AnyPart) => {
  partMetaDataKeys.forEach((key) => {
    delete part[key];
  });

  return part;
};
