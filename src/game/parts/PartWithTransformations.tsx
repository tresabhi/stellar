import * as PropertiesExplorer from 'components/PropertiesExplorer';
import usePropertyController from 'hooks/usePropertyController';
import useTranslator from 'hooks/useTranslator';
import { FC } from 'react';
import { PartPropertyComponentProps } from 'types/Parts';

import { MutableRefObject } from 'react';
import { Group } from 'three';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';
import {
  usePartWithOrientation,
  VanillaPartWithOrientation,
  VanillaPartWithOrientationData,
} from './PartWithOrientation';
import {
  usePartWithPosition,
  VanillaPartWithPosition,
  VanillaPartWithPositionData,
} from './PartWithPosition';
import {
  usePartWithScale,
  VanillaPartWithScale,
  VanillaPartWithScaleData,
} from './PartWithScale';

export interface VanillaPartWithTransformations
  extends VanillaPart,
    VanillaPartWithPosition,
    // omit to fix o key conflict
    Omit<VanillaPartWithOrientation, 'o'>,
    Omit<VanillaPartWithScale, 'o'> {
  o: { x: number; y: number; z: number };
}

export interface PartWithTransformations
  extends Part,
    VanillaPartWithTransformations {}

export const VanillaPartWithTransformationsData: VanillaPartWithTransformations =
  {
    ...VanillaPartData,
    ...VanillaPartWithPositionData,
    ...VanillaPartWithOrientationData,
    ...VanillaPartWithScaleData,

    /**
     * Both scale and orientation of the part where the `x` and `y` axis
     * represent scale and the `z` axis represents orientation
     */
    o: {
      ...VanillaPartWithScaleData.o,
      ...VanillaPartWithOrientationData.o,
    },
  };

export const PartWithTransformationsData: PartWithTransformations = {
  ...PartData,
  ...VanillaPartWithTransformationsData,

  label: 'Unlabeled Part With Transformations',
};

export const usePartWithTransformations = (
  id: string,
  groupRef: MutableRefObject<Group>,
) => {
  usePartWithPosition(id, groupRef);
  usePartWithOrientation(id, groupRef);
  usePartWithScale(id, groupRef);
};

export const PartWithTransformationsPropertyComponent: FC<
  PartPropertyComponentProps
> = ({ ids }) => {
  const { t } = useTranslator();
  const xPos = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.p.x,
    (value) => ({ p: { x: value } }),
    { suffix: 'm' },
  );
  const yPos = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.p.y,
    (value) => ({ p: { y: value } }),
    { suffix: 'm' },
  );
  const rot = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.o.z,
    (value) => ({ o: { z: value } }),
    { modOnClamp: true, max: 360, suffix: '°' },
  );
  const xScale = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.o.x,
    (value) => ({ o: { x: value } }),
    { suffix: 'x' },
  );
  const yScale = usePropertyController<PartWithTransformations>(
    ids,
    (state) => state.o.y,
    (value) => ({ o: { y: value } }),
    { suffix: 'x' },
  );

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>{t`properties_explorer.properties.transformations`}</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input
          ref={xPos}
          label={t`properties_explorer.properties.transformations.position_x`}
        />
        <PropertiesExplorer.Input
          ref={yPos}
          label={t`properties_explorer.properties.transformations.position_y`}
        />
        <PropertiesExplorer.Input
          ref={rot}
          label={t`properties_explorer.properties.transformations.rotation`}
        />
      </PropertiesExplorer.Row>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input
          ref={xScale}
          label={t`properties_explorer.properties.transformations.scale_x`}
        />
        <PropertiesExplorer.Input
          ref={yScale}
          label={t`properties_explorer.properties.transformations.scale_y`}
        />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};
