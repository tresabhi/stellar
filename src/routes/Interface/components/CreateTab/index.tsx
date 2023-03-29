import {
  EnterIcon,
  FilePlusIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import apolloMission from 'assets/blueprints/apollo-mission.json';
import basicRocket from 'assets/blueprints/basic-rocket.json';
import hopper from 'assets/blueprints/hopper.json';
import lightLander from 'assets/blueprints/light-lander.json';
import orbitAndReEntry from 'assets/blueprints/orbit-and-re-entry.json';
import parachuteAndSeparator from 'assets/blueprints/parachute-and-separator.json';
import { fileOpen } from 'browser-fs-access';
import ButtonPrimitive from 'components/Button';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Prompt from 'components/Prompt';
import mutateApp from 'core/app/mutateApp';
import importFile from 'core/blueprint/importFile';
import loadBlueprint from 'core/blueprint/loadBlueprint';
import confirmProgressReset from 'core/interface/confirmProgressReset';
import { VanillaBlueprint } from 'game/Blueprint';
import useTranslator from 'hooks/useTranslator';
import { useMemo, useRef } from 'react';
import TabContainer from 'routes/Interface/components/TabContainer';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/app';
import { getContext } from 'utilities/getContext';
import StatusBar from './components/StatusBar';

export const Container = styled('div', {
  flex: '1 0 0',
  backgroundColor: theme.colors.componentInteractive,
  display: 'flex',
  gap: theme.space.gapUnrelatedMajor,
  alignItems: 'stretch',
  justifyContent: 'center',
  overflowY: 'auto',
});

export const SectionContainer = styled('div', {
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

const StellarIcon = styled(getContext().Icon, {
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

const StyledSearch = styled(Prompt.Search, {
  flex: '1 0 0',
  width: '100%',
  backgroundColor: theme.colors.appBackground2,
});

export const Separator = styled('div', {
  // TODO: add a separator color
  backgroundColor: theme.colors.borderNonInteractive,
  borderRadius: theme.radii.sharper,

  variants: {
    horizontal: {
      true: { height: theme.sizes.separatorWidth, width: '75%' },
      false: { width: theme.sizes.separatorWidth, height: '75%' },
    },
  },

  defaultVariants: {
    horizontal: false,
  },
});

const Title = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[24],
});

const SubTitle = styled('span', {
  color: theme.colors.textLowContrast,
  fontSize: theme.fontSizes[14],
});

export const Button = styled(ButtonPrimitive, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: theme.fontSizes[12],
  gap: theme.space.gapRelatedRegular,
  padding: theme.space.paddingRegular,
  borderRadius: theme.radii.regular,

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
  credit?: string;
}

const TEMPLATES: Template[] = [
  { name: 'hopper', blueprint: hopper as VanillaBlueprint },
  { name: 'apollo_mission', blueprint: apolloMission as VanillaBlueprint },
  { name: 'light_lander', blueprint: lightLander as VanillaBlueprint },
  // { name: 'rover', blueprint: rover },
  {
    name: 'parachute_and_separator',
    blueprint: parachuteAndSeparator as VanillaBlueprint,
  },
  // { name: 'joints', blueprint: joints },
  {
    name: 'orbit_and_re_entry',
    blueprint: orbitAndReEntry as VanillaBlueprint,
  },
  { name: 'basic_rocket', blueprint: basicRocket as VanillaBlueprint },
];

export const Actions = styled('div', {
  display: 'flex',
  gap: theme.space.gapRelatedMajor,

  variants: {
    horizontal: {
      false: { flexDirection: 'column' },
    },
  },

  defaultVariants: {
    horizontal: false,
  },
});

export default function CreateTab() {
  const { t, translate } = useTranslator();
  const input = useRef<HTMLInputElement>(null);

  const toLayout = () => {
    mutateApp((draft) => {
      draft.interface.tab = Tab.Layout;
    });
  };

  const templates = useMemo(
    () =>
      TEMPLATES.sort((a, b) => a.name.localeCompare(b.name)).map(
        ({ name, blueprint, credit }) => {
          const translation = translate(`tabs.create.templates.list.${name}`);

          const handleClick = async () => {
            toLayout();
            if (await confirmProgressReset()) loadBlueprint(blueprint);
          };

          const searchItem = {
            string: translation,
            node: (
              <Prompt.SearchItem
                icon={credit ? <FilePlusIcon /> : <FileTextIcon />}
                onClick={handleClick}
                key={`item-${name}`}
                note={credit ?? t`tabs.create.templates.in_built`}
              >
                {translation}
              </Prompt.SearchItem>
            ),
            callback: handleClick,
          };

          return searchItem;
        },
      ),
    [translate],
  );

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
              placeholder={t`tabs.create.templates.input_placeholder`}
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

            <Actions>
              <Title>Stellar</Title>
              <SubTitle>{t`tabs.create.file_options.motto`}</SubTitle>
            </Actions>
          </StellarContainer>

          <Actions>
            <Button onClick={handleScratchClick} priority="solid">
              <FilePlusIcon />
              {t`tabs.create.file_options.from_scratch`}
            </Button>
            <Button onClick={handleImportClick}>
              <EnterIcon />
              {t`tabs.create.file_options.import`}
            </Button>
            <Button onClick={handleOpenClick}>
              <UploadIcon />
              {t`tabs.create.file_options.open`}
            </Button>
          </Actions>
        </SectionContainer>
      </Container>

      <StatusBar />
    </TabContainer>
  );
}
