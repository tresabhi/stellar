import { getPart } from 'core/part';
import { Group } from 'game/parts/Group';
import useBlueprint from 'hooks/useBlueprint';
import { FC, InputHTMLAttributes } from 'react';
import compareStringArrays from 'utilities/compareStringArrays';
import styles from '../index.module.scss';
import { Listing } from './Listing';

export interface ContainerProps extends InputHTMLAttributes<HTMLDivElement> {
  parent?: string;
  indentation: number;
}
export const Container: FC<ContainerProps> = ({
  parent,
  indentation,
  ...props
}) => {
  const state = useBlueprint(
    (state) => (parent ? (getPart(parent, state) as Group) : state).partOrder,
    compareStringArrays,
  );
  const partListing = state.map((id) => (
    <Listing key={`part-${id}`} id={id} indentation={indentation} />
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
