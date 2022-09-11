import * as Properties from 'components/LegacyProperties';
import { FC } from 'react';
import { PartPropertyComponentProps } from 'types/Parts';
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

export const PartWithEnginePropertyComponent: FC<
  PartPropertyComponentProps
> = ({ ids }) => {
  return (
    <Properties.Group>
      <Properties.Title>Engine</Properties.Title>
      <Properties.Row>
        <Properties.Toggle label="Engine On" type="full-width" />
      </Properties.Row>
    </Properties.Group>
  );
};
