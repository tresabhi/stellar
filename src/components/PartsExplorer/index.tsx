import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import useSelectionHandler, {
  UseSelectionHandlerListing,
} from 'hooks/useDesktopSelection';
import produce from 'immer';
import {
  getPartByAddress,
  getReactivePartByAddress,
} from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
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
import { Blueprint, PartAddress } from 'types/Blueprint';
import compareAddressesProps from 'utilities/compareAddressesProps';
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
  const selectionHandler = useSelectionHandler(
    address,
    'listing',
  ) as UseSelectionHandlerListing;

  const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded((state) => !state);
  };
  const handleExpandMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (data.n === 'Group') event.preventDefault();
  };
  const handleLabelMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    buttonRef.current?.focus();
  };
  const handleLabelDoubleClick = () => inputRef.current!.focus();
  const handleLabelBlur = () => {
    inputRef.current!.value = inputRef.current!.value.trim();
    blueprintStore.setState(
      // TODO: ISOLATE THIS INTO A FUNCTION AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      produce((draft: Blueprint) => {
        let part = getPartByAddress(address, draft);
        part.meta.label = inputRef.current!.value;
      }),
    );
  };
  const handleLabelKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') buttonRef.current?.focus();
  };

  if (data.n === 'Group') {
    childParts = data.parts.map((data, index) => (
      <Listing
        key={`part-${index}`}
        address={[...address, index]}
        indentation={indentation + 1}
      />
    ));
  }

  return (
    <div
      ref={listingRef}
      tabIndex={-1}
      className={`${styles.listing} ${
        data.meta.selected ? styles.selected : ''
      }`}
    >
      <div
        className={styles.button}
        style={{ paddingLeft: `${16 * indentation}px` }}
        onClick={selectionHandler}
      >
        {/* indentations */}

        {/* expand/collapse and/or dependency graphs */}
        <button
          ref={buttonRef}
          onClick={handleExpandClick}
          onMouseDown={handleExpandMouseDown}
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
          onMouseDown={handleLabelMouseDown}
          onDoubleClick={handleLabelDoubleClick}
          onBlur={handleLabelBlur}
          onKeyPress={handleLabelKeyPress}
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
}, compareAddressesProps);
