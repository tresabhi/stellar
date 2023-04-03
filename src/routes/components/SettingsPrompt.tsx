import {
  BlendingModeIcon,
  CaretRightIcon,
  CodeIcon,
  CrumpledPaperIcon,
  CursorArrowIcon,
  DesktopIcon,
  DownloadIcon,
  FileIcon,
  HomeIcon,
  InfoCircledIcon,
  InputIcon,
  LinkBreak2Icon,
  MagnifyingGlassIcon,
  MobileIcon,
  RotateCounterClockwiseIcon,
  SewingPinFilledIcon,
  TextAlignRightIcon,
  TextIcon,
} from '@radix-ui/react-icons';
import Anchor from 'components/Anchor';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import InputPrimitive from 'components/Input';
import InputWithIcon from 'components/InputWithIcon';
import Search from 'components/Search';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import prompt from 'core/interface/prompt';
import { TAB_ORDER } from 'hooks/useKeybinds';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator, { TRANSLATIONS } from 'hooks/useTranslator';
import { clamp } from 'lodash';
import { RefObject, useEffect, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import { Tab } from 'stores/app';
import { PromptProps } from 'stores/prompts';
import useSettings, { THEMES, useSettingsData } from 'stores/settings';
import createInputEscape from 'utilities/createInputEscape';
import { confirmationPromptCurry } from './ConfirmationPrompt';
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
  borderRadius: theme.radii.regular,
  overflow: 'hidden',
});
const Navigation = styled('div', {
  width: theme.sizes.settingsNavigationWidth,
  backgroundColor: theme.colors.appBackground2,
  borderRight: theme.borderStyles.nonInteractive,
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
  display: 'flex',
  padding: theme.space.paddingRegular,
  gap: theme.space.gapRelatedMajor,
  borderRadius: theme.radii.regular,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: theme.fontSizes[14],

  '& svg': {
    width: theme.sizes[12],
    height: theme.sizes[12],
    color: theme.colors.textHighContrast,
  },

  variants: {
    selected: {
      true: {
        backgroundColor: theme.colors.componentInteractiveHover,
      },
    },

    transparent: { true: {} },
  },

  defaultVariants: {
    transparent: true,
  },
});
const ResetToDefault = styled(Button, {
  padding: theme.space.paddingRegular,
  borderRadius: theme.radii.regular,
  fontSize: theme.fontSizes[12],

  defaultVariants: {
    border: true,
    color: 'danger',
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
export const SectionTitle = styled('span', {
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
export const OptionVertical = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapRelatedRegular,

  variants: {
    fill: {
      true: {
        flex: 1,
      },
    },
  },
});
export const OptionHorizontal = styled('div', {
  gap: theme.space.gapRelatedMajor,
  display: 'flex',
  alignItems: 'center',
});
export const Title = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[14],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  gap: theme.space.gapRelatedRegular,

  '& svg': { width: '1em', height: '1em' },
});
export const Description = styled('span', {
  fontSize: theme.fontSizes[12],
  color: theme.colors.textLowContrast,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  gap: theme.space.gapRelatedRegular,

  '& svg': { width: '1em', height: '1em' },
});
const Separator = styled('div', {
  height: theme.sizes[1],
  width: '75%',
  backgroundColor: theme.colors.borderNonInteractive,
  margin: `${theme.space.marginUnrelatedMajor} auto`,
  borderRadius: theme.radii.sharper,
});
export const Input = styled(InputPrimitive, {
  backgroundColor: theme.colors.componentInteractive,
  padding: theme.space.paddingMinor,
  border: theme.borderStyles.interactive,
  borderRadius: theme.radii.regular,
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

const stringCurry =
  (group: string, translate: (string: string) => string) => (string: string) =>
    `${translate(
      `prompts.settings.groups.${group}.${string}.title`,
    )} ${translate(`prompts.settings.groups.${group}.${string}.description`)}`;

function InterfaceSettings({ search, titleRef }: SubSettingsProps) {
  const { t, f, translate } = useTranslator();
  const createString = stringCurry('interface', translate);

  return (
    <>
      <SectionTitle ref={titleRef}>
        <DesktopIcon />
        {t`prompts.settings.groups.interface`}
      </SectionTitle>

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
                      onClick={() =>
                        mutateSettings((draft) => {
                          draft.interface.theme = null;
                        })
                      }
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
                      <Select.Item key={`tab-${tab}`} value={TAB_MAP[tab]}>
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
                      const displayName =
                        FIXED_LANG_NAMES[code] ?? displayNames.of(code);

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
                  <Title>
                    <RotateCounterClockwiseIcon />
                    {t`prompts.settings.groups.interface.orientation_prompt.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.interface.orientation_prompt.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultChecked={
                    useSettings.getState().interface.showOrientationPrompt
                  }
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showOrientationPrompt = Boolean(value);
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
                  <Title>
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
                  defaultChecked={
                    useSettings.getState().interface.showInstallationPrompt
                  }
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showInstallationPrompt = Boolean(value);
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
                  <Title>
                    <CrumpledPaperIcon />
                    {t`prompts.settings.groups.interface.instability_prompt.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.interface.instability_prompt.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultChecked={
                    useSettings.getState().interface.showInstabilityWarning
                  }
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showInstabilityWarning = Boolean(value);
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
                  <Title>
                    <LinkBreak2Icon />
                    {t`prompts.settings.groups.interface.missing_parts.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.interface.missing_parts.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultChecked={
                    useSettings.getState().interface.showMissingParts
                  }
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.interface.showMissingParts = Boolean(value);
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

function EditorSettings({ search, titleRef }: SubSettingsProps) {
  const { t, translate } = useTranslator();
  const createString = stringCurry('editor', translate);

  return (
    <>
      <SectionTitle ref={titleRef}>
        <CursorArrowIcon />
        {t`prompts.settings.groups.editor`}
      </SectionTitle>

      <Search
        input={search}
        list={[
          {
            node: (
              <OptionVertical key="undo-limit">
                <Title>
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

function FileSettings({ search, titleRef }: SubSettingsProps) {
  const { t, translate } = useTranslator();
  const createString = stringCurry('file', translate);

  return (
    <>
      <SectionTitle ref={titleRef}>
        <FileIcon />
        {t`prompts.settings.groups.file`}
      </SectionTitle>

      <Search
        input={search}
        list={[
          {
            node: (
              <OptionHorizontal key="format">
                <OptionVertical fill>
                  <Title>
                    <TextAlignRightIcon />
                    {t`prompts.settings.groups.file.format.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.file.format.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultChecked={useSettings.getState().file.format}
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.file.format = Boolean(value);
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('format'),
          },

          {
            node: (
              <OptionHorizontal key="watermark">
                <OptionVertical fill>
                  <Title>
                    <SewingPinFilledIcon />
                    {t`prompts.settings.groups.file.watermark.title`}
                  </Title>
                  <Description>
                    {t`prompts.settings.groups.file.watermark.description`}
                  </Description>
                </OptionVertical>

                <Checkbox
                  defaultChecked={useSettings.getState().file.watermark}
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.file.watermark = Boolean(value);
                    });
                  }}
                />
              </OptionHorizontal>
            ),
            string: createString('watermark'),
          },

          {
            node: (
              <OptionVertical key="default-name">
                <Title>
                  <InputIcon />
                  {t`prompts.settings.groups.file.default_name.title`}
                </Title>
                <Description>
                  {t`prompts.settings.groups.file.default_name.description`}
                </Description>

                <Input
                  defaultValue={useSettings.getState().file.defaultName}
                  onBlur={(event) => {
                    mutateSettings((draft) => {
                      draft.file.defaultName = event.target.value;
                    });
                  }}
                  onKeyDown={createInputEscape()}
                />
              </OptionVertical>
            ),
            string: createString('default_name'),
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
      <SectionTitle ref={titleRef}>
        <CodeIcon />
        {t`prompts.settings.groups.debug`}
      </SectionTitle>

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
                  defaultChecked={
                    useSettings.getState().debug.errorScreen.showDebug
                  }
                  onCheckedChange={(value) => {
                    mutateSettings((draft) => {
                      draft.debug.errorScreen.showDebug = Boolean(value);
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

export default function SettingsPrompt({ dismiss }: PromptProps) {
  const { t } = useTranslator();
  const options = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const interfaceTitle = useRef<HTMLSpanElement>(null);
  const editor = useRef<HTMLSpanElement>(null);
  const file = useRef<HTMLSpanElement>(null);
  const debug = useRef<HTMLSpanElement>(null);

  usePopupConcurrency();
  useEffect(() => search.current?.focus());

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
            onClick={() => {
              if (options.current) {
                options.current.scrollTop = 0;
              }
            }}
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
          <NavigationButton onClick={() => file.current?.scrollIntoView()}>
            <FileIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.file`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton onClick={() => debug.current?.scrollIntoView()}>
            <CodeIcon />
            <NavigationButtonText>{t`prompts.settings.navigation.debug`}</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
        </NavigationButtons>

        <ResetToDefault
          color="danger"
          transparent={false}
          border
          onClick={() =>
            prompt(
              confirmationPromptCurry((success) => {
                if (success) useSettings.setState(useSettingsData);
                dismiss();
              }),
              true,
              undefined,
              true,
            )
          }
        >
          {t`prompts.settings.navigation.reset`}
        </ResetToDefault>
      </Navigation>

      <Options ref={options}>
        <OptionsWrapper>
          <InterfaceSettings titleRef={interfaceTitle} search={search} />
          <Separator />
          <EditorSettings titleRef={editor} search={search} />
          <Separator />
          <FileSettings titleRef={file} search={search} />
          <Separator />
          <DebugSettings titleRef={debug} search={search} />
        </OptionsWrapper>
      </Options>
    </Container>
  );
}
