import * as PartsExplorer from 'components/PartsExplorer';
import { FC } from 'react';
import useBlueprint from 'stores/useBlueprint';
import { TabContentProps } from '../../..';

export const Parts: FC<TabContentProps> = ({ visible }) => {
  const partOrder = useBlueprint((state) => state.part_order);
  const listings = partOrder.map((id) => (
    <PartsExplorer.Listing id={id} key={`part-${id}`} />
  ));

  return (
    <PartsExplorer.Container fullHeight visible={visible}>
      {listings}
    </PartsExplorer.Container>
  );
};
