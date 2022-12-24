import Anchor from 'components/Anchor';
import * as Prompt from 'components/Prompt';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator, { TRANSLATIONS } from 'hooks/useTranslator';
import { ReactNode, useState } from 'react';
import { styled, theme } from 'stitches.config';
import { PromptProps } from 'stores/prompts';
import { THEMES } from 'stores/settings';

const fixedLangNames: Record<string, string> = {
  'en-PT': 'English (Pirate)',
};

const Mono = styled('span', {
  fontFamily: theme.fonts.mono,
  color: theme.colors.textLowContrast,
  position: 'absolute',
  right: theme.space.paddingMinor,

  [`${Select.Trigger} &`]: {
    display: 'none',
  },
});

function Slide1() {
  const { t, f } = useTranslator();
  const languages: ReactNode[] = [];

  Object.keys(TRANSLATIONS).forEach((translation) => {
    const code = translation;
    const displayNames = new Intl.DisplayNames([code], { type: 'language' });
    const displayName = fixedLangNames[code] ?? displayNames.of(code);

    languages.push(
      <Select.Item value={code} key={`language-${code}`}>
        {displayName}
        <Mono>
          [
          {code}
          ]
        </Mono>
      </Select.Item>,
    );
  });

  const handleValueChange = (value: string) => {
    mutateSettings((draft) => {
      draft.interface.language = value;
    });
  };

  return (
    <>
      <Prompt.Info>
        <Prompt.Title>{t`popups.welcome.slides.1.title`}</Prompt.Title>
        <Prompt.Description>
          {f`popups.welcome.slides.1.description`[0]}
          <Anchor
            href="https://crowdin.com/project/stellareditor/"
            target="_blank"
          >
            {f`popups.welcome.slides.1.description`[1]}
          </Anchor>
          {f`popups.welcome.slides.1.description`[2]}
        </Prompt.Description>
      </Prompt.Info>

      <Select.Root key="1" onValueChange={handleValueChange}>
        <Select.Trigger placeholder={t`popups.welcome.slides.1.select`} />
        <Select.Content>{languages}</Select.Content>
      </Select.Root>
    </>
  );
}

function Slide2() {
  const { t, translate } = useTranslator();
  const handleNoneClick = () => {
    mutateSettings((draft) => {
      draft.interface.theme = null;
    });
  };
  const themes: JSX.Element[] = [
    <Select.Item value="none" onClick={handleNoneClick} key="theme-none">
      {t`themes.stellar_light`}
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
      <Prompt.Info>
        <Prompt.Title>{t`popups.welcome.slides.2.title`}</Prompt.Title>
        <Prompt.Description>
          {t`popups.welcome.slides.2.description`}
        </Prompt.Description>
      </Prompt.Info>

      <Select.Root key="2" onValueChange={handleValueChange}>
        <Select.Trigger placeholder={t`popups.welcome.slides.2.select`} />
        <Select.Content>{themes}</Select.Content>
      </Select.Root>
    </>
  );
}

export default function WelcomePopup({ dismiss }: PromptProps) {
  const { t } = useTranslator();
  const [index, setIndex] = useState(0);
  const slides = [Slide1, Slide2];
  const lastSlide = index === slides.length - 1;

  const handleBackClick = () => {
    setIndex((state) => state - 1);
  };
  const handleNextClick = () => setIndex((state) => state + 1);
  const handleFinishClick = () => {
    mutateSettings((draft) => {
      draft.interface.welcomePromptCompleted = true;
    });
    dismiss();
  };

  usePopupConcurrency();

  return (
    <Prompt.Root>
      <Prompt.Content>
        {slides[index]()}

        <Prompt.Actions>
          {index > 0 && (
            <Prompt.Action onClick={handleBackClick}>
              {t`popups.welcome.actions.back`}
            </Prompt.Action>
          )}
          <Prompt.Action
            color="accent"
            onClick={lastSlide ? handleFinishClick : handleNextClick}
          >
            {lastSlide
              ? t`popups.welcome.actions.finish`
              : t`popups.welcome.actions.next`}
          </Prompt.Action>
        </Prompt.Actions>
      </Prompt.Content>
    </Prompt.Root>
  );
}
