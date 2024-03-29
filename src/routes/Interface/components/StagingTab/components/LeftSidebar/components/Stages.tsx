import { CardStackPlusIcon } from '@radix-ui/react-icons';
import * as ScrollArea from 'components/ScrollArea';
import * as Sidebar from 'components/Sidebar';
import getStageLabel from 'core/blueprint/getStageLabel';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Stage } from 'game/Blueprint';
import useTranslator from 'hooks/useTranslator';
import { memo, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import useBlueprint from 'stores/blueprint';
import createInputEscape from 'utilities/createInputEscape';

const PrimitiveScrollArea = styled(ScrollArea.Root, {
  flex: '1 0 0',
});
const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});
const ListingContainer = styled('div', {
  display: 'flex',
  fontSize: theme.sizes[12],
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.componentInteractiveActive,
      },

      false: {
        background: theme.colors.componentInteractive,
      },
    },
  },
});
const Index = styled('div', {
  padding: theme.space.paddingRegular,
  color: theme.colors.textLowContrast,
});
const Label = styled('input', {
  color: theme.colors.textHighContrast,
  minWidth: 0,
  width: 0,
  flex: 1,
  cursor: 'pointer',

  '&:focus': { cursor: 'text' },
});
const Count = styled('div', {
  padding: theme.space.paddingRegular,
  color: theme.colors.textLowContrast,
});

interface ListingProps {
  stage: Stage;
  index: number;
}

const Listing = memo<ListingProps>(
  ({ index, stage }) => {
    const label = useRef<HTMLInputElement>(null);
    const handleKeyDown = createInputEscape();
    const selected = useBlueprint((state) => state.stage_selection === index);

    return (
      <ListingContainer
        selected={selected}
        onClick={() => {
          mutateBlueprint((draft) => {
            draft.stage_selection = index;
          });
        }}
        onDoubleClick={() => {
          label.current?.focus();
          label.current?.select();
        }}
      >
        <Index>{index + 1}.</Index>
        <Label
          ref={label}
          defaultValue={getStageLabel(index)}
          onPointerDown={(event) => event.preventDefault()}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            mutateBlueprint((draft) => {
              if (label.current) {
                const trimmed = label.current.value.trim();
                const previousLabel = getStageLabel(index);

                if (trimmed.length > 0 && trimmed !== previousLabel) {
                  draft.stages[index].label = trimmed;
                  label.current.value = trimmed;
                } else {
                  label.current.value = previousLabel;
                }
              }
            });
          }}
        />
        <Count>({stage.part_order.length})</Count>
      </ListingContainer>
    );
  },
  (prev, next) => prev.stage.id === next.stage.id,
);

export default function Stages() {
  const { t, f } = useTranslator();
  const stages = useBlueprint((state) => state.stages);

  return stages.length === 0 ? (
    <Sidebar.MessageRoot>
      <Sidebar.Message>{t`tabs.staging.left_sidebar.stages.no_stages`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {f`tabs.staging.left_sidebar.stages.no_stages.instructions`[0]}
        <CardStackPlusIcon />
        {f`tabs.staging.left_sidebar.stages.no_stages.instructions`[1]}
      </Sidebar.Message>
    </Sidebar.MessageRoot>
  ) : (
    <PrimitiveScrollArea>
      <ScrollArea.Viewport>
        <Wrapper>
          {stages.map((stage, index) => (
            <Listing stage={stage} index={index} key={`stage-${stage.id}`} />
          ))}
        </Wrapper>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </PrimitiveScrollArea>
  );
}
