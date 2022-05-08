import { AnyPart } from 'types/Parts';
import { partMetaDataKeys } from '../constants/partMetaDataKeys';

export const removePartMetaData = (part: AnyPart) => {
  partMetaDataKeys.forEach((key) => {
    delete part[key];
  });

  return part;
};
