// DEPRECATED

import { ReactComponent as NextIcon } from 'assets/icons/next.svg';
import { FC, useRef } from 'react';
import * as ExtendContextListing from '../../core/API/contextListings/types/extendButton';
import * as RootContextListing from '../../core/API/contextListings/types/root';
import * as TextContextListing from '../../core/API/contextListings/types/textButton';
import './index.scss';

interface TextButtonProps {
  data: TextContextListing.type;
  extended?: boolean;
}
export const TextButton: FC<TextButtonProps> = ({ data, extended = false }) => {
  const Icon = data?.icon;

  return (
    <button className="text-button" onClick={() => data.onClick()}>
      <div className="icon-container">{Icon ? <Icon /> : undefined}</div>
      <span className="text">{data.text}</span>
      <div className="icon-container right">
        {extended ? <NextIcon /> : undefined}
      </div>
    </button>
  );
};

const Separator = () => {
  return <div className="separator" />;
};

interface ExtendButtonProps {
  data: ExtendContextListing.type;
}
const ExtendButton: FC<ExtendButtonProps> = ({ data }) => {
  // const Icon = data?.icon;

  return (
    // <button className="text-button" onClick={() => data.onClick()}>
    //   <div className="icon-container">{Icon ? <Icon /> : undefined}</div>
    //   <span className="text">{data.text}</span>
    //   <div className="icon-container right">
    //     {/* {extended ? <NextIcon /> : undefined} */}
    //   </div>
    // </button>
    <></>
  );
};

const typeToComponent: any = {
  text_button: TextButton,
  separator: Separator,
  extend_button: ExtendButton,
};
interface ContextContainerProps {
  data: RootContextListing.contextMenuListing;
  toolbar?: boolean;
  onActionTaken?: () => void;
}
export const ContextContainer: FC<ContextContainerProps> = ({
  data,
  toolbar = false,
  onActionTaken,
}) => {
  let listingComponents;

  listingComponents = data.listing.map((listing, index) => {
    const Component = typeToComponent[listing.type];
    return (
      <Component
        key={`listing-${index}`}
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
      className={`context-container ${toolbar ? 'toolbar' : 'generic'}`}
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

interface ContainerProps {
  contexts: RootContextListing.contextMenuListing[];
  onBlur: () => void;
}
export const Container: FC<ContainerProps> = ({ contexts, onBlur }) => {
  const contextMenus = contexts.map((contextMenu, index) => {
    return (
      <ContextContainer
        key={`context-menu-${index}`}
        data={contextMenu}
        onActionTaken={onBlur}
      />
    );
  });

  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={componentRef}
      onClick={(event) => {
        if (event.target === componentRef.current) onBlur();
      }}
      className={`contexts-container ${
        contexts.length > 0 ? 'active' : 'inactive'
      }`}
    >
      {contextMenus}
    </div>
  );
};
