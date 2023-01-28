import * as Properties from 'components/Properties';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithEngine extends VanillaPart {
  B: {
    engine_on: boolean;
    head_on__for_creative_use: boolean;
  };
}

export interface PartWithEngine extends Part, VanillaPartWithEngine {}

export const VanillaPartWithEngineData: VanillaPartWithEngine = {
  ...VanillaPartData,

  B: {
    engine_on: false,
    head_on__for_creative_use: true,
  },
};

export const PartWithEngineData: PartWithEngine = {
  ...PartData,
  ...VanillaPartWithEngineData,

  label: 'Unlabeled Part With Engine',
};

export function PartWithEnginePropertyComponent({
  ids,
}: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const enabled = useCheckboxProperty<PartWithEngine>(
    ids,
    (state) => state.B.engine_on,
    (draft, value) => {
      draft.B.engine_on = value;
    },
  );
  const heatDamage = useCheckboxProperty<PartWithEngine>(
    ids,
    (state) => state.B.head_on__for_creative_use,
    (draft, value) => {
      draft.B.head_on__for_creative_use = value;
    },
  );

  return (
    <Properties.Group>
      <Properties.Title>{t`tabs.layout.right_sidebar.properties.engine`}</Properties.Title>

      <Properties.Row>
        <Properties.Checkbox
          {...enabled}
          label={t`tabs.layout.right_sidebar.properties.engine.enabled`}
        />
        <Properties.Checkbox
          {...heatDamage}
          label={t`tabs.layout.right_sidebar.properties.engine.heat_damage`}
        />
      </Properties.Row>
    </Properties.Group>
  );
}

export const registry = null;
