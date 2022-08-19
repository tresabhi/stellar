import {
  QuestionMarkIcon,
  TriangleDownIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { mutateBlueprint } from 'core/blueprint';
import {
  getPart,
  getPartRegistry,
  mutatePart,
  selectPartOnly,
  togglePartSelection,
} from 'core/part';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import usePartProperty from 'hooks/usePartProperty';
import { KeyboardEvent, memo, MouseEvent, useRef, useState } from 'react';
import useBlueprint from 'stores/useBlueprint';
import compareIdProps from 'utilities/compareIdProps';
import styles from '../index.module.scss';
import { Container } from './Container';

export interface ListingProps {
  indentation: number;
  id: string;
}
export const Listing = memo<ListingProps>(({ indentation, id }) => {
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialState = getPart(id)!;
  const isGroup = initialState.n === 'Group';
  const [expanded, setExpanded] = useState(
    isGroup ? (initialState as Group).expanded : false,
  );
  let lastLabel = initialState.label;
  const IconComponent =
    getPartRegistry(initialState.n)?.Icon ?? QuestionMarkIcon;

  usePartProperty(
    id,
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
    id,
    (state) => (isGroup ? state.expanded : false),
    (expanded) => {
      setExpanded(expanded);
    },
  );

  let childParts: JSX.Element[] | undefined;
  const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutateBlueprint((draft) => {
      const part = draft.parts.get(id) as Group;

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
      mutatePart(id, (draft) => {
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

  if (initialState.n === 'Group') {
    childParts = (initialState as Group).part_order.map(() => (
      <Listing key={`part-${id}`} id={id} indentation={indentation + 1} />
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
          parent={id}
          style={{ display: expanded ? undefined : 'none' }}
        >
          {childParts}
        </Container>
      ) : undefined}
    </div>
  );
}, compareIdProps);
