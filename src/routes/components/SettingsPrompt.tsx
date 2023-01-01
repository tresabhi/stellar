import {
  AccessibilityIcon,
  ArchiveIcon,
  BlendingModeIcon,
  CaretRightIcon,
  CodeIcon,
  CursorArrowIcon,
  DesktopIcon,
  FileIcon,
  HomeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  MobileIcon,
} from '@radix-ui/react-icons';
import Button from 'components/Button';
import { InputWithIcon } from 'components/InputWithIcon';
import Search from 'components/Search';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import { TAB_ORDER } from 'hooks/useKeybinds';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator from 'hooks/useTranslator';
import { RefObject, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/app';
import useSettings, { THEMES } from 'stores/settings';
import { NULL_THEME_KEY } from './WelcomePrompt';

interface SubSettingsProps {
  search: RefObject<HTMLInputElement>;
}

const Container = styled('div', {
  display: 'flex',
  backgroundColor: theme.colors.appBackground1,
  width: '100%',
  height: '100%',
  maxWidth: theme.sizes.settingsMaxWidth,
  maxHeight: theme.sizes.settingsMaxHeight,
  borderRadius: theme.radii[4],
  overflow: 'hidden',
});
const Navigation = styled('div', {
  width: theme.sizes.settingsNavigationWidth,
  backgroundColor: theme.colors.appBackground2,
  borderRight: theme.borderStyles.componentNonInteractive,
  padding: theme.space.paddingMajor,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelatedMajor,
});
const NavigationButtons = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedMajor,
});
const NavigationButton = styled(Button, {
  cursor: 'pointer',
  display: 'flex',
  padding: theme.space.padding,
  gap: theme.space.gapRelatedMajor,
  borderRadius: theme.radii[4],
  alignItems: 'center',
  justifyContent: 'center',

  '& svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
    color: theme.colors.textHighContrast,
  },

  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.componentBackgroundHover,
      },
    },

    transparent: { true: {} },
  },

  defaultVariants: {
    transparent: true,
  },
});
const NavigationButtonText = styled('span', {
  flex: 1,
  color: theme.colors.textHighContrast,
  textAlign: 'left',
  fontSize: theme.fontSizes[14],
});
const Options = styled('div', {
  overflowY: 'auto',
  flex: 1,
});
const OptionsWrapper = styled('div', {
  padding: theme.space.paddingMajor,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelatedMajor,
});
const Section = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[24],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  gap: theme.space.gapRelatedMajor,

  '& svg': {
    width: theme.sizes[24],
    height: theme.sizes[24],
  },
});
const Option = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelated,
});
const Title = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[14],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  gap: theme.space.gapRelated,

  '& svg': {
    width: theme.sizes[14],
    height: theme.sizes[14],
  },
});
const Description = styled('span', {
  fontSize: theme.fontSizes[12],
  color: theme.colors.textLowContrast,
});

export const TAB_MAP = {
  [Tab.Create]: 'create',
  [Tab.Layout]: 'layout',
  [Tab.Staging]: 'staging',
  [Tab.Export]: 'export',
};
export const TAB_MAP_INVERSE = {
  create: Tab.Create,
  layout: Tab.Layout,
  staging: Tab.Staging,
  export: Tab.Export,
};

function InterfaceSettings({ search }: SubSettingsProps) {
  const { t, translate } = useTranslator();

  const initialThemeValue = useSettings.getState().interface.theme ?? NULL_THEME_KEY;
  const handleThemeNoneClick = () => {
    mutateSettings((draft) => {
      draft.interface.theme = null;
    });
  };
  const themes: JSX.Element[] = [
    <Select.Item
      value={NULL_THEME_KEY}
      onClick={handleThemeNoneClick}
      key={NULL_THEME_KEY}
    >
      {t`themes.theme_light`}
    </Select.Item>,
  ];
  THEMES.forEach((code) => {
    const handleClick = () => {
      mutateSettings((draft) => {
        draft.interface.theme = code.toString();
      });
    };

    themes.push(
      <Select.Item
        value={code.toString()}
        onClick={handleClick}
        key={`theme-${code.toString()}`}
      >
        {translate(`themes.${code.toString().split('-').join('_')}`)}
      </Select.Item>,
    );
  });
  const handleThemeValueChange = (value: string) => {
    mutateSettings((draft) => {
      if (value === 'none') {
        draft.interface.theme = null;
      } else {
        draft.interface.theme = value;
      }
    });
  };

  const initialTabValue = TAB_MAP[useSettings.getState().interface.defaultTab];
  const tabs = TAB_ORDER.map((tab) => (
    <Select.Item value={TAB_MAP[tab]}>
      {translate(`tabs.${TAB_MAP[tab]}`)}
    </Select.Item>
  ));
  const handleTabValueChange = (value: keyof typeof TAB_MAP_INVERSE) => {
    mutateSettings((draft) => {
      draft.interface.defaultTab = TAB_MAP_INVERSE[value];
    });
  };

  const initialTouchscreenValue = `${
    useSettings.getState().interface.touchscreenMode
  }`;
  const handleTouchscreenValueChange = (value: string) => {
    mutateSettings((draft) => {
      if (value === 'true') {
        draft.interface.touchscreenMode = true;
      } else if (value === 'false') {
        draft.interface.touchscreenMode = false;
      } else {
        draft.interface.touchscreenMode = null;
      }
    });
  };
  const touchscreenModes = [
    <Select.Item value="null">{t`prompts.settings.groups.interface.touchscreen_mode.options.auto`}</Select.Item>,
    <Select.Item value="true">{t`prompts.settings.groups.interface.touchscreen_mode.options.on`}</Select.Item>,
    <Select.Item value="false">{t`prompts.settings.groups.interface.touchscreen_mode.options.off`}</Select.Item>,
  ];

  const createGroupString = (string: string) => `${translate(
    `prompts.settings.groups.interface.${string}.title`,
  )} ${translate(`prompts.settings.groups.interface.${string}.description`)}`;

  return (
    <>
      <Section>
        <DesktopIcon />
        {t`prompts.settings.groups.interface`}
      </Section>

      <Search
        input={search}
        list={[
          {
            node: (
              <Option key="theme">
                <Title>
                  <BlendingModeIcon />
                  {t`prompts.settings.groups.interface.theme.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.interface.theme.description`}
                </Description>
                <Select.Root
                  onValueChange={handleThemeValueChange}
                  defaultValue={initialThemeValue}
                >
                  <Select.Trigger />
                  <Select.Content>{themes}</Select.Content>
                </Select.Root>
              </Option>
            ),
            string: createGroupString('theme'),
          },

          {
            node: (
              <Option key="default-tab">
                <Title>
                  <HomeIcon />
                  {t`prompts.settings.groups.interface.default_tab.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.interface.default_tab.description`}
                </Description>
                <Select.Root
                  onValueChange={handleTabValueChange}
                  defaultValue={initialTabValue}
                >
                  <Select.Trigger />
                  <Select.Content>{tabs}</Select.Content>
                </Select.Root>
              </Option>
            ),
            string: createGroupString('default_tab'),
          },

          {
            node: (
              <Option key="touchscreen-mode">
                <Title>
                  <MobileIcon />
                  {t`prompts.settings.groups.interface.touchscreen_mode.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.interface.touchscreen_mode.description`}
                </Description>
                <Select.Root
                  onValueChange={handleTouchscreenValueChange}
                  defaultValue={initialTouchscreenValue}
                >
                  <Select.Trigger />
                  <Select.Content>{touchscreenModes}</Select.Content>
                </Select.Root>
              </Option>
            ),
            string: createGroupString('touchscreen_mode'),
          },
        ]}
      />
    </>
  );
}

export default function SettingsPrompt() {
  const { t } = useTranslator();
  const search = useRef<HTMLInputElement>(null);

  usePopupConcurrency();

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      <Navigation>
        <InputWithIcon
          ref={search}
          placeholder={t`prompts.settings.navigation.search`}
          icon={<MagnifyingGlassIcon />}
        />

        <NavigationButtons>
          <NavigationButton selected>
            <DesktopIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.interface`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <CursorArrowIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.editor`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <LightningBoltIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.performance`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <ArchiveIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.features`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <FileIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.file_preferences`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <AccessibilityIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.accessibility`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <CodeIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.debug`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
        </NavigationButtons>
      </Navigation>
      <Options>
        <OptionsWrapper>
          <InterfaceSettings search={search} />
        </OptionsWrapper>
      </Options>
    </Container>
  );
}
