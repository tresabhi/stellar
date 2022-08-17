import {
  ArchiveIcon,
  EnterIcon,
  FilePlusIcon,
  FileTextIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import apolloMission from 'assets/blueprints/apollo-mission.json';
import basicRocket from 'assets/blueprints/basic-rocket.json';
import hopper from 'assets/blueprints/hopper.json';
import joints from 'assets/blueprints/joints.json';
import lightLander from 'assets/blueprints/light-lander.json';
import orbitAndReEntry from 'assets/blueprints/orbit-and-re-entry.json';
import parachuteAndDecoupler from 'assets/blueprints/parachute-and-decoupler.json';
import raceCar from 'assets/blueprints/race-car.json';
import rover from 'assets/blueprints/rover.json';
import { fileOpen } from 'browser-fs-access';
import { Button as ButtonComponent } from 'components/Button';
import { Pallet, PalletItem } from 'components/Pallet';
import { TabContainer } from 'components/TabContainer';
import { fileImport, loadBlueprint } from 'core/blueprint';
import { VanillaBlueprint } from 'game/Blueprint';
import { styled, theme } from 'stitches.config';
import useApp, { Tab } from 'stores/useApp';
import { Statusbar } from './components/Statusbar';

const ABHI = 'TrèsAbhi';
const ABHI_WEB = 'https://tresabhi.github.io/';

interface Template {
  name: string;
  author: string;
  link: number | string;
  blueprint: VanillaBlueprint;
  inbuilt: boolean;
}

const TEMPLATES: Template[] = [
  {
    name: 'Hopper',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: hopper,
    inbuilt: true,
  },
  {
    name: 'Apollo Mission',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: apolloMission,
    inbuilt: true,
  },
  {
    name: 'Light Lander',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: lightLander,
    inbuilt: true,
  },
  {
    name: 'Rover',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: rover,
    inbuilt: true,
  },
  {
    name: 'Parachute & Decoupler',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: parachuteAndDecoupler,
    inbuilt: true,
  },
  {
    name: 'Joints',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: joints,
    inbuilt: true,
  },
  {
    name: 'Orbit & Re-entry',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: orbitAndReEntry,
    inbuilt: true,
  },
  {
    name: 'Race Car',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: raceCar,
    inbuilt: true,
  },
  {
    name: 'Basic Rocket',
    author: ABHI,
    link: ABHI_WEB,
    blueprint: basicRocket,
    inbuilt: true,
  },
];
const PALLET_ITEMS = TEMPLATES.sort((a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}).map(
  (template) =>
    ({
      name: template.name,
      note: template.author,
      noteURL:
        typeof template.link === 'string'
          ? template.link
          : `https://jmnet.one/sfs/forum/index.php?members/${template.link}`,
      callback: () => {
        loadBlueprint(template.blueprint);
        useApp.setState({ tab: Tab.Layout });
      },
      icon: template.inbuilt ? <FileTextIcon /> : <ArchiveIcon />,
    } as PalletItem),
);

const Container = styled('div', {
  flex: 1,
  backgroundColor: theme.colors.componentBackground,
  display: 'flex',
  gap: theme.space.gapUnrelatedMajor,
  alignItems: 'center',
  justifyContent: 'center',
});

const SectionContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[32],
  padding: theme.space.paddingMajor,
  height: '100%',
  maxWidth: theme.sizes.createTabContentMaxWidth,
  maxHeight: theme.sizes.createTabContentMaxHeight,

  variants: {
    full: {
      true: {
        flex: 1,
      },
    },

    center: {
      true: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },

  defaultVariants: {
    full: false,
  },
});

const FullHeightPallet = styled(Pallet, {
  flex: 1,
});

const Separator = styled('div', {
  width: theme.sizes.separatorWidth,
  height: '75%',
  // TODO: add a seperator color
  backgroundColor: theme.colors.componentNonInteractiveBorder,
  borderRadius: theme.radii[1],
});

const Title = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[32],
});

const SubTitle = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[12],
  fontFamily: theme.fonts.mono,
});

const Button = styled(ButtonComponent, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: theme.fontSizes[12],
  gap: theme.space.gapRelated,

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  defaultVariants: {
    padding: true,
    border: true,
    borderRadius: true,
    color: 'accent',
  },
});

const FileActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
});

export const TabCreate = () => {
  const handleScratchClick = () => {
    loadBlueprint();
    useApp.setState({ tab: Tab.Layout });
  };
  const handleImportClick = async () => {
    await fileImport();
    useApp.setState({ tab: Tab.Layout });
  };
  const handleOpenClick = async () => {
    await fileOpen();
    useApp.setState({ tab: Tab.Layout });
  };

  return (
    <TabContainer tab={Tab.Create}>
      <Container>
        <SectionContainer full>
          <FullHeightPallet
            iconGap
            transparent
            darkBackground
            items={PALLET_ITEMS}
            placeholder="Search templates..."
            hasMaxHeight={false}
          />
        </SectionContainer>

        <SectionContainer center>
          <Separator />
        </SectionContainer>

        <SectionContainer full center>
          <FileActions>
            <Title>Stellar</Title>
            <SubTitle>Blueprint editing redefined</SubTitle>
          </FileActions>

          <FileActions>
            <Button onClick={handleScratchClick} callToAction>
              <FilePlusIcon /> Start From Scratch
            </Button>
            <Button onClick={handleImportClick}>
              <EnterIcon /> Import Blueprint File
            </Button>
            <Button onClick={handleOpenClick}>
              <UploadIcon /> Open Stellar File
            </Button>
          </FileActions>
        </SectionContainer>
      </Container>

      <Statusbar />
    </TabContainer>
  );
};
