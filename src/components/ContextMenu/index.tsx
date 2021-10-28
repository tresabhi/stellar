import { FC } from 'react';
import './index.scss';
import { type as extendButtonType } from './types/extendButton';
import { listing as listingType } from './types/root';
import { type as separatorType } from './types/separator';
import { ReactComponent as LockIcon } from 'assets/icons/lock.svg';
import { type as textButtonType } from './types/textButton';

// TODO: SIMPLIFY ALL CLASS NAMES
type TextButtonProps = {
  data: textButtonType;
  extended?: boolean;
};
export const TextButton: FC<TextButtonProps> = ({ data, extended = false }) => {
  const Icon = data?.icon;

  return (
    <button
      className="context-menu-text-button"
      onClick={() => {
        if (typeof data.action == 'function') {
          data.action();
        } else {
          // TODO:
          // spawn new context menu
          // also, add arrow to the right
        }
      }}
    >
      <div className="context-menu-text-button-icon-container">
        {Icon ? <Icon /> : undefined}
      </div>
      <span className="context-menu-text-button-text">{data.text}</span>
      <div className="context-menu-text-button-icon-container">
        {extended ? <LockIcon /> : undefined}
      </div>
    </button>
  );
};

const Separator = () => {
  return <div className="context-menu-separator" />;
};

type ExtendButtonProps = {
  data: extendButtonType;
};
const ExtendButton: FC<ExtendButtonProps> = ({ data }) => {
  return (
    <TextButton
      data={{
        ...data,
        action: () => alert(`fine, i'll extend it`),
      }}
      extended={true}
    />
  );
};

const typeToComponent: any = {
  text_button: TextButton,
  separator: Separator,
  extend_button: ExtendButton,
};
type ContainerProps = {
  data: listingType;
  toolbar?: boolean;
};
export const Container: FC<ContainerProps> = ({ data, toolbar = false }) => {
  const listingComponents = data.map((listing) => {
    const Component = typeToComponent[listing.type];
    return <Component data={listing} />;
  });

  return (
    <div
      className={`
        context-menu-container
        ${toolbar ? 'toolbar' : 'generic'}
      `}
    >
      {listingComponents}
    </div>
  );
};
