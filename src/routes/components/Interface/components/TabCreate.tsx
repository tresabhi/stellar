import saturnV from 'assets/blueprints/saturn-v.json';
import starship from 'assets/blueprints/starship.json';
import { Pallet, PalletItem } from 'components/Pallet';
import { loadBlueprint } from 'core/blueprint';
import { VanillaBlueprint } from 'game/Blueprint';
import { styled, theme } from 'stitches.config';
import useApp, { TAB } from 'stores/useApp';
import { TabContainer } from './Tabs';

const jmnetMember = (id: number) => {
  return `https://jmnet.one/sfs/forum/index.php?members/${id}/`;
};

const TEMPLATES: [string, string, string, VanillaBlueprint][] = [
  ['Saturn V', 'Luke96', jmnetMember(4805), saturnV],
  ['SpaceX Starship', 'SouthwestSpaceFlight', jmnetMember(4673), starship],
];
const PALLET_ITEMS = TEMPLATES.sort((a, b) => {
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
}).map(
  (template) =>
    ({
      name: template[0],
      note: template[1],
      noteURL: template[2],
      callback: () => {
        loadBlueprint(template[3]);
        useApp.setState({ tab: TAB.LAYOUT });
      },
    } as PalletItem),
);

const Container = styled('div', {
  flex: 1,
  backgroundColor: theme.colors.componentBackground,
  display: 'flex',
  gap: theme.space.gapUnrelatedMajor,
});

const SectionContainer = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelatedMajor,
  padding: theme.space.paddingMajor,
});

const FullHeightPallet = styled(Pallet, {
  flex: 1,
});

export const TabCreate = () => (
  <TabContainer tab={TAB.CREATE}>
    <Container>
      <SectionContainer>
        <FullHeightPallet
          transparent
          darkBackground
          items={PALLET_ITEMS}
          placeholder="Search templates..."
          hasMaxHeight={false}
        />
      </SectionContainer>
    </Container>
  </TabContainer>
);
