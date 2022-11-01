import {
  EnterIcon,
  FilePlusIcon,
  MagnifyingGlassIcon,
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
import { InputWithIcon } from 'components/InputWithIcon';
import * as Popup from 'components/Popup';
import { SearchItem } from 'components/Search';
import { mutateApp } from 'core/app/mutateApp';
import { importFile, loadBlueprint } from 'core/blueprint';
import { VanillaBlueprint } from 'game/Blueprint';
import { useTranslator } from 'hooks/useTranslator';
import { useMemo, useRef } from 'react';
import { TabContainer } from 'routes/Interface/components/TabContainer';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/useApp';
import getStellarContext from 'utilities/getStellarContext';
import { StatusBar } from './components/StatusBar';

const Container = styled('div', {
  flex: '1 0 0',
  backgroundColor: theme.colors.componentBackground,
  display: 'flex',
  gap: theme.space.gapUnrelatedMajor,
  alignItems: 'stretch',
  justifyContent: 'center',
  overflowY: 'auto',
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

const StellarContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapUnrelatedMajor,
});

const { Icon } = getStellarContext();
const StellarIcon = styled(Icon, {
  width: theme.sizes[64],
  height: theme.sizes[64],
});

const SearchWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
  alignItems: 'stretch',
  justifyContent: 'stretch',
  width: '100%',
  height: '100%',
  maxWidth: theme.sizes.createTabContentMaxWidth,
  maxHeight: theme.sizes.createTabContentMaxHeight,
});

const StyledSearch = styled(Popup.Search, {
  flex: '1 0 0',
  width: '100%',
  backgroundColor: theme.colors.appBackground2,
});

const Separator = styled('div', {
  width: theme.sizes.separatorWidth,
  height: '75%',
  // TODO: add a separator color
  backgroundColor: theme.colors.componentNonInteractiveBorder,
  borderRadius: theme.radii[1],
});

const Title = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[24],
});

const SubTitle = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[12],
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

interface Template {
  name: string;
  blueprint: VanillaBlueprint;
}

const TEMPLATES: Template[] = [
  {
    name: 'tab.create.templates.list.hopper',
    blueprint: hopper,
  },
  {
    name: 'tab.create.templates.list.apollo_mission',
    blueprint: apolloMission,
  },
  {
    name: 'tab.create.templates.list.light_lander',
    blueprint: lightLander,
  },
  {
    name: 'tab.create.templates.list.rover',
    blueprint: rover,
  },
  {
    name: 'tab.create.templates.list.parachute_and_separator',
    blueprint: parachuteAndSeparator,
  },
  {
    name: 'tab.create.templates.list.joints',
    blueprint: joints,
  },
  {
    name: 'tab.create.templates.list.orbit_and_re_entry',
    blueprint: orbitAndReEntry,
  },
  {
    name: 'tab.create.templates.list.race_car',
    blueprint: raceCar,
  },
  {
    name: 'tab.create.templates.list.basic_rocket',
    blueprint: basicRocket,
  },
];

const FileActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
});

export const CreateTab = () => {
  const { t, translate, language } = useTranslator();
  const input = useRef<HTMLInputElement>(null);
  const templates = useMemo(
    () =>
      TEMPLATES.sort((a, b) => a.name.localeCompare(b.name)).map(
        ({ name, blueprint }) => {
          const translation = translate(name);

          const handleClick = () => {
            loadBlueprint(blueprint);
            toLayout();
          };

          const searchItem: SearchItem = {
            string: translation,
            node: (
              <Popup.SearchItem onClick={handleClick} key={`item-${name}`}>
                {translation}
              </Popup.SearchItem>
            ),
            callback: handleClick,
          };

          return searchItem;
        },
      ),
    [language],
  );

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

  return (
    <TabContainer>
      <Container>
        <SectionContainer full>
          <SearchWrapper>
            <InputWithIcon
              ref={input}
              placeholder={t`tab.create.templates.input_placeholder`}
              icon={<MagnifyingGlassIcon />}
            />
            <StyledSearch input={input} list={templates} />
          </SearchWrapper>
        </SectionContainer>

        <SectionContainer>
          <Separator />
        </SectionContainer>

        <SectionContainer full>
          <StellarContainer>
            <StellarIcon />

            <FileActions>
              <Title>Stellar</Title>
              <SubTitle>{t`tab.create.file_options.motto`}</SubTitle>
            </FileActions>
          </StellarContainer>

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
