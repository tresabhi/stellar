import * as Properties from 'components/Properties';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';

export interface PartWithParachute {
  N: { deploy_state: number; animation_state: number };
}

export const partWithParachuteData: PartWithParachute = {
  N: { deploy_state: 0, animation_state: 0 },
};

export function PartWithParachuteProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const deployed = useCheckboxProperty<Part & PartWithParachute>(
    ids,
    (state) => state.N.deploy_state !== 0,
    (draft, value) => {
      draft.N.deploy_state = value ? 3 : 0;
      draft.N.animation_state = draft.N.deploy_state;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.parachute`}</Properties.Title>

      <Properties.Row>
        <Properties.Checkbox
          {...deployed}
          label={t`tabs.layout.right_sidebar.properties.parachute.deployed`}
        />
      </Properties.Row>
    </Properties.Group>
  );
}
