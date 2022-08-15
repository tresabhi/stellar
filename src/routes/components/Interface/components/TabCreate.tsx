import { FilePlusIcon, FileTextIcon } from '@radix-ui/react-icons';
import dragonHelicopter from 'assets/blueprints/dragon-helicopter.json';
import gaganyaan from 'assets/blueprints/gaganyaan.json';
import marsVenusRover from 'assets/blueprints/mars-venus-rover.json';
import notNationalTeamLander from 'assets/blueprints/not-national-team-lander.json';
import perseveranceRover from 'assets/blueprints/perseverance-rover.json';
import saturnV from 'assets/blueprints/saturn-v.json';
import smallShuttle from 'assets/blueprints/small-shuttle.json';
import sovietN1 from 'assets/blueprints/soviet-n1.json';
import starHauler from 'assets/blueprints/star-hauler.json';
import starship from 'assets/blueprints/starship.json';
import titanIIIC from 'assets/blueprints/titan-iiic.json';
import { Pallet, PalletItem } from 'components/Pallet';
import { loadBlueprint } from 'core/blueprint';
import { VanillaBlueprint } from 'game/Blueprint';
import { styled, theme } from 'stitches.config';
import useApp, { TAB } from 'stores/useApp';
import { TabContainer } from './Tabs';

const TEMPLATES: [string, string, number, VanillaBlueprint, boolean][] = [
  ['Saturn V', 'Luke96', 4805, saturnV, true],
  ['Starship', 'SouthwestSpaceFlight', 4673, starship, true],
  ['Soviet N1', 'SSA', 5649, sovietN1, true],
  ['Perseverance Rover', 'alexmb48', 4829, perseveranceRover, false],
  ['Gaganyaan', 'SFSAbhishek', 3320, gaganyaan, true],
  ['Titan IIIC', 'Cjuwa1985', 4688, titanIIIC, true],
  ['Mars/Venus Rover', 'Bilo92', 6120, marsVenusRover, true],
  ['Small Shuttle', 'Soyuzturtle', 4706, smallShuttle, false],
  ['Dragon Helicopter', 'mosscow', 4845, dragonHelicopter, false],
  ['Star Hauler', 'Sheepy', 5528, starHauler, true],
  ["National Team's Lander", 'Kaen', 6007, notNationalTeamLander, false],
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
      noteURL: `https://jmnet.one/sfs/forum/index.php?members/${template[2]}`,
      callback: () => {
        loadBlueprint(template[3]);
        useApp.setState({ tab: TAB.LAYOUT });
      },
      icon: template[4] ? <FilePlusIcon /> : <FileTextIcon />,
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
          iconGap
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
