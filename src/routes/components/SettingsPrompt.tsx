import {
  AccessibilityIcon,
  ArchiveIcon,
  BlendingModeIcon,
  CaretRightIcon,
  CodeIcon,
  CursorArrowIcon,
  DesktopIcon,
  FileIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import Button from 'components/Button';
import { InputWithIcon } from 'components/InputWithIcon';
import Search from 'components/Search';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator from 'hooks/useTranslator';
import { RefObject, useRef } from 'react';
import { styled, theme } from 'stitches.config';
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

function InterfaceSettings({ search }: SubSettingsProps) {
  const { t, translate } = useTranslator();
  const handleNoneClick = () => {
    mutateSettings((draft) => {
      draft.interface.theme = null;
    });
  };
  const initialThemeValue = useSettings.getState().interface.theme ?? NULL_THEME_KEY;
  const themes: JSX.Element[] = [
    <Select.Item value="none" onClick={handleNoneClick} key={NULL_THEME_KEY}>
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

  const handleValueChange = (value: string) => {
    mutateSettings((draft) => {
      if (value === 'none') {
        draft.interface.theme = null;
      } else {
        draft.interface.theme = value;
      }
    });
  };

  return (
    <>
      <Section>
        <DesktopIcon />
        Interface
      </Section>

      <Search
        input={search}
        list={[
          {
            node: (
              <Option>
                <Title>
                  <BlendingModeIcon />
                  Theme
                </Title>
                <Description>
                  Controls the color palette of the entire interface.
                </Description>
                <Select.Root
                  onValueChange={handleValueChange}
                  defaultValue={initialThemeValue}
                >
                  <Select.Trigger />
                  <Select.Content>{themes}</Select.Content>
                </Select.Root>
              </Option>
            ),
            string: 'Theme Controls the color palette of the entire interface.',
          },
        ]}
      />
    </>
  );
}

export default function SettingsPrompt() {
  const search = useRef<HTMLInputElement>(null);

  usePopupConcurrency();

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      <Navigation>
        <InputWithIcon
          ref={search}
          placeholder="Search settings..."
          icon={<MagnifyingGlassIcon />}
        />

        <NavigationButtons>
          <NavigationButton selected>
            <DesktopIcon />
            <NavigationButtonText>Interface</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <CursorArrowIcon />
            <NavigationButtonText>Editor</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <LightningBoltIcon />
            <NavigationButtonText>Performance</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <ArchiveIcon />
            <NavigationButtonText>Features</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <FileIcon />
            <NavigationButtonText>File Preferences</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <AccessibilityIcon />
            <NavigationButtonText>Accessibility</NavigationButtonText>
            <CaretRightIcon />
          </NavigationButton>
          <NavigationButton>
            <CodeIcon />
            <NavigationButtonText>Debug</NavigationButtonText>
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
