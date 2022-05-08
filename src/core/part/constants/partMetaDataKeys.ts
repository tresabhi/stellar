import { PartData } from 'game/parts/Part';

export const partMetaDataKeys = Object.keys(PartData).filter(
  (key) => key !== 'n',
);
