import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import usePartProperty from 'hooks/usePartProperty';
import { getPart, mutatePart } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import {
  selectPartOnly,
  selectPartsFrom,
  selectPartsFromOnly,
  togglePartSelection,
} from 'interfaces/selection';
import { PartWithMeta } from 'parts/Default';
import { Group } from 'parts/Group';
import {
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
  MouseEvent,
  useRef,
  useState,
} from 'react';
import blueprintStore from 'stores/blueprint';
import { PartID, PartIDs } from 'types/Parts';
import compareIDArrays from 'utilities/compareIDArrays';
import compareIDProps from 'utilities/compareIDProps';
import styles from './index.module.scss';

interface ContainerProps extends InputHTMLAttributes<HTMLDivElement> {
  IDs: PartIDs;
  indentation: number;
}
export const Container: FC<ContainerProps> = ({
  IDs,
  indentation,
  ...props
}) => {
  const partListings = IDs.map((ID) => (
    <Listing key={`part-${ID}`} ID={ID} indentation={indentation} />
  ));

  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['parts-explorer']}`}
    >
      {partListings}
    </div>
  );
};

export const ReactiveRootContainer = () => {
  const state = blueprintStore((state) => state.partOrder, compareIDArrays);

  return <Container indentation={0} IDs={state} />;
};

interface ListingProps {
  indentation: number;
  ID: PartID;
}
export const Listing = memo<ListingProps>(({ indentation, ID }) => {
  const [expanded, setExpanded] = useState(false);
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialState = getPart(ID)!;
  const isGroup = initialState.n === 'Group';

  usePartProperty(
    ID,
    (state: PartWithMeta) => state.meta,
    (meta) => {
      if (meta.selected) {
        listingRef.current?.classList.add(styles.selected);
      } else {
        listingRef.current?.classList.remove(styles.selected);
      }
    },
  );

  let childParts: JSX.Element[] | undefined;
  const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded((state) => !state);
  };
  const handleExpandMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (initialState.n === 'Group') event.preventDefault();
  };
  const handleLabelMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    buttonRef.current?.focus();
  };
  const handleLabelDoubleClick = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };
  const handleLabelBlur = () => {
    if (inputRef.current)
      inputRef.current.value = inputRef.current.value.trim();
    mutatePart(ID, { meta: { label: inputRef.current?.value } });
  };
  const handleLabelKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') buttonRef.current?.focus();
  };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      if (event.shiftKey) {
        const selectionState = blueprintStore.getState().selections;

        if (selectionState.last) {
          selectPartsFrom(selectionState.last, ID);
        } else {
          selectPartOnly(ID);
        }
      } else {
        togglePartSelection(ID);
      }
    } else {
      if (event.shiftKey) {
        const selectionState = blueprintStore.getState().selections;

        if (selectionState.last) {
          selectPartsFromOnly(selectionState.last, ID);
        } else {
          selectPartOnly(ID);
        }
      } else {
        selectPartOnly(ID);
      }
    }
  };

  let Icon = getPartModule(initialState.n, true).Icon;

  if (initialState.n === 'Group') {
    childParts = initialState.partOrder.map((part) => {
      return (
        <Listing key={`part-${ID}`} ID={ID} indentation={indentation + 1} />
      );
    });
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
              <ArrowHeadDownIcon className={styles['expand-icon']} />
            ) : (
              <ArrowHeadRightIcon className={styles['expand-icon']} />
            )
          ) : undefined}
        </button>

        <div className={styles['icon-holder']}>
          {Icon ? (
            <Icon className={styles.icon} />
          ) : (
            <QuestionMarkIcon className={styles.icon} />
          )}
        </div>

        <input
          ref={inputRef}
          onMouseDown={handleLabelMouseDown}
          onDoubleClick={handleLabelDoubleClick}
          onBlur={handleLabelBlur}
          onKeyPress={handleLabelKeyPress}
          className={styles.label}
          defaultValue={initialState.meta.label}
        />
      </div>

      {isGroup ? (
        <Container
          indentation={indentation + 1}
          IDs={(initialState as Group).partOrder}
          style={{ display: expanded ? undefined : 'none' }}
        >
          {childParts}
        </Container>
      ) : undefined}
    </div>
  );
}, compareIDProps);
