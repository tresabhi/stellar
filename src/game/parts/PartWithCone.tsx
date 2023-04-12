import { invalidate } from '@react-three/fiber';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { RefObject } from 'react';
import boundsStore from 'stores/bounds';
import { Object3D } from 'three';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';
import { PartWithPosition } from './PartWithPosition';

export interface PartWithCone {
  N: { size: number };
}

export const partWithConeData: PartWithCone = {
  N: { size: 1 },
};

export function usePartWithCone(id: string, object: RefObject<Object3D>) {
  usePartProperty(
    id,
    (newState: Part & PartWithCone) => newState.N.size,
    (newSize, lastSize) => {
      object.current?.scale.set(newSize, newSize, newSize);

      const { p } = getPart<Part & PartWithPosition>(id);
      const { bounds } = boundsStore[id];
      const changedScale = newSize / lastSize;

      bounds.x = p.x + (bounds.x - p.x) * changedScale;
      bounds.y = p.y + (bounds.y - p.y) * changedScale;
      bounds.width *= changedScale;
      bounds.height *= changedScale;

      declareBoundsUpdated(id);
      invalidate();
    },
  );
}

export function PartWithConeProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const size = useNumericalInputProperty<Part & PartWithCone>(
    ids,
    (state) => state.N.size,
    (draft, newValue) => {
      draft.N.size = newValue;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.cone`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...size}
          label={t`tabs.layout.right_sidebar.properties.cone.size`}
          unit="m"
        />
      </Properties.Row>
    </Properties.Group>
  );
}
