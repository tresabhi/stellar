import * as Properties from 'components/Properties';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithLandingLeg extends VanillaPart {
  N: {
    deploy_state: number;
    animation_state: number;
  };
}

export interface PartWithLandingLeg extends Part, VanillaPartWithLandingLeg {}

export const VanillaPartWithLandingLegData: VanillaPartWithLandingLeg = {
  ...VanillaPartData,

  n: 'Part With LandingLeg',
  N: {
    deploy_state: 0.0,
    animation_state: 0.0,
  },
};

export const PartWithLandingLegData: PartWithLandingLeg = {
  ...PartData,
  ...VanillaPartWithLandingLegData,
};

export function PartWithLandingLegProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const deployed = useCheckboxProperty<PartWithLandingLeg>(
    ids,
    (state) => state.N.deploy_state !== 0,
    (draft, value) => {
      draft.N.deploy_state = value ? 1 : 0;
      draft.N.animation_state = draft.N.deploy_state;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.landing_leg`}</Properties.Title>

      <Properties.Row>
        <Properties.Checkbox
          {...deployed}
          label={t`tabs.layout.right_sidebar.properties.landing_leg.extended`}
        />
      </Properties.Row>
    </Properties.Group>
  );
}
