import { CaretRightIcon } from '@radix-ui/react-icons';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import {
  getPart,
  mutatePart,
  selectPartOnly,
  togglePartSelection,
} from 'core/part';
import usePartProperty from 'hooks/usePartProperty';
import { isUndefined } from 'lodash';
import { KeyboardEvent, memo, MouseEvent, PointerEvent, useRef } from 'react';
import { css, styled, theme } from 'stitches.config';
import useBlueprint from 'stores/useBlueprint';
import usePartRegistry from 'stores/usePartRegistry';

export interface ListingProps {
  id: string;
}

const buttonStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `0 ${theme.space.paddingMajor}`,
  gap: theme.space.gapRelatedMajor,
  height: theme.sizes.inputHeightMajor,
  color: theme.colors.textHighContrast,

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
  // maintain this size regardless of icon's existence
  width: theme.sizes[12],
  height: theme.sizes[12],

  '& > svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
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
  ({ id }) => {
    const part = getPart(id)!;
    const isGroup = part.n === 'Group';
    let lastLabel = part.label;
    const { Icon } = usePartRegistry.getState().get(part.n)!;
    const button = useRef<HTMLButtonElement>(null!);
    const label = useRef<HTMLInputElement>(null!);
    const iconContainer = useRef<HTMLDivElement>(null!);
    let buttonDefaultClassNames: string;

    const handleLabelPointerDown = (event: PointerEvent) => {
      event.preventDefault();
      button.current.focus();
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
          buttonDefaultClassNames = button.current.className;
        }

        button.current.className = `${buttonDefaultClassNames} ${buttonStyles({
          selected,
        })}`;
      },
    );

    return (
      <Button ref={button} onClick={handleTriggerClick}>
        <IconContainer ref={iconContainer}>
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
      </Button>
    );
  },
  ({ id: prevId }, { id: nextId }) => prevId === nextId,
);
