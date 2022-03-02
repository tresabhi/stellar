import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import useSelectionHandler, {
  UseListingSelectionHandler
} from 'hooks/useSelectionHandler';
import {
  getReactivePartByAddress,
  setPartByAddress,
  subscribeToPart
} from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import { PartWithMeta } from 'parts/Default';
import { Group } from 'parts/Group';
import {
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import blueprintStore from 'stores/blueprint';
import { AnyPartMap, PartAddress } from 'types/Blueprint';
import { AnyPart } from 'types/Parts';
import compareAddressProps from 'utilities/compareAddressProps';
import styles from './index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const state = blueprintStore(
    (state) => state.parts,
    (prevState, nextState) => {
      const prevKeys = prevState.keys();
      const nextKeys = nextState.keys();

      let isPrevKeyDone = false;
      let isNextKeyDone = false;

      while (!isPrevKeyDone || !isNextKeyDone) {
        const prevKey = prevKeys.next();
        const nextKey = nextKeys.next();

        isPrevKeyDone = prevKey.done!;
        isNextKeyDone = nextKey.done!;

        if (prevKey.done !== nextKey.done) return false;
        if (prevKey.value !== nextKey.value) return false;
      }

      return true;
    },
  );

  const partListings = Array.from(state, ([id, data]) => (
    <Listing
      key={`part-${id}`}
      initialState={data}
      address={[id]}
      indentation={0}
    />
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

interface ListingProps {
  indentation: number;
  address: PartAddress;
  initialState: AnyPart;
}
export const Listing = memo<ListingProps>(
  ({ indentation, address, initialState }) => {
    const [expanded, setExpanded] = useState(false);
    const listingRef = useRef<HTMLDivElement>(null!);
    const buttonRef = useRef<HTMLButtonElement>(null!);
    const inputRef = useRef<HTMLInputElement>(null!);

    let childParts: JSX.Element[] | undefined;
    const selectionHandler = useSelectionHandler(
      address,
      'listing',
    ) as UseListingSelectionHandler;

    const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setExpanded((state) => !state);
    };
    const handleExpandMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
      if (initialState.n === 'Group') event.preventDefault();
    };
    const handleLabelMouseDown = (event: MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      buttonRef.current.focus();
    };
    const handleLabelDoubleClick = () => {
      inputRef.current.focus();
      inputRef.current.select();
    };
    const handleLabelBlur = () => {
      inputRef.current.value = inputRef.current.value.trim();
      setPartByAddress(address, { meta: { label: inputRef.current.value } });
    };
    const handleLabelKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') buttonRef.current.focus();
    };

    let Icon = getPartModule(initialState.n, true).Icon;

    if (initialState.n === 'Group') {
      childParts = Array.from(
        getReactivePartByAddress(
          address,
          (state: Group) => state.parts,
        ) as AnyPartMap,
        ([id, state]) => (
          <Listing
            key={`part-${id}`}
            initialState={state}
            address={[...address, id]}
            indentation={indentation + 1}
          />
        ),
      );
    }

    useEffect(() => {
      subscribeToPart(
        address,
        (selected) => {
          if (selected) {
            listingRef.current.classList.add(styles.selected);
          } else {
            listingRef.current.classList.remove(styles.selected);
          }
        },
        (state: PartWithMeta) => state.meta.selected,
      );
    }, [address]);

    return (
      <div ref={listingRef} tabIndex={-1} className={styles.listing}>
        <div
          className={styles.button}
          style={{ paddingLeft: `${16 * indentation}px` }}
          onClick={selectionHandler}
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
  },
  compareAddressProps,
);
