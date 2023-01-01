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
  InfoCircledIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  MobileIcon,
  TextIcon,
} from '@radix-ui/react-icons';
import Anchor from 'components/Anchor';
import Button from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { InputWithIcon } from 'components/InputWithIcon';
import Search from 'components/Search';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import { TAB_ORDER } from 'hooks/useKeybinds';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator, { TRANSLATIONS } from 'hooks/useTranslator';
import { RefObject, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/app';
import useSettings, { THEMES } from 'stores/settings';
import { FIXED_LANG_NAMES, NULL_THEME_KEY } from './WelcomePrompt';

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
  margin: `${theme.space.marginRelatedMajor} 0`,

  '& svg': {
    width: theme.sizes[24],
    height: theme.sizes[24],
  },
});
const OptionVertical = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelated,

  variants: {
    fill: {
      true: {
        flex: 1,
      },
    },
  },
});
const OptionHorizontal = styled('div', {
  gap: theme.space.gapRelatedMajor,
  display: 'flex',
  alignItems: 'center',
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
const Separator = styled('div', {
  height: theme.sizes[1],
  width: '75%',
  backgroundColor: theme.colors.componentNonInteractiveBorder,
  margin: `${theme.space.marginUnrelatedMajor} auto`,
  borderRadius: theme.radii[1],
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

const stringCurry = (group: string, translate: (string: string) => string) => (string: string) => `${translate(
  `prompts.settings.groups.${group}.${string}.title`,
)} ${translate(`prompts.settings.groups.${group}.${string}.description`)}`;

function InterfaceSettings({ search }: SubSettingsProps) {
  const { t, f, translate } = useTranslator();

  const createString = stringCurry('interface', translate);

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
              <OptionVertical key="theme">
                <Title>
                  <BlendingModeIcon />
                  {t`prompts.settings.groups.interface.theme.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.interface.theme.description`}
                </Description>
                <Select.Root
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      if (value === 'none') {
                        draft.interface.theme = null;
                      } else {
                        draft.interface.theme = value;
                      }
                    });
                  }}
                  defaultValue={
                    useSettings.getState().interface.theme ?? NULL_THEME_KEY
                  }
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item
                      value={NULL_THEME_KEY}
                      onClick={() => mutateSettings((draft) => {
                        draft.interface.theme = null;
                      })}
                      key={NULL_THEME_KEY}
                    >
                      {t`themes.theme_light`}
                    </Select.Item>

                    {Object.keys(THEMES).map((code) => {
                      const handleClick = () => {
                        mutateSettings((draft) => {
                          draft.interface.theme = code.toString();
                        });
                      };

                      return (
                        <Select.Item
                          value={code.toString()}
                          onClick={handleClick}
                          key={`theme-${code.toString()}`}
                        >
                          {translate(
                            `themes.${code.toString().split('-').join('_')}`,
                          )}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              </OptionVertical>
            ),
            string: createString('theme'),
          },

          {
            node: (
              <OptionVertical key="default-tab">
                <Title>
                  <HomeIcon />
                  {t`prompts.settings.groups.interface.default_tab.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.interface.default_tab.description`}
                </Description>
                <Select.Root
                  onValueChange={(value: keyof typeof TAB_MAP_INVERSE) => {
                    mutateSettings((draft) => {
                      draft.interface.defaultTab = TAB_MAP_INVERSE[value];
                    });
                  }}
                  defaultValue={
                    TAB_MAP[useSettings.getState().interface.defaultTab]
                  }
                >
                  <Select.Trigger />
                  <Select.Content>
                    {TAB_ORDER.map((tab) => (
                      <Select.Item value={TAB_MAP[tab]}>
                        {translate(`tabs.${TAB_MAP[tab]}`)}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </OptionVertical>
            ),
            string: createString('default_tab'),
          },

          {
            node: (
              <OptionVertical key="touchscreen-mode">
                <Title>
                  <MobileIcon />
                  {t`prompts.settings.groups.interface.touchscreen_mode.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.interface.touchscreen_mode.description`}
                </Description>
                <Select.Root
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      if (value === 'true') {
                        draft.interface.touchscreenMode = true;
                      } else if (value === 'false') {
                        draft.interface.touchscreenMode = false;
                      } else {
                        draft.interface.touchscreenMode = null;
                      }
                    });
                  }}
                  defaultValue={`${
                    useSettings.getState().interface.touchscreenMode
                  }`}
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="null">{t`prompts.settings.groups.interface.touchscreen_mode.options.auto`}</Select.Item>
                    <Select.Item value="true">{t`prompts.settings.groups.interface.touchscreen_mode.options.on`}</Select.Item>
                    <Select.Item value="false">{t`prompts.settings.groups.interface.touchscreen_mode.options.off`}</Select.Item>
                  </Select.Content>
                </Select.Root>
              </OptionVertical>
            ),
            string: createString('touchscreen_mode'),
          },

          {
            node: (
              <OptionVertical key="language">
                <Title>
                  <TextIcon />
                  {t`prompts.settings.groups.interface.language.title`}
                </Title>
                <Description>
                  {f`prompts.settings.groups.interface.language.description`[0]}
                  <Anchor
                    href="https://crowdin.com/project/stellareditor/"
                    target="_blank"
                  >
                    {
                      f`prompts.settings.groups.interface.language.description`[1]
                    }
                  </Anchor>
                  {f`prompts.settings.groups.interface.language.description`[2]}
                </Description>
                <Select.Root
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.language = value;
                    });
                  }}
                  defaultValue={useSettings.getState().interface.language}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {Object.keys(TRANSLATIONS).map((translation) => {
                      const code = translation;
                      const displayNames = new Intl.DisplayNames([code], {
                        type: 'language',
                      });
                      const displayName = FIXED_LANG_NAMES[code] ?? displayNames.of(code);

                      return (
                        <Select.Item value={code} key={`language-${code}`}>
                          {displayName}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              </OptionVertical>
            ),
            string: createString('language'),
          },
        ]}
      />
    </>
  );
}

function DebugSettings({ search }: SubSettingsProps) {
  const { t, translate } = useTranslator();

  const createString = stringCurry('debug', translate);

  return (
    <>
      <Section>
        <CodeIcon />
        {t`prompts.settings.groups.debug`}
      </Section>

      <Search
        input={search}
        list={[
          {
            node: (
              <OptionHorizontal key="error-screen-debug">
                <OptionVertical fill>
                  <Title>
                    <InfoCircledIcon />
                    {t`prompts.settings.groups.debug.error_screen_debug.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.debug.error_screen_debug.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultValue={
                    useSettings.getState().debug.errorScreen.showDebug
                  }
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      draft.debug.errorScreen.showDebug = value;
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('error_screen_debug'),
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
          <Separator />
          <DebugSettings search={search} />
        </OptionsWrapper>
      </Options>
    </Container>
  );
}
