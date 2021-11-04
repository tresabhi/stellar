import { ReactComponent as NextIcon } from 'assets/icons/next.svg';
import { FC, useRef } from 'react';
import './index.scss';
import { type as extendButtonType } from './types/extendButton';
import { contextMenuListing, contextMenuListing as listingType } from './types/root';
import { type as textButtonType } from './types/textButton';

// TODO: SIMPLIFY ALL CLASS NAMES
type TextButtonProps = { data: textButtonType; extended?: boolean };
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

type ExtendButtonProps = { data: extendButtonType };
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
type ContextContainerProps = {
  data: listingType;
  toolbar?: boolean;
  onActionTaken?: Function;
};
export const ContextContainer: FC<ContextContainerProps> = ({
  data,
  toolbar = false,
  onActionTaken,
}) => {
  let listingComponents;

  listingComponents = data.listing.map((listing) => {
    const Component = typeToComponent[listing.type];
    return (
      <Component
        data={{
          ...listing,
          onClick: () => {
            // if it has it, run it
            (listing as any)?.onClick();
            if (onActionTaken) onActionTaken();
          },
        }}
      />
    );
  });

  return (
    <div
      className={`
        context-menu-container
        ${toolbar ? 'toolbar' : 'generic'}
      `}
      style={
        toolbar
          ? {}
          : {
              position: 'fixed',
              left: data.x,
              top: data.y,
            }
      }
    >
      {listingComponents}
    </div>
  );
};

type ContainerProps = { contexts: Array<contextMenuListing>; onBlur: Function };
export const Container: FC<ContainerProps> = ({ contexts, onBlur }) => {
  const contextMenus = contexts.map((contextMenu) => {
    return <ContextContainer data={contextMenu} onActionTaken={onBlur} />;
  });

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={componentRef}
      onClick={(event) => {
        if (event.target === componentRef.current) onBlur();
      }}
      className={`
    contexts-container
    ${contexts.length > 0 ? 'active' : 'inactive'}
  `}
    >
      {contextMenus}
    </div>
  );
};
