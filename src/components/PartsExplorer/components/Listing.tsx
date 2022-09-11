import { CaretRightIcon } from '@radix-ui/react-icons';
import { Input } from 'components/Input';
import {
  getPart,
  mutatePart,
  selectPartOnly,
  togglePartSelection,
} from 'core/part';
import { Group } from 'game/parts/Group';
import { useInputEscape } from 'hooks/useInputEscape';
import usePartProperty from 'hooks/usePartProperty';
import { isUndefined } from 'lodash';
import { memo, MouseEvent, PointerEvent, useRef } from 'react';
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
  alignItems: 'stretch',
  justifyContent: 'center',
  padding: `0 ${theme.space.paddingMajor}`,
  gap: theme.space.gapRelatedMajor,
  minHeight: theme.sizes.inputSizeMajor,
  color: theme.colors.textHighContrast,
  listStyle: 'none',
  cursor: 'pointer',

  '&:focus': {
    outline: theme.borderStyles.componentInteractiveActive,
  },

  '&::-webkit-details-marker': {
    display: 'none',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.componentBackgroundActive,
      },

      false: {
        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& > svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
    display: 'block',
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
    const { Icon, data } = usePartRegistry.getState().get(part.n)!;
    const trigger = useRef<HTMLElement>(null!);
    const label = useRef<HTMLInputElement>(null!);
    const iconContainer = useRef<HTMLDivElement>(null!);
    let buttonDefaultClassNames: string;

    const handleLabelKeyDown = useInputEscape();
    const handleLabelBlur = () => {
      const newLabel = label.current.value.trim();

      if (newLabel.length > 0) {
        if (newLabel !== lastLabel) {
          label.current.value = newLabel;
          lastLabel = newLabel;

          mutatePart(id, (draft) => {
            draft.label = newLabel;
          });
        } else {
          label.current.value = lastLabel;
        }
      } else {
        label.current.value = data.label;
        lastLabel = data.label;

        mutatePart(id, (draft) => {
          draft.label = data.label;
        });
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
    const handleTriggerDoubleClick = () => {
      label.current.focus();
      label.current.select();
    };
    const handleLabelPointerDown = (event: PointerEvent) => {
      event.preventDefault();
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
    usePartProperty(
      id,
      (state) => state.label,
      (labelValue) => {
        label.current.value = labelValue;
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
          onDoubleClick={handleTriggerDoubleClick}
        >
          <IconContainer openCaret={isGroup} ref={iconContainer}>
            {isGroup ? <CaretRightIcon /> : <Icon />}
          </IconContainer>

          <Label
            tabIndex={-1}
            ref={label}
            defaultValue={part.label}
            placeholder={`Unlabeled ${data.label}`}
            onPointerDown={handleLabelPointerDown}
            onBlur={handleLabelBlur}
            onKeyDown={handleLabelKeyDown}
          />
        </summary>

        {isGroup && <Container indent={indent + 1} parentId={part.id} />}
      </Details>
    );
  },
  ({ id: prevId }, { id: nextId }) => prevId === nextId,
);
