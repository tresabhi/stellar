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
import parachuteAndSeparator from 'assets/blueprints/parachute-and-separator.json';
import raceCar from 'assets/blueprints/race-car.json';
import rover from 'assets/blueprints/rover.json';
import { fileOpen } from 'browser-fs-access';
import { Button as ButtonPrimitive } from 'components/Button';
import { Palette, PaletteItem } from 'components/Palette';
import { mutateApp } from 'core/app/mutateApp';
import { importFile, loadBlueprint } from 'core/blueprint';
import { VanillaBlueprint } from 'game/Blueprint';
import { useTranslator } from 'hooks/useTranslator';
import { TabContainer } from 'routes/Interface/components/TabContainer';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/useApp';
import { StatusBar } from './components/StatusBar';

const ABHI = 'TrèsAbhi';
const ABHI_WEB = 'https://tresabhi.github.io/';

interface Template {
  name: string;
  author: string;
  link: number | string;
  blueprint: VanillaBlueprint;
  inbuilt: boolean;
}

const Container = styled('div', {
  flex: 1,
  backgroundColor: theme.colors.componentBackground,
  display: 'flex',
  gap: theme.space.gapUnrelatedMajor,
  alignItems: 'stretch',
  justifyContent: 'center',
});

const SectionContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.space[32],
  padding: theme.space.paddingMajor,

  variants: {
    full: {
      true: {
        flex: 1,
      },
    },
  },

  defaultVariants: {
    full: false,
  },
});

const PaletteWrapper = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',
  height: '100%',
  maxWidth: theme.sizes.createTabContentMaxWidth,
  maxHeight: theme.sizes.createTabContentMaxHeight,
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

const Button = styled(ButtonPrimitive, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: theme.fontSizes[12],
  gap: theme.space.gapRelated,
  padding: theme.space.padding,
  borderRadius: theme.radii[4],

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  defaultVariants: {
    border: true,
    color: 'accent',
  },
});

const FileActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
});

export const CreateTab = () => {
  const { t } = useTranslator();
  const toLayout = () => {
    mutateApp((draft) => {
      draft.interface.tab = Tab.Layout;
    });
  };
  const handleScratchClick = () => {
    loadBlueprint();
    toLayout();
  };
  const handleImportClick = async () => {
    await importFile();
    toLayout();
  };
  const handleOpenClick = async () => {
    await fileOpen();
    toLayout();
  };

  const TEMPLATES: Template[] = [
    {
      name: t`tab.create.templates.list.hopper`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: hopper,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.apollo_mission`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: apolloMission,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.light_lander`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: lightLander,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.rover`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: rover,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.parachute_and_separator`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: parachuteAndSeparator,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.joints`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: joints,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.orbit_and_re_entry`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: orbitAndReEntry,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.race_car`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: raceCar,
      inbuilt: true,
    },
    {
      name: t`tab.create.templates.list.basic_rocket`,
      author: ABHI,
      link: ABHI_WEB,
      blueprint: basicRocket,
      inbuilt: true,
    },
  ];
  const PALETTE_ITEMS = TEMPLATES.sort((a, b) => {
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
          mutateApp((draft) => {
            draft.interface.tab = Tab.Layout;
          });
        },
        icon: template.inbuilt ? <FileTextIcon /> : <ArchiveIcon />,
      } as PaletteItem),
  );

  return (
    <TabContainer overflow>
      <Container>
        <SectionContainer full>
          <PaletteWrapper>
            <Palette
              collapse
              iconGap
              transparent
              darkBackground
              items={PALETTE_ITEMS}
              placeholder={t`tab.create.templates.search_placeholder`}
              hasMaxHeight={false}
            />
          </PaletteWrapper>
        </SectionContainer>

        <SectionContainer>
          <Separator />
        </SectionContainer>

        <SectionContainer full>
          <FileActions>
            <Title>Stellar</Title>
            <SubTitle>{t`tab.create.file_options.motto`}</SubTitle>
          </FileActions>

          <FileActions>
            <Button onClick={handleScratchClick} priority="solid">
              <FilePlusIcon /> {t`tab.create.file_options.from_scratch`}
            </Button>
            <Button onClick={handleImportClick}>
              <EnterIcon /> {t`tab.create.file_options.import`}
            </Button>
            <Button onClick={handleOpenClick}>
              <UploadIcon /> {t`tab.create.file_options.open`}
            </Button>
          </FileActions>
        </SectionContainer>
      </Container>

      <StatusBar />
    </TabContainer>
  );
};
