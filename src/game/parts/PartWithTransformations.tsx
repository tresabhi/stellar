import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { useNumericalPropertyInput } from 'hooks/useNumericalPropertyInput';
import { useTranslator } from 'hooks/useTranslator';
import { FC } from 'react';
import { PartPropertyComponentProps } from 'types/Parts';

import { MutableRefObject } from 'react';
import { Group, Mesh } from 'three';
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
  groupRef: MutableRefObject<Mesh | Group>,
) => {
  usePartWithPosition(id, groupRef);
  usePartWithOrientation(id, groupRef);
  usePartWithScale(id, groupRef);
};

export const PartWithTransformationsPropertyComponent: FC<
  PartPropertyComponentProps
> = ({ ids }) => {
  const { t } = useTranslator();
  const xPosition = useNumericalPropertyInput<PartWithTransformations>(
    ids,
    (state) => state.p.x,
    (draft, value) => {
      draft.p.x = value;
    },
  );
  const yPosition = useNumericalPropertyInput<PartWithTransformations>(
    ids,
    (state) => state.p.y,
    (draft, value) => {
      draft.p.y = value;
    },
  );
  const rotation = useNumericalPropertyInput<PartWithTransformations>(
    ids,
    (state) => state.o.z,
    (draft, value) => {
      draft.o.z = value;
    },
  );
  const xScale = useNumericalPropertyInput<PartWithTransformations>(
    ids,
    (state) => state.o.x,
    (draft, value) => {
      draft.o.x = value;
    },
  );
  const yScale = useNumericalPropertyInput<PartWithTransformations>(
    ids,
    (state) => state.o.y,
    (draft, value) => {
      draft.o.y = value;
    },
  );

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>{t`tab.layout.right_sidebar.properties.transformations`}</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input
          ref={xPosition}
          label={t`tab.layout.right_sidebar.properties.transformations.x_position`}
          unit="m"
        />
        <PropertiesExplorer.Input
          ref={yPosition}
          label={t`tab.layout.right_sidebar.properties.transformations.y_position`}
          unit="m"
        />
        <PropertiesExplorer.Input
          ref={rotation}
          label={t`tab.layout.right_sidebar.properties.transformations.rotation`}
          unit="°"
        />
      </PropertiesExplorer.Row>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.Input
          ref={xScale}
          label={t`tab.layout.right_sidebar.properties.transformations.x_scale`}
          unit="x"
        />
        <PropertiesExplorer.Input
          ref={yScale}
          label={t`tab.layout.right_sidebar.properties.transformations.y_scale`}
          unit="x"
        />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};
