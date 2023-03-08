import * as Properties from 'components/Properties';
import useNumericalInputProperty from 'hooks/propertyControllers/useNumericalInputProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithCone extends VanillaPart {
  N: { size: number };
}

export interface PartWithCone extends Part, VanillaPartWithCone {}

export const VanillaPartWithConeData: VanillaPartWithCone = {
  ...VanillaPartData,

  N: { size: 1 },
};

export const PartWithConeData: PartWithCone = {
  ...PartData,
  ...VanillaPartWithConeData,

  label: 'Unlabeled Part With Cone',
};

export function PartWithConeProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const size = useNumericalInputProperty<PartWithCone>(
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

export const registry = null;
