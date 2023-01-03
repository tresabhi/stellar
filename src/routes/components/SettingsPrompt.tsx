import {
  BlendingModeIcon,
  CaretRightIcon,
  CodeIcon,
  CrumpledPaperIcon,
  CursorArrowIcon,
  DesktopIcon,
  DownloadIcon,
  HomeIcon,
  InfoCircledIcon,
  LightningBoltIcon,
  LinkBreak2Icon,
  MagnifyingGlassIcon,
  MobileIcon,
  RotateCounterClockwiseIcon,
  TextIcon,
  TransparencyGridIcon,
} from '@radix-ui/react-icons';
import Anchor from 'components/Anchor';
import Button from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import InputPrimitive from 'components/Input';
import { InputWithIcon } from 'components/InputWithIcon';
import Search from 'components/Search';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import { TAB_ORDER } from 'hooks/useKeybinds';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator, { TRANSLATIONS } from 'hooks/useTranslator';
import { clamp } from 'lodash';
import { RefObject, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/app';
import useSettings, { THEMES } from 'stores/settings';
import createInputEscape from 'utilities/createInputEscape';
import { FIXED_LANG_NAMES, NULL_THEME_KEY } from './WelcomePrompt';

interface SubSettingsProps {
  titleRef: RefObject<HTMLSpanElement>;
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
const Input = styled(InputPrimitive, {
  backgroundColor: theme.colors.componentBackground,
  padding: theme.space.paddingMinor,
  border: theme.borderStyles.componentInteractive,
  borderRadius: theme.radii[4],
  fontSize: theme.fontSizes[12],
  color: theme.colors.textHighContrast,
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

function InterfaceSettings({ search, titleRef }: SubSettingsProps) {
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
                <Title ref={titleRef}>
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

          {
            node: (
              <OptionHorizontal key="orientation-prompt">
                <OptionVertical fill>
                  <Title ref={titleRef}>
                    <RotateCounterClockwiseIcon />
                    {t`prompts.settings.groups.interface.orientation_prompt.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.interface.orientation_prompt.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultValue={
                    useSettings.getState().interface.showOrientationPrompt
                  }
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showOrientationPrompt = value;
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('orientation_prompt'),
          },

          {
            node: (
              <OptionHorizontal key="installation-prompt">
                <OptionVertical fill>
                  <Title ref={titleRef}>
                    <DownloadIcon />
                    {t`prompts.settings.groups.interface.installation_prompt.title`}
                  </Title>
                  <Description>
                    {
                      f`prompts.settings.groups.interface.installation_prompt.description`[0]
                    }
                    <Anchor
                      href="https://web.dev/progressive-web-apps/"
                      target="_blank"
                    >
                      {
                        f`prompts.settings.groups.interface.installation_prompt.description`[1]
                      }
                    </Anchor>
                    {
                      f`prompts.settings.groups.interface.installation_prompt.description`[2]
                    }
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultValue={
                    useSettings.getState().interface.showInstallationPrompt
                  }
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showInstallationPrompt = value;
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('installation_prompt'),
          },

          {
            node: (
              <OptionHorizontal key="instability-warning">
                <OptionVertical fill>
                  <Title ref={titleRef}>
                    <CrumpledPaperIcon />
                    {t`prompts.settings.groups.interface.instability_prompt.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.interface.instability_prompt.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultValue={
                    useSettings.getState().interface.showInstabilityWarning
                  }
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showInstabilityWarning = value;
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('instability_prompt'),
          },

          {
            node: (
              <OptionHorizontal key="missing-parts">
                <OptionVertical fill>
                  <Title ref={titleRef}>
                    <LinkBreak2Icon />
                    {t`prompts.settings.groups.interface.missing_parts.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.interface.missing_parts.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultValue={
                    useSettings.getState().interface.showMissingParts
                  }
                  onValueChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showMissingParts = value;
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('missing_parts'),
          },
        ]}
      />
    </>
  );
}

function PerformanceSettings({ search, titleRef }: SubSettingsProps) {
  const { t, translate } = useTranslator();

  const createString = stringCurry('performance', translate);

  return (
    <>
      <Section>
        <LightningBoltIcon />
        {t`prompts.settings.groups.performance`}
      </Section>

      <Search
        input={search}
        list={[
          {
            node: (
              <OptionVertical key="regress">
                <Title ref={titleRef}>
                  <TransparencyGridIcon />
                  {t`prompts.settings.groups.performance.regress.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.performance.regress.description`}
                </Description>
                <Input
                  type="number"
                  step={0.1}
                  min={0.1}
                  max={1}
                  defaultValue={
                    useSettings.getState().performance.regressAmount
                  }
                  onBlur={(event) => {
                    const clampedValue = clamp(
                      Number(event.target.value),
                      Number(event.target.min),
                      Number(event.target.max),
                    );
                    event.target.value = `${clampedValue}`;

                    mutateSettings((draft) => {
                      draft.performance.regressAmount = clampedValue;
                    });
                  }}
                  onKeyDown={createInputEscape()}
                />
              </OptionVertical>
            ),
            string: createString('regress'),
          },
        ]}
      />
    </>
  );
}

function EditorSettings({ search, titleRef }: SubSettingsProps) {
  const { t, translate } = useTranslator();

  const createString = stringCurry('editor', translate);

  return (
    <>
      <Section>
        <CursorArrowIcon />
        {t`prompts.settings.groups.editor`}
      </Section>

      <Search
        input={search}
        list={[
          {
            node: (
              <OptionVertical>
                <Title ref={titleRef}>
                  <InfoCircledIcon />
                  {t`prompts.settings.groups.editor.undo_limit.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.editor.undo_limit.description`}
                </Description>

                <Input
                  type="number"
                  step={1}
                  min={16}
                  max={4096}
                  defaultValue={useSettings.getState().editor.undoLimit}
                  onBlur={(event) => {
                    const clampedValue = clamp(
                      Math.round(Number(event.target.value)),
                      Number(event.target.min),
                      Number(event.target.max),
                    );
                    event.target.value = `${clampedValue}`;

                    mutateSettings((draft) => {
                      draft.editor.undoLimit = clampedValue;
                    });
                  }}
                  onKeyDown={createInputEscape()}
                />
              </OptionVertical>
            ),
            string: createString('undo_limit'),
          },
        ]}
      />
    </>
  );
}

function DebugSettings({ search, titleRef }: SubSettingsProps) {
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
                  <Title ref={titleRef}>
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
  const options = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const interfaceTitle = useRef<HTMLSpanElement>(null);
  const editor = useRef<HTMLSpanElement>(null);
  const performance = useRef<HTMLSpanElement>(null);
  const debug = useRef<HTMLSpanElement>(null);

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
          <NavigationButton
            onClick={() => interfaceTitle.current?.scrollIntoView({
              block: 'center',
            })}
          >
            <DesktopIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.interface`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton onClick={() => editor.current?.scrollIntoView()}>
            <CursorArrowIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.editor`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton
            onClick={() => performance.current?.scrollIntoView()}
          >
            <LightningBoltIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.performance`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton onClick={() => debug.current?.scrollIntoView()}>
            <CodeIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.debug`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
        </NavigationButtons>
      </Navigation>

      <Options ref={options}>
        <OptionsWrapper>
          <InterfaceSettings titleRef={interfaceTitle} search={search} />
          <Separator />
          <EditorSettings titleRef={editor} search={search} />
          <Separator />
          <PerformanceSettings titleRef={performance} search={search} />
          <Separator />
          <DebugSettings titleRef={debug} search={search} />
        </OptionsWrapper>
      </Options>
    </Container>
  );
}
