import { Link1Icon, LinkNone1Icon } from '@radix-ui/react-icons';
import * as Properties from 'components/Properties';
import mutateSettings from 'core/app/mutateSettings';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useTranslator from 'hooks/useTranslator';
import { RefObject } from 'react';
import useSettings from 'stores/settings';
import { Object3D } from 'three';
import { PartPropertyComponentProps } from 'types/Parts';
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
  object: RefObject<Object3D>,
) => {
  usePartWithPosition(id, object);
  usePartWithOrientation(id, object);
  usePartWithScale(id, object);
};

export function PartWithTransformationsProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const constrain = useSettings((state) => state.editor.constrainScales);
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
      draft.o.z = value % 360;
    },
  );
  const xScale = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.o.x,
    (draft, newValue, lastValue) => {
      draft.o.x = newValue;
      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.o.y *= newValue / lastValue;
      }
    },
  );
  const yScale = useNumericalInputProperty<PartWithTransformations>(
    ids,
    (state) => state.o.y,
    (draft, newValue, lastValue) => {
      draft.o.y = newValue;
      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.o.x *= newValue / lastValue;
      }
    },
  );

  const handleConstrainClick = () => {
    mutateSettings((state) => {
      state.editor.constrainScales = !state.editor.constrainScales;
    });
  };

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.transformations`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...xPosition}
          label={t`tabs.layout.right_sidebar.properties.transformations.x_position`}
          unit="m"
        />
        <Properties.Input
          {...yPosition}
          label={t`tabs.layout.right_sidebar.properties.transformations.y_position`}
          unit="m"
        />
        <Properties.Input
          {...rotation}
          label={t`tabs.layout.right_sidebar.properties.transformations.rotation`}
          unit="°"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.Input
          {...xScale}
          label={t`tabs.layout.right_sidebar.properties.transformations.x_scale`}
          unit="x"
        />
        <Properties.Input
          {...yScale}
          label={t`tabs.layout.right_sidebar.properties.transformations.y_scale`}
          unit="x"
        />
        <Properties.ToggleButton
          label={t`tabs.layout.right_sidebar.properties.transformations.constrain`}
          hint={t`tabs.layout.right_sidebar.properties.transformations.constrain.hint`}
          onClick={handleConstrainClick}
          selected={constrain}
        >
          {constrain ? <Link1Icon /> : <LinkNone1Icon />}
        </Properties.ToggleButton>
      </Properties.Row>
    </Properties.Group>
  );
}

export const registry = null;
