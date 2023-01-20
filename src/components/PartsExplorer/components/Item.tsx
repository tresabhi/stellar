import {
  EyeClosedIcon,
  EyeOpenIcon,
  LockClosedIcon,
  LockOpen1Icon,
  TrashIcon,
  TriangleDownIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import deleteParts from 'core/part/deleteParts';
import getPartRegistry from 'core/part/getPartRegistry';
import mutateParts from 'core/part/mutateParts';
import selectBetween from 'core/part/selectBetween';
import selectBetweenConcurrent from 'core/part/selectBetweenConcurrent';
import selectConcurrent from 'core/part/selectConcurrent';
import toggleLocked from 'core/part/toggleLocked';
import toggleSelection from 'core/part/toggleSelection';
import toggleVisible from 'core/part/toggleVisible';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import usePart from 'hooks/usePart';
import usePartProperty from 'hooks/usePartProperty';
import { KeyboardEvent, memo, MouseEvent, PointerEvent, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import useBlueprint from 'stores/blueprint';
import { PartRegistryItem } from 'stores/partRegistry';
import createInputEscape from 'utilities/createInputEscape';
import { Root } from './Root';

export interface ListingProps {
  id: string;
  indent: number;
}

const Wrapper = styled('div', {});
const Trigger = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  listStyle: 'none',
  cursor: 'pointer',
  width: '100%',

  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.componentBackgroundActive,
      },

      false: {
        backgroundColor: theme.colors.componentBackground,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
      },
    },
  },

  '&::-webkit-details-marker': {
    display: 'none',
  },
});
const Label = styled('input', {
  color: theme.colors.textHighContrast,
  fontSize: theme.sizes[12],
  flex: 1,
  cursor: 'pointer',
  minWidth: theme.sizes.partListingInputMinWidth,
  width: 0,

  '&:focus': {
    cursor: 'text',
  },
});
const IconHolder = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space.padding,
  color: theme.colors.textHighContrast,
  cursor: 'pointer',

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },
});
const Action = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.space.padding,
  color: theme.colors.textHighContrast,
  cursor: 'pointer',

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    onlyShowOnHover: {
      true: {
        [`${Trigger}:not(:hover) &`]: {
          display: 'none',
        },
      },
      false: {
        color: theme.colors.textLowContrast,

        [`${Trigger}:hover &`]: {
          color: theme.colors.textHighContrast,
        },
      },
    },
  },

  defaultVariants: { onlyShowOnHover: true },
});

export const Item = memo(
  ({ id, indent }: ListingProps) => {
    const label = useRef<HTMLInputElement>(null);
    const state = usePart(id);
    const isGroup = state.n === 'Group';
    const expanded = isGroup ? (state as Group).expanded : false;
    const { Icon } = getPartRegistry(state.n) as PartRegistryItem<Part>;
    let lastLabel = state.label;

    usePartProperty(
      id,
      (sliceableState) => sliceableState.label,
      (newLabel) => {
        if (label.current) label.current.value = newLabel;
      },
    );

    const handleSummaryClick = (event: MouseEvent) => {
      event.preventDefault();
      const { selections } = useBlueprint.getState();

      if (event.ctrlKey) {
        if (event.shiftKey) {
          selectBetween(selections[0], id);
        } else {
          toggleSelection(id);
        }
      } else if (event.shiftKey) {
        selectBetweenConcurrent(selections[0], id);
      } else {
        selectConcurrent(id);
      }
    };
    const handleSummaryDoubleClick = () => {
      label.current?.focus();
      label.current?.select();
    };
    const handleIconClick = (event: MouseEvent) => {
      if (isGroup && !event.ctrlKey && !event.shiftKey) {
        event.stopPropagation();
        mutateParts<Group>(id, (draft) => {
          draft.expanded = !draft.expanded;
        });
      }
    };
    const handleEyeClick = (event: MouseEvent) => {
      event.stopPropagation();
      toggleVisible(id);
    };
    const handleLockClick = (event: MouseEvent) => {
      event.stopPropagation();
      toggleLocked(id);
    };
    const handleTrashClick = (event: MouseEvent) => {
      event.stopPropagation();
      deleteParts(id);
    };
    const handleLabelKeyDown = createInputEscape();
    const handleLabelKeyUp = (event: KeyboardEvent) => {
      event.stopPropagation();
      event.preventDefault();
    };
    const handleLabelBlur = () => {
      if (label.current) {
        const newLabel = label.current.value.trim();

        if (newLabel.length > 0) {
          if (newLabel !== lastLabel) {
            label.current.value = newLabel;
            lastLabel = newLabel;

            mutateParts(id, (draft) => {
              draft.label = newLabel;
            });
          } else {
            label.current.value = lastLabel;
          }
        } else {
          label.current.value = state.label;
          lastLabel = state.label;

          mutateParts(id, (draft) => {
            draft.label = state.label;
          });
        }
      }
    };
    const handleLabelPointerDown = (event: PointerEvent) =>
      event.preventDefault();

    return (
      <Wrapper>
        <Trigger
          css={{ paddingLeft: `calc(${theme.space.padding} * ${indent})` }}
          selected={state.selected}
          onClick={handleSummaryClick}
          onDoubleClick={handleSummaryDoubleClick}
        >
          <IconHolder onClick={handleIconClick}>
            {!isGroup && <Icon />}
            {isGroup &&
              (expanded ? <TriangleDownIcon /> : <TriangleRightIcon />)}
          </IconHolder>

          <Label
            ref={label}
            onKeyUp={handleLabelKeyUp}
            onKeyDown={handleLabelKeyDown}
            onBlur={handleLabelBlur}
            onPointerDown={handleLabelPointerDown}
            defaultValue={state.label}
          />

          <Action onClick={handleEyeClick} onlyShowOnHover={state.visible}>
            {state.visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </Action>
          <Action onClick={handleLockClick} onlyShowOnHover={!state.locked}>
            {state.locked ? <LockClosedIcon /> : <LockOpen1Icon />}
          </Action>
          <Action onClick={handleTrashClick}>
            <TrashIcon />
          </Action>
        </Trigger>

        {isGroup && expanded && <Root indent={indent + 1} parentId={id} />}
      </Wrapper>
    );
  },
  ({ id: prevId }, { id: nextId }) => prevId === nextId,
);
