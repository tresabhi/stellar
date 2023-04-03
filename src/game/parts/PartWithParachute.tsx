import * as Properties from 'components/Properties';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithParachute extends VanillaPart {
  N: {
    deploy_state: number;
    animation_state: number;
  };
}

export interface PartWithParachute extends Part, VanillaPartWithParachute {}

export const VanillaPartWithParachuteData: VanillaPartWithParachute = {
  ...VanillaPartData,

  n: 'Part With Parachute',
  N: {
    deploy_state: 0.0,
    animation_state: 0.0,
  },
};

export const PartWithParachuteData: PartWithParachute = {
  ...PartData,
  ...VanillaPartWithParachuteData,

  label: 'Unlabeled Part With Parachute',
};

export function PartWithParachuteProperties({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const deployed = useCheckboxProperty<PartWithParachute>(
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
