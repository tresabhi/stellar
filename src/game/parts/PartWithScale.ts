import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithScale extends VanillaPart {
  o: { x: number; y: number };
}

export interface PartWithScale extends Part, VanillaPartWithScale {}

export const VanillaPartWithScaleData: VanillaPartWithScale = {
  ...VanillaPartData,

  o: { x: 0, y: 0 },
};

export const PartWithScaleData: PartWithScale = {
  ...PartData,
  ...VanillaPartWithScaleData,

  label: 'Unlabeled Part With Scale',
};
