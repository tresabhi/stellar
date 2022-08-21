import { CaretRightIcon } from '@radix-ui/react-icons';
import { Input } from 'components/Input';
import {
  getPart,
  mutatePart,
  selectPartOnly,
  togglePartSelection,
} from 'core/part';
import { Group } from 'game/parts/Group';
import usePartProperty from 'hooks/usePartProperty';
import { isUndefined } from 'lodash';
import { KeyboardEvent, memo, MouseEvent, PointerEvent, useRef } from 'react';
import { css, styled, theme } from 'stitches.config';
import useBlueprint from 'stores/useBlueprint';
import usePartRegistry from 'stores/usePartRegistry';
import { Container } from './Container';

export interface ListingProps {
  id: string;
  indent: number;
}

const Details = styled('details', {
  width: '100%',
});

const triggerStyles = css({
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `0 ${theme.space.paddingMajor}`,
  gap: theme.space.gapRelatedMajor,
  minHeight: theme.sizes.inputHeightMajor,
  color: theme.colors.textHighContrast,
  listStyle: 'none',
  cursor: 'pointer',

  '&::-webkit-details-marker': {
    display: 'none',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.componentBackgroundActive,

        '&:hover': { backgroundColor: theme.colors.componentBackgroundActive },
        '&:active': { backgroundColor: theme.colors.componentBackgroundActive },
      },

      false: {
        '&:not(:hover), &:not(:active)': {
          backgroundColor: 'transparent !important',
        },
      },
    },

    transparent: { true: {} },
  },

  defaultVariants: {
    transparent: true,
  },
});

const IconContainer = styled('div', {
  width: theme.sizes[12],
  height: theme.sizes[12],

  '& > svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
  },

  variants: {
    openCaret: {
      true: {
        'details[open] > summary > & > svg': {
          transform: 'rotate(90deg)',
        },
      },
    },
  },
});

const Label = styled(Input, {
  flex: 1,
  fontSize: theme.fontSizes[12],
  cursor: 'pointer',

  '&:focus': {
    cursor: 'text',
  },
});

export const Listing = memo<ListingProps>(
  ({ id, indent }) => {
    const part = getPart(id)!;
    const isGroup = part.n === 'Group';
    let lastLabel = part.label;
    const { Icon } = usePartRegistry.getState().get(part.n)!;
    const trigger = useRef<HTMLElement>(null!);
    const label = useRef<HTMLInputElement>(null!);
    const iconContainer = useRef<HTMLDivElement>(null!);
    let buttonDefaultClassNames: string;

    const handleLabelPointerDown = (event: PointerEvent) => {
      event.preventDefault();
      trigger.current.focus();
      trigger.current.click();
    };
    const handleLabelDoubleClick = (event: MouseEvent) => {
      event.preventDefault();
      label.current.focus();
    };
    const handleLabelFocus = () => label.current.select();
    const handleLabelKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') label.current.blur();
    };
    const handleLabelBlur = () => {
      const newLabel = label.current.value.trim();

      if (newLabel.length > 0 && newLabel !== lastLabel) {
        label.current.value = newLabel;
        lastLabel = newLabel;

        mutatePart(id, (draft) => {
          draft.label = newLabel;
        });
      } else {
        label.current.value = lastLabel;
      }
    };
    const handleTriggerClick = (event: MouseEvent) => {
      if (event.ctrlKey) {
        if (event.shiftKey) {
          const { selections } = useBlueprint.getState();
          const lastSelection = selections[selections.length - 1];

          if (lastSelection) {
          } else {
            selectPartOnly(id);
          }
        } else {
          togglePartSelection(id);
        }
      } else if (event.shiftKey) {
        const { selections } = useBlueprint.getState();
        const lastSelection = selections[selections.length - 1];

        if (lastSelection) {
        } else {
          selectPartOnly(id);
        }
      } else {
        selectPartOnly(id);
      }
    };

    usePartProperty(
      id,
      (state) => state.selected,
      (selected) => {
        if (isUndefined(buttonDefaultClassNames)) {
          buttonDefaultClassNames = trigger.current.className;
        }

        trigger.current.className = `${buttonDefaultClassNames} ${triggerStyles(
          {
            selected,
          },
        )}`;
      },
    );

    return (
      <Details open={isGroup && (part as Group).expanded}>
        <summary
          style={{
            paddingLeft: `calc(${theme.space.paddingMajor} + ${indent} * ${theme.space.padding})`,
          }}
          ref={trigger}
          onClick={handleTriggerClick}
        >
          <IconContainer openCaret={isGroup} ref={iconContainer}>
            {isGroup ? <CaretRightIcon /> : <Icon />}
          </IconContainer>

          <Label
            ref={label}
            defaultValue={part.label}
            placeholder="No Label"
            onPointerDown={handleLabelPointerDown}
            onDoubleClick={handleLabelDoubleClick}
            onFocus={handleLabelFocus}
            onKeyDown={handleLabelKeyDown}
            onBlur={handleLabelBlur}
          />
        </summary>

        {isGroup && <Container indent={indent + 1} parentId={part.id} />}
      </Details>
    );
  },
  ({ id: prevId }, { id: nextId }) => prevId === nextId,
);
