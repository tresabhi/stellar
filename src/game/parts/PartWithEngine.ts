import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithEngine extends VanillaPart {
  /**
   * Data about engine parts
   */
  B: {
    /**
     * Part will exert thrust and abide the thrust throttle
     */
    engine_on: boolean;
  };
}

export interface PartWithEngine extends Part, VanillaPartWithEngine {}

export const VanillaPartWithEngineData: VanillaPartWithEngine = {
  ...VanillaPartData,

  B: { engine_on: false },
};

export const PartWithEngineData: PartWithEngine = {
  ...PartData,
  ...VanillaPartWithEngineData,

  label: 'Unlabeled Part Engine',
};
