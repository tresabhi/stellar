import * as Properties from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import { partExportify } from 'core/part';
import usePart from 'hooks/usePart';
import { useTranslator } from 'hooks/useTranslator';
import useBlueprint from 'stores/useBlueprint';
import useBounds from 'stores/useBounds';
import { fixFloatRounding } from 'utilities/fixFloatRounding';

const INDENT = 2;

export const Inspect = () => {
  const { t } = useTranslator();
  const isOneSelected = useBlueprint((state) => state.selections.length === 1);
  const state = useBlueprint.getState();
  const id = state.selections[0];
  const data = usePart(id);
  const bounds = useBounds((state) => state.parts.get(id)?.bounds);
  const json = JSON.stringify(data, undefined, INDENT);
  const vanillaJson =
    data && JSON.stringify(partExportify(data, state), undefined, INDENT);

  return isOneSelected && data && bounds ? (
    <Properties.Container>
      <Properties.Group>
        <Properties.Title>{t`tab.layout.right_sidebar.inspect.meta_data`}</Properties.Title>

        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.meta_data.id`}
        >
          {data.id}
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.meta_data.parent_id`}
        >
          {`${data.parentId}`}
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.meta_data.name`}
        >
          {data.n}
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.meta_data.selected`}
        >
          {`${data.selected}`}
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.meta_data.hidden`}
        >
          {`${data.hidden}`}
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.meta_data.locked`}
        >
          {`${data.locked}`}
        </Properties.Value>
      </Properties.Group>

      <Properties.Group>
        <Properties.Title>{t`tab.layout.right_sidebar.inspect.bounds`}</Properties.Title>

        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.bounds.width`}
        >
          {fixFloatRounding(bounds.width)}m
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.bounds.height`}
        >
          {fixFloatRounding(bounds.height)}m
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.bounds.x_position`}
        >
          {fixFloatRounding(bounds.x)}m
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.bounds.y_position`}
        >
          {fixFloatRounding(bounds.y)}m
        </Properties.Value>
        <Properties.Value
          label={t`tab.layout.right_sidebar.inspect.bounds.rotation`}
        >
          {fixFloatRounding(bounds.rotation)}°
        </Properties.Value>
      </Properties.Group>

      <Properties.Group>
        <Properties.Title>{t`tab.layout.right_sidebar.inspect.json`}</Properties.Title>

        <Properties.TextArea value={json} />
      </Properties.Group>

      <Properties.Group>
        <Properties.Title>{t`tab.layout.right_sidebar.inspect.vanilla_json`}</Properties.Title>

        <Properties.TextArea value={vanillaJson} />
      </Properties.Group>
    </Properties.Container>
  ) : (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tab.layout.right_sidebar.inspect.select_one_part`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tab.layout.right_sidebar.inspect.select_one_part.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
};
