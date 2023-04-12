import * as Properties from 'components/Properties';
import useCheckboxProperty from 'hooks/propertyControllers/useCheckboxProperty';
import useTranslator from 'hooks/useTranslator';
import { PartPropertyComponentProps } from 'types/Parts';
import { Part } from './Part';

export interface PartWithEngine {
  B: { engine_on: boolean; head_on__for_creative_use: boolean };
}

export const partWithEngineData: PartWithEngine = {
  B: { engine_on: false, head_on__for_creative_use: true },
};

export function PartWithEngineProperties({ ids }: PartPropertyComponentProps) {
  const { t } = useTranslator();

  const enabled = useCheckboxProperty<Part & PartWithEngine>(
    ids,
    (state) => state.B.engine_on,
    (draft, value) => {
      draft.B.engine_on = value;
    },
  );
  const heatDamage = useCheckboxProperty<Part & PartWithEngine>(
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
