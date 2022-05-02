import { Group } from 'game/parts/Group';
import { getPart } from 'interfaces/blueprint';
import { FC, InputHTMLAttributes } from 'react';
import blueprintStore from 'stores/blueprint';
import { UUID } from 'types/Parts';
import compareStringArrays from 'utilities/compareStringArrays';
import styles from '../index.module.scss';
import { Listing } from './Listing';

export interface ContainerProps extends InputHTMLAttributes<HTMLDivElement> {
  parent?: UUID;
  indentation: number;
}
export const Container: FC<ContainerProps> = ({
  parent,
  indentation,
  ...props
}) => {
  const state = blueprintStore(
    (state) => (parent ? (getPart(parent, state) as Group) : state).partOrder,
    compareStringArrays,
  );
  const partListing = state.map((ID) => (
    <Listing key={`part-${ID}`} ID={ID} indentation={indentation} />
  ));

  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['parts-explorer']}`}
    >
      {partListing}
    </div>
  );
};
