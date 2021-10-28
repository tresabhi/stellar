import { ReactComponent as NextIcon } from 'assets/icons/next.svg';
import { FC } from 'react';
import './index.scss';
import { type as extendButtonType } from './types/extendButton';
import { listing as listingType } from './types/root';
import { type as textButtonType } from './types/textButton';

// TODO: SIMPLIFY ALL CLASS NAMES
type TextButtonProps = {
  data: textButtonType;
  extended?: boolean;
};
export const TextButton: FC<TextButtonProps> = ({ data, extended = false }) => {
  const Icon = data?.icon;

  return (
    <button className="context-menu-text-button" onClick={() => data.onClick()}>
      <div className="context-menu-text-button-icon-container">
        {Icon ? <Icon /> : undefined}
      </div>
      <span className="context-menu-text-button-text">{data.text}</span>
      <div className="context-menu-text-button-icon-container right">
        {extended ? <NextIcon /> : undefined}
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
        onClick: () => alert(`fine, i'll extend it`),
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
  const listingComponents = data.listing.map((listing) => {
    const Component = typeToComponent[listing.type];
    return <Component data={listing} />;
  });

  return (
    <div
      className={`
        context-menu-container
        ${toolbar ? 'toolbar' : 'generic'}
      `}
      style={{
        position: 'fixed',
        left: data.x,
        top: data.y,
      }}
    >
      {listingComponents}
    </div>
  );
};
