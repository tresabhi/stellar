import { FC } from 'react';
import { listing as listingType } from './types/root';
import { type as textButtonType } from './types/textButton';

import './index.scss';

// TODO: SIMPLIFY ALL CLASS NAMES
type TextButtonProps = {
  data: textButtonType;
};
export const TextButton: FC<TextButtonProps> = ({ data }) => {
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
    </button>
  );
};

const typeToComponent: any = {
  textButton: TextButton,
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
