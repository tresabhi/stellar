import { PlusIcon } from '@radix-ui/react-icons';
import * as PartsExplorer from 'components/PartsExplorer';
import * as Sidebar from 'components/Sidebar';
import { useTranslator } from 'hooks/useTranslator';
import useBlueprint from 'stores/blueprint';

export const Parts = () => {
  const { t, f } = useTranslator();
  const hasNoParts = useBlueprint((state) => state.part_order.length === 0);

  return hasNoParts ? (
    <Sidebar.MessageContainer>
      <Sidebar.Message>{t`tab.layout.left_sidebar.parts.no_parts`}</Sidebar.Message>
      <Sidebar.Message subMessage>
        {f`tab.layout.left_sidebar.parts.no_parts.instructions`[0]}
        <PlusIcon />
        {f`tab.layout.left_sidebar.parts.no_parts.instructions`[1]}
      </Sidebar.Message>
    </Sidebar.MessageContainer>
  ) : (
    <PartsExplorer.Container fullHeight overflow parentId={null} />
  );
};
