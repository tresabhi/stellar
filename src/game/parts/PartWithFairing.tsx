import { invalidate } from '@react-three/fiber';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useSliderProperty from 'hooks/propertyControllers/useSliderProperty';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { RefObject, useEffect } from 'react';
import boundsStore from 'stores/bounds';
import useSettings from 'stores/settings';
import { MeshBasicMaterial, Object3D } from 'three';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';
import { PartWithPosition } from './PartWithPosition';

const UNIT_SIZE = 1.4;

export interface PartWithFairing {
  N: {
    force_percent: number;
    width_original: number;
    width: number;
  };
  B: {
    detach_edge: boolean;
    adapt_to_tank: boolean;
  };
}

export const partWithFairingData: PartWithFairing = {
  N: {
    force_percent: 0.5,
    width_original: 1 / UNIT_SIZE,
    width: 1 / UNIT_SIZE,
  },
  B: {
    detach_edge: false,
    adapt_to_tank: false,
  },
};

export function usePartWithFairing(
  id: string,
  object: RefObject<Object3D>,
  material: RefObject<MeshBasicMaterial>,
) {
  usePartProperty(
    id,
    (state: Part & PartWithFairing) => state.N.width,
    (newWidth, lastWidth) => {
      const { p } = getPart<Part & PartWithPosition>(id);
      const { bounds } = boundsStore[id];
      const scale = newWidth / lastWidth;

      bounds.width *= scale;
      bounds.height *= scale;
      bounds.x = (bounds.x - p.x) * scale + p.x;
      bounds.y = (bounds.y - p.y) * scale + p.y;

      object.current?.scale.set(newWidth, newWidth, 1);
      invalidate();
      declareBoundsUpdated(id);
    },
  );

  useEffect(() => {
    function updateInteriorView(
      interiorView = useSettings.getState().editor.interiorView,
    ) {
      if (material.current) {
        material.current.opacity = interiorView ? 0.25 : 1;
        invalidate();
      }
    }

    updateInteriorView();

    return useSettings.subscribe(
      (state) => state.editor.interiorView,
      updateInteriorView,
    );
  }, [material]);
}

export function PartWithFairingProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const size = useNumericalInputProperty<Part & PartWithFairing>(
    ids,
    (state) => state.N.width * UNIT_SIZE,
    (draft, newValue) => {
      draft.N.width_original = newValue / UNIT_SIZE;
      draft.N.width = newValue / UNIT_SIZE;
    },
  );
  const detachEdge = useCheckboxProperty<Part & PartWithFairing>(
    ids,
    (state) => state.B.detach_edge,
    (draft, newValue) => {
      draft.B.detach_edge = newValue;
    },
  );
  const separationForce = useSliderProperty<Part & PartWithFairing>(
    ids,
    (state) => state.N.force_percent * 100,
    (draft, value) => {
      draft.N.force_percent = value / 100;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.fairing`}</Properties.Title>

      <Properties.Row>
        <Properties.Checkbox
          {...detachEdge}
          label={t`tabs.layout.right_sidebar.properties.fairing.detach_edge`}
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.Input
          {...size}
          label={t`tabs.layout.right_sidebar.properties.fairing.size`}
          unit="m"
        />
      </Properties.Row>

      <Properties.Row>
        <Properties.SliderWithInput
          {...separationForce}
          label={t`tabs.layout.right_sidebar.properties.docking_port.separation_force`}
          unit="%"
          min={0}
          max={100}
        />
      </Properties.Row>
    </Properties.Group>
  );
}
