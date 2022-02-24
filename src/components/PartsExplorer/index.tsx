import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import useSelectionHandler from 'hooks/useDesktopSelection';
import {
  getReactivePartByAddress,
  setPartByAddress,
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
import { PartAddress } from 'types/Blueprint';
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

  let childParts: JSX.Element[] | undefined;
  const selectionHandler = useSelectionHandler(address);

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
    setPartByAddress(address, { meta: { label: inputRef.current!.value } });
  };
  const handleLabelKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') buttonRef.current?.focus();
  };

  // just in case the part was deleted
  if (data === undefined) return null;

  let Icon = getPartModule(data.n, true).Icon;

  if (data.n === 'Group') {
    childParts = Array.from(data.parts, ([id, data]) => (
      <Listing
        key={`part-${id}`}
        address={[...address, id]}
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
});
