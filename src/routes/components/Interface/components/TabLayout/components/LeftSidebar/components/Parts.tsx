import * as PartsExplorer from 'components/PartsExplorer';
import { FC } from 'react';
import { TabContentProps } from '../../..';

export const Parts: FC<TabContentProps> = ({ visible }) => (
  <PartsExplorer.Container
    fullHeight
    overflow
    visible={visible}
    parentId={null}
  />
);
