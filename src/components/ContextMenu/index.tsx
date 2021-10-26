import { FC } from 'react';
import { listing } from './types/listings/root';

type IContainer = {
  data: listing;
  toolbar?: boolean;
};
const Container: FC<IContainer> = ({ data, toolbar = false }) => {
  const listing = data.map(() => {});

  return (
    <div
      className={`
        context-menu-container
        ${toolbar ? 'toolbar' : ''}
      `}
    >
      {listing}
    </div>
  );
};

export default {
  ...{
    Container,
  },
};
