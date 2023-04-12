import { Link1Icon, LinkNone1Icon } from '@radix-ui/react-icons';
import * as Properties from 'components/Properties';
import mutateSettings from 'core/app/mutateSettings';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useTranslator from 'hooks/useTranslator';
import { RefObject } from 'react';
import useSettings from 'stores/settings';
import { Object3D } from 'three';
import { PartPropertyComponentProps } from 'types/Parts';
import normalizeAngle from 'utilities/normalizeAngle';
import { Part } from './Part';
import {
  PartWithOrientation,
  partWithOrientationData,
  usePartWithOrientation,
} from './PartWithOrientation';
import {
  PartWithPosition,
  partWithPositionData,
  usePartWithPosition,
} from './PartWithPosition';
import {
  PartWithScale,
  partWithScaleData,
  usePartWithScale,
} from './PartWithScale';

export interface PartWithTransformations
  extends PartWithPosition,
    Omit<PartWithOrientation, 'o'>,
    Omit<PartWithScale, 'o'> {
  o: { x: number; y: number; z: number };
}

export const partWithTransformationsData: PartWithTransformations = {
  ...partWithPositionData,
  ...partWithOrientationData,
  ...partWithScaleData,

  o: {
    ...partWithScaleData.o,
    ...partWithOrientationData.o,
  },
};

export const usePartWithTransformations = (
  id: string,
  object: RefObject<Object3D>,
  flipLighting = true,
) => {
  usePartWithPosition(id, object);
  usePartWithOrientation(id, object);
  usePartWithScale(id, object, flipLighting);
};

export function PartWithTransformationsProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();
  const constrain = useSettings((state) => state.editor.constrainScales);
  const xPosition = useNumericalInputProperty<Part & PartWithTransformations>(
    ids,
    (state) => state.p.x,
    (draft, value) => {
      draft.p.x = value;
    },
  );
  const yPosition = useNumericalInputProperty<Part & PartWithTransformations>(
    ids,
    (state) => state.p.y,
    (draft, value) => {
      draft.p.y = value;
    },
  );
  const rotation = useNumericalInputProperty<Part & PartWithTransformations>(
    ids,
    (state) => state.o.z,
    (draft, value) => {
      draft.o.z = normalizeAngle(value, true);
    },
  );
  const xScale = useNumericalInputProperty<Part & PartWithTransformations>(
    ids,
    (state) => state.o.x,
    (draft, newValue, lastValue) => {
      draft.o.x = newValue;
      if (constrain && lastValue !== undefined && lastValue !== 0) {
        draft.o.y *= newValue / lastValue;
      }
    },
  );
  const yScale = useNumericalInputProperty<Part & PartWithTransformations>(
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
