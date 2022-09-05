import * as PropertiesExplorer from 'components/LegacyPropertiesExplorer';
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
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>Engine</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Toggle label="Engine On" type="full-width" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};
