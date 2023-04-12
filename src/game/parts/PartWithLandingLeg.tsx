import * as Properties from 'components/Properties';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';

export interface PartWithLandingLeg {
  N: { deploy_state: number; animation_state: number };
}

export const partWithLandingLegData: PartWithLandingLeg = {
  N: { deploy_state: 0, animation_state: 0 },
};

export function PartWithLandingLegProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const deployed = useCheckboxProperty<Part & PartWithLandingLeg>(
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
