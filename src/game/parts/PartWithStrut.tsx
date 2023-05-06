import { invalidate } from '@react-three/fiber';
import { ORIGIN } from 'components/Canvas/components/EditControls/components/FuelTankControls';
import * as Properties from 'components/Properties';
import declareBoundsUpdated from 'core/bounds/declareBoundsUpdated';
import getPart from 'core/part/getPart';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import usePartProperty from 'hooks/usePartProperty';
import useTranslator from 'hooks/useTranslator';
import { RefObject } from 'react';
import boundsStore from 'stores/bounds';
import { Mesh, RepeatWrapping, Texture, Vector2 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';
import { PartWithTransformations } from './PartWithTransformations';

export interface PartWithStrut {
  N: { size: number };
}

export const partWithStrutData: PartWithStrut = {
  N: { size: 1 },
};

export function usePartWithStrut(
  id: string,
  middleColorMap: Texture,
  top: RefObject<Mesh>,
  right: RefObject<Mesh>,
  bottom: RefObject<Mesh>,
  left: RefObject<Mesh>,
  middle: RefObject<Mesh>,
) {
  const offset = new Vector2();
  const position = new Vector2();

  middleColorMap.wrapS = RepeatWrapping;

  usePartProperty(
    id,
    (state: Part & PartWithStrut) => state.N,
    ({ size }) => {
      top.current?.position.set(size / 2, 0.4375, 0);
      top.current?.scale.set(size - 0.25, 1, 1);
      right.current?.position.set(size - 0.0625, 0.25, 0);
      bottom.current?.position.set(size / 2, 0.0625, 0);
      bottom.current?.scale.set(size - 0.25, 1, 1);
      left.current?.position.set(0.0625, 0.25, 0);
      middle.current?.position.set(size / 2, 0.25, 0);
      middle.current?.scale.set(size - 0.25, 1, 1);

      middleColorMap.repeat.set(size * 2, 1);

      const part = getPart<Part & PartWithTransformations>(id);
      const width = size * part.o.x;
      const height = 0.5 * part.o.y;
      const rotation = degToRad(part.o.z);

      position.set(part.p.x, part.p.y);
      offset
        .set(width / 2, height / 2)
        .rotateAround(ORIGIN, rotation)
        .add(position);

      boundsStore[id].bounds = {
        width,
        height,
        rotation,
        x: offset.x,
        y: offset.y,
      };

      declareBoundsUpdated(id);
      invalidate();
    },
  );
}

export function PartWithStrutProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const size = useNumericalInputProperty<Part & PartWithStrut>(
    ids,
    (state) => state.N.size,
    (draft, newValue) => {
      draft.N.size = newValue;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.strut`}</Properties.Title>

      <Properties.Row>
        <Properties.Input
          {...size}
          label={t`tabs.layout.right_sidebar.properties.strut.size`}
          unit="m"
        />
      </Properties.Row>
    </Properties.Group>
  );
}
