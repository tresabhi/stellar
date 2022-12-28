import { CopyIcon } from '@radix-ui/react-icons';
import * as Properties from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import exportifyPart from 'core/part/exportifyPart';
import useClipboard from 'hooks/useClipboard';
import usePart from 'hooks/usePart';
import useTranslator from 'hooks/useTranslator';
import useBlueprint from 'stores/blueprint';

const INDENT = 2;

export default function Inspect() {
  const { t } = useTranslator();
  const { copy } = useClipboard();
  const isOneSelected = useBlueprint((state) => state.selections.length === 1);
  const state = useBlueprint.getState();
  const id = state.selections[0];
  const data = usePart(id);
  const stringifiedJSON = JSON.stringify(data, undefined, INDENT);
  const vanillaJSON = data && JSON.stringify(exportifyPart(data, state), undefined, INDENT);

  const handleJSONClick = () => copy(stringifiedJSON);
  const handleVanillaJSONClick = () => copy(`${vanillaJSON}`);

  return isOneSelected && data ? (
    <Properties.Root>
      <Properties.Group>
        <Properties.Title>{t`tabs.layout.right_sidebar.inspect.meta_data`}</Properties.Title>

        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.meta_data.id`}
        >
          {data.id}
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.meta_data.parent_id`}
        >
          {`${data.parent_id}`}
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.meta_data.name`}
        >
          {data.n}
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.meta_data.selected`}
        >
          {`${data.selected}`}
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.meta_data.hidden`}
        >
          {`${data.visible}`}
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.meta_data.locked`}
        >
          {`${data.locked}`}
        </Properties.Value>
      </Properties.Group>

      {/* TODO: implement this */}

      {/* <Properties.Group>
        <Properties.Title>{t`tabs.layout.right_sidebar.inspect.bounds`}</Properties.Title>

        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.width`}
        >
          {fixFloatRounding(bounds.width)}m
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.height`}
        >
          {fixFloatRounding(bounds.height)}m
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.x_position`}
        >
          {fixFloatRounding(bounds.x)}m
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.y_position`}
        >
          {fixFloatRounding(bounds.y)}m
        </Properties.Value>
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.rotation`}
        >
          {fixFloatRounding(bounds.rotation)}°
        </Properties.Value>
      </Properties.Group> */}

      <Properties.Group>
        <Properties.TitleWithButton
          buttons={(
            <Properties.TitleButton onClick={handleJSONClick}>
              <CopyIcon />
            </Properties.TitleButton>
          )}
        >
          {t`tabs.layout.right_sidebar.inspect.json`}
        </Properties.TitleWithButton>

        <Properties.TextArea value={stringifiedJSON} />
      </Properties.Group>

      <Properties.Group>
        <Properties.TitleWithButton
          buttons={(
            <Properties.TitleButton onClick={handleVanillaJSONClick}>
              <CopyIcon />
            </Properties.TitleButton>
          )}
        >
          {t`tabs.layout.right_sidebar.inspect.vanilla_json`}
        </Properties.TitleWithButton>

        <Properties.TextArea value={vanillaJSON} />
      </Properties.Group>
    </Properties.Root>
  ) : (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tabs.layout.right_sidebar.inspect.select_one_part`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {t`tabs.layout.right_sidebar.inspect.select_one_part.instructions`}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  );
}
