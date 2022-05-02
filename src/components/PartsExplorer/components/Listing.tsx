import {
  QuestionMarkIcon,
  TriangleDownIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import usePartProperty from 'hooks/usePartProperty';
import {
  getPart,
  mutateBlueprintWithoutHistory,
  mutatePart,
} from 'interfaces/blueprint';
import { getPartIcon } from 'interfaces/part';
import {
  selectPartOnly,
  selectPartsFrom,
  selectPartsFromOnly,
  togglePartSelection,
} from 'interfaces/selection';
import { KeyboardEvent, memo, MouseEvent, useRef, useState } from 'react';
import blueprintStore from 'stores/blueprint';
import { UUID } from 'types/Parts';
import compareIDProps from 'utilities/compareIDProps';
import styles from '../index.module.scss';
import { Container } from './Container';

export interface ListingProps {
  indentation: number;
  ID: UUID;
}
export const Listing = memo<ListingProps>(({ indentation, ID }) => {
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialState = getPart(ID)!;
  const isGroup = initialState.n === 'Group';
  const [expanded, setExpanded] = useState(
    isGroup ? (initialState as Group).expanded : false,
  );
  let lastLabel = initialState.label;
  const IconComponent = getPartIcon(initialState.n) ?? QuestionMarkIcon;

  usePartProperty(
    ID,
    (state: Part) => state.selected,
    (selected) => {
      if (selected) {
        listingRef.current?.classList.add(styles.selected);
      } else {
        listingRef.current?.classList.remove(styles.selected);
      }
    },
  );
  usePartProperty<Group, boolean>(
    ID,
    (state) => (isGroup ? state.expanded : false),
    (expanded) => {
      setExpanded(expanded);
    },
  );

  let childParts: JSX.Element[] | undefined;
  const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutateBlueprintWithoutHistory((draft) => {
      const part = getPart(ID, draft) as Group | undefined;

      if (part) {
        part.expanded = !part.expanded;
      }
    });
  };
  const handleExpandMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (initialState.n === 'Group') event.preventDefault();
  };
  const handleLabelMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    buttonRef.current?.focus();
  };
  const handleLabelDoubleClick = () => inputRef.current?.focus();
  const handleLabelFocus = () => inputRef.current?.select();
  const handleLabelBlur = () => {
    const newLabel = inputRef.current!.value.trim();

    if (newLabel.length > 0 && newLabel !== lastLabel) {
      inputRef.current!.value = newLabel;
      mutatePart(ID, (draft) => {
        draft.label = newLabel;
      });
      lastLabel = newLabel;
    } else {
      inputRef.current!.value = lastLabel;
    }
  };
  const handleLabelKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') buttonRef.current?.focus();
  };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const selectionState = blueprintStore.getState().selections;
        const lastSelection = selectionState[selectionState.length - 1];

        if (lastSelection) {
          selectPartsFrom(lastSelection, ID);
        } else {
          selectPartOnly(ID);
        }
      } else {
        togglePartSelection(ID);
      }
    } else if (event.shiftKey) {
      const selectionState = blueprintStore.getState().selections;
      const lastSelection = selectionState[selectionState.length - 1];

      if (lastSelection) {
        selectPartsFromOnly(lastSelection, ID);
      } else {
        selectPartOnly(ID);
      }
    } else {
      selectPartOnly(ID);
    }
  };

  if (initialState.n === 'Group') {
    childParts = (initialState as Group).partOrder.map(() => (
      <Listing key={`part-${ID}`} ID={ID} indentation={indentation + 1} />
    ));
  }

  return (
    <div ref={listingRef} tabIndex={-1} className={styles.listing}>
      <div
        className={styles.button}
        style={{ paddingLeft: `${16 * indentation}px` }}
        onClick={handleClick}
      >
        <button
          ref={buttonRef}
          onClick={handleExpandClick}
          onMouseDown={handleExpandMouseDown}
          className={styles.expand}
        >
          {initialState.n === 'Group' ? (
            expanded ? (
              <TriangleDownIcon className={styles['expand-icon']} />
            ) : (
              <TriangleRightIcon className={styles['expand-icon']} />
            )
          ) : undefined}
        </button>

        <div className={styles['icon-holder']}>
          <IconComponent className={styles.icon} />
        </div>

        <input
          ref={inputRef}
          onMouseDown={handleLabelMouseDown}
          onDoubleClick={handleLabelDoubleClick}
          onFocus={handleLabelFocus}
          onBlur={handleLabelBlur}
          onKeyPress={handleLabelKeyPress}
          className={styles.label}
          defaultValue={initialState.label}
        />
      </div>

      {isGroup ? (
        <Container
          indentation={indentation + 1}
          parent={ID}
          style={{ display: expanded ? undefined : 'none' }}
        >
          {childParts}
        </Container>
      ) : undefined}
    </div>
  );
}, compareIDProps);
