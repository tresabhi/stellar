import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import produce from 'immer';
import {
  getPartByAddress,
  getReactivePartByAddress,
} from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import {
  selectPartsFromOnly,
  selectPartsOnly,
  togglePartsSelection,
} from 'interfaces/selection';
import { FC, InputHTMLAttributes, memo, useRef, useState } from 'react';
import blueprintStore from 'stores/blueprint';
import selectionStore from 'stores/selection';
import { Blueprint, PartAddress } from 'types/Blueprint';
import compareAddressProps from 'utilities/compareAddressProps';
import styles from './index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    {...props}
    className={`${props.className ?? ''} ${styles['parts-explorer']}`}
  >
    {children}
  </div>
);

interface ListingProps {
  indentation: number;
  address: PartAddress;
}
export const Listing = memo<ListingProps>(({ indentation, address }) => {
  const [expanded, setExpanded] = useState(false);
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let data = getReactivePartByAddress(address)!;
  const Icon = getPartModule(data.n, true).Icon;
  let childParts: JSX.Element[] | undefined;

  if (data.n === 'Group') {
    childParts = data.parts.map((data, index) => (
      <Listing
        key={`part-${index}`}
        address={[...address, index]}
        indentation={indentation + 1}
      />
    ));
  }

  blueprintStore.subscribe(
    (state) => getPartByAddress(address, state).meta.selected,
    (current) => listingRef.current?.classList.toggle(styles.selected, current),
  );

  return (
    <div ref={listingRef} tabIndex={-1} className={styles.listing}>
      <div
        className={styles.button}
        style={{ paddingLeft: `${16 * indentation}px` }}
        onClick={(event) => {
          if (event.ctrlKey) {
            if (event.shiftKey) {
              // ctrl + shift
            } else {
              // ctrl
              togglePartsSelection([data.meta.address]);
            }
          } else if (event.shiftKey) {
            const selectionState = selectionStore.getState();

            if (selectionState.lastSelection) {
              selectPartsFromOnly(selectionState.lastSelection, address);
            } else {
              selectPartsOnly([address]);
            }
          } else {
            // no modifier
            selectPartsOnly([data.meta.address]);
          }
        }}
      >
        {/* indentations */}

        {/* expand/collapse and/or dependency graphs */}
        <button
          ref={buttonRef}
          onClick={(event) => {
            // stop parent from being clicked
            event.stopPropagation();
            setExpanded((state) => !state);
          }}
          onMouseDown={(event) => {
            // stop transfer of focus if it's a dropdown
            if (data.n === 'Group') event.preventDefault();
          }}
          className={styles.expand}
        >
          {data.n === 'Group' ? (
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
          onMouseDown={(event) => {
            event.preventDefault();
            buttonRef.current?.focus();
          }}
          onDoubleClick={() => {
            inputRef.current?.focus();
          }}
          onBlur={() => {
            inputRef.current!.value = inputRef.current!.value.trim();
            blueprintStore.setState(
              produce((draft: Blueprint) => {
                let part = getPartByAddress(address, draft);
                part.meta.label = inputRef.current!.value;
              }),
            );
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') buttonRef.current?.focus();
          }}
          className={styles.label}
          defaultValue={data.meta.label}
        />

        {/* visible */}
        {/* lock */}
      </div>

      {childParts ? (
        <Container style={{ display: expanded ? 'flex' : 'none' }}>
          {childParts}
        </Container>
      ) : undefined}
    </div>
  );
}, compareAddressProps);
