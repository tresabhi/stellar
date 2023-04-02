import { CopyIcon } from '@radix-ui/react-icons';
import * as Properties from 'components/Properties';
import * as Sidebar from 'components/Sidebar';
import exportifyPart from 'core/part/exportifyPart';
import useClipboard from 'hooks/useClipboard';
import usePart from 'hooks/usePart';
import useTranslator from 'hooks/useTranslator';
import { useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import boundsStore from 'stores/bounds';
import fixFloatRounding from 'utilities/fixFloatRounding';

const INDENT = 2;

export default function Inspect() {
  const { t } = useTranslator();
  const { copy } = useClipboard();
  const isOneSelected = useBlueprint((state) => state.selections.length === 1);
  const state = useBlueprint.getState();
  const id = state.selections[0];
  const data = usePart(id);
  const stringifiedJSON = JSON.stringify(data, undefined, INDENT);
  const vanillaJSON =
    data && JSON.stringify(exportifyPart(data, state), undefined, INDENT);
  const boundsX = useRef<HTMLSpanElement>(null);
  const boundsY = useRef<HTMLSpanElement>(null);
  const boundsWidth = useRef<HTMLSpanElement>(null);
  const boundsHeight = useRef<HTMLSpanElement>(null);
  const boundsRotation = useRef<HTMLSpanElement>(null);

  const handleJSONClick = () => copy(stringifiedJSON);
  const handleVanillaJSONClick = () => copy(`${vanillaJSON}`);

  useEffect(() => {
    function update() {
      const boundsListing = boundsStore[id];

      if (boundsListing) {
        const { bounds } = boundsListing;

        if (boundsX.current)
          boundsX.current.innerText = `${fixFloatRounding(bounds.x)}m`;
        if (boundsY.current)
          boundsY.current.innerText = `${fixFloatRounding(bounds.y)}m`;
        if (boundsWidth.current)
          boundsWidth.current.innerText = `${fixFloatRounding(bounds.width)}m`;
        if (boundsHeight.current)
          boundsHeight.current.innerText = `${fixFloatRounding(
            bounds.height,
          )}m`;
        if (boundsRotation.current)
          boundsRotation.current.innerText = `${fixFloatRounding(
            bounds.rotation * (180 / Math.PI),
          )}°`;
      }
    }

    update();
    window.addEventListener(`boundsupdated${id}`, update);

    return () => {
      window.removeEventListener(`boundsupdated${id}`, update);
    };
  });

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

      <Properties.Group>
        <Properties.Title>{t`tabs.layout.right_sidebar.inspect.bounds`}</Properties.Title>

        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.x_position`}
          ref={boundsX}
        />
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.y_position`}
          ref={boundsY}
        />
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.width`}
          ref={boundsWidth}
        />
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.height`}
          ref={boundsHeight}
        />
        <Properties.Value
          label={t`tabs.layout.right_sidebar.inspect.bounds.rotation`}
          ref={boundsRotation}
        />
      </Properties.Group>

      <Properties.Group>
        <Properties.TitleWithButton
          buttons={
            <Properties.TitleButton onClick={handleJSONClick}>
              <CopyIcon />
            </Properties.TitleButton>
          }
        >
          {t`tabs.layout.right_sidebar.inspect.json`}
        </Properties.TitleWithButton>

        <Properties.TextArea value={stringifiedJSON} />
      </Properties.Group>

      <Properties.Group>
        <Properties.TitleWithButton
          buttons={
            <Properties.TitleButton onClick={handleVanillaJSONClick}>
              <CopyIcon />
            </Properties.TitleButton>
          }
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
