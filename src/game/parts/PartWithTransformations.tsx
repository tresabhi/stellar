import * as Properties from 'components/Properties';
import { useNumericalInputProperty } from 'hooks/useNumericalInputProperty';
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
  const xPosition = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.p.x,
    (draft, value) => {
      draft.p.x = value;
    },
  );
  const yPosition = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.p.y,
    (draft, value) => {
      draft.p.y = value;
    },
  );
  const rotation = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.o.z,
    (draft, value) => {
      draft.o.z = value;
    },
  );
  const xScale = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.o.x,
    (draft, value) => {
      draft.o.x = value;
    },
  );
  const yScale = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.o.y,
    (draft, value) => {
      draft.o.y = value;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tab.layout.right_sidebar.properties.transformations`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...xPosition}
          label={t`tab.layout.right_sidebar.properties.transformations.x_position`}
          unit="m"
        />
        <Properties.Input
          {...yPosition}
          label={t`tab.layout.right_sidebar.properties.transformations.y_position`}
          unit="m"
        />
        <Properties.Input
          {...rotation}
          label={t`tab.layout.right_sidebar.properties.transformations.rotation`}
          unit="°"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.Input
          {...xScale}
          label={t`tab.layout.right_sidebar.properties.transformations.x_scale`}
          unit="x"
        />
        <Properties.Input
          {...yScale}
          label={t`tab.layout.right_sidebar.properties.transformations.y_scale`}
          unit="x"
        />
      </Properties.Row>
    </Properties.Group>
  );
};
