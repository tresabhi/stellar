import * as Properties from 'components/Properties';
import useSliderProperty from 'hooks/propertyControllers/useSliderProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';

export interface PartWithFuelN {
  fuel_percent: number;
}

export interface PartWithFuel {
  N: PartWithFuelN;
}

export const partWithFuelData: PartWithFuel = {
  N: { fuel_percent: 1 },
};

export function PartWithFuelProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const fuel = useSliderProperty<Part & PartWithFuel>(
    ids,
    (state) => state.N.fuel_percent * 100,
    (draft, value) => {
      draft.N.fuel_percent = value / 100;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.fuel`}</Properties.Title>

      <Properties.Row>
        <Properties.SliderWithInput
          {...fuel}
          label={t`tabs.layout.right_sidebar.properties.fuel.fuel`}
        />
      </Properties.Row>
    </Properties.Group>
  );
}
