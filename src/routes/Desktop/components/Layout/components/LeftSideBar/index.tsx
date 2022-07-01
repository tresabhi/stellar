import * as Partition from 'components/Partitions';
import * as PartsExplorer from 'components/PartsExplorer';
import * as SideBar from 'components/SideBar';
import useSettings, { UseSettings } from 'hooks/useSettings';
import useTranslator from 'hooks/useTranslator';
import produce from 'immer';
import styles from './index.module.scss';

export default function LeftSideBar() {
  const { t } = useTranslator();
  const partition = useSettings((state) => state.layout.leftSideBar.partition);
  const isPartitionParts = partition === 'parts';
  const isPartitionSnippets = partition === 'snippets';

  const handlePartsClick = () =>
    useSettings.setState(
      produce((draft: UseSettings) => {
        draft.layout.leftSideBar.partition = 'parts';
      }),
    );
  const handleSnippetsClick = () =>
    useSettings.setState(
      produce((draft: UseSettings) => {
        draft.layout.leftSideBar.partition = 'snippets';
      }),
    );

  return (
    <SideBar.Container className={styles['left-side-bar']}>
      <Partition.Container>
        <Partition.Partition
          selected={isPartitionParts}
          onClick={handlePartsClick}
        >
          {t`parts_explorer.parts`}
        </Partition.Partition>
        <Partition.Separator />
        <Partition.Partition
          selected={isPartitionSnippets}
          onClick={handleSnippetsClick}
        >
          {t`parts_explorer.snippets`}
        </Partition.Partition>
      </Partition.Container>
      <SideBar.Scrollable
        style={{
          display: isPartitionParts ? undefined : 'none',
        }}
      >
        <PartsExplorer.Container indentation={0} />
      </SideBar.Scrollable>
      <SideBar.Scrollable
        style={{
          display: isPartitionSnippets ? undefined : 'none',
        }}
      >
        <span
          style={{
            color: 'white',
            display: 'block',
            padding: 'auto',
            paddingTop: '16px',
            textAlign: 'center',
          }}
        >
          {t`parts_explorer.snippets.coming_soon`}
        </span>
      </SideBar.Scrollable>
    </SideBar.Container>
  );
}
