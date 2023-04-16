import * as PartsExplorer from 'components/PartsExplorer';
import * as Sidebar from 'components/Sidebar';
import useTranslator from 'hooks/useTranslator';
import useApp, { Tab } from 'stores/app';
import useBlueprint from 'stores/blueprint';

export default function Parts() {
  const { t } = useTranslator();
  const isStaging = useApp.getState().interface.tab === Tab.Staging;
  const hasNoParts = useBlueprint((state) => state.part_order.length === 0);
  const hasNoStageSelected = useBlueprint(
    (state) => state.stage_selection === null,
  );

  let message = '';

  if (isStaging) {
    if (hasNoParts) {
      message = t`tabs.layout.left_sidebar.parts.no_parts.instructions_no_parts_in_staging`;
    } else if (hasNoStageSelected) {
      message = t`tabs.layout.left_sidebar.parts.no_parts.instructions_no_stage_selected`;
    }
  } else if (hasNoParts) {
    message = t`tabs.layout.left_sidebar.parts.no_parts.instructions`;
  }

  return hasNoParts ? (
    <Sidebar.MessageRoot>
      <Sidebar.Message>{t`tabs.layout.left_sidebar.parts.no_parts`}</Sidebar.Message>
      <Sidebar.Message subMessage>{message}</Sidebar.Message>
    </Sidebar.MessageRoot>
  ) : (
    <PartsExplorer.Root parentId={null} />
  );
}
