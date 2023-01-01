import Anchor from 'components/Anchor';
import * as Prompt from 'components/Prompt';
import * as Select from 'components/Select';
import mutateSettings from 'core/app/mutateSettings';
import prompt from 'core/interface/prompt';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator, { TRANSLATIONS } from 'hooks/useTranslator';
import { ReactNode, useState } from 'react';
import { PromptProps } from 'stores/prompts';
import useSettings, { THEMES } from 'stores/settings';
import InstabilityWarningPrompt from './InstabilityWarningPrompt';

export const FIXED_LANG_NAMES: Record<string, string> = {
  'en-PT': 'English (Pirate)',
  'en-UD': '(uʍop-ǝpᴉsd∩) ɥsᴉlƃuƎ',
  'ol-US': 'LOLCAT',
};

function Slide1() {
  const { t, f } = useTranslator();
  const languages: ReactNode[] = [];

  Object.keys(TRANSLATIONS).forEach((translation) => {
    const code = translation;
    const displayNames = new Intl.DisplayNames([code], { type: 'language' });
    const displayName = FIXED_LANG_NAMES[code] ?? displayNames.of(code);

    languages.push(
      <Select.Item value={code} key={`language-${code}`}>
        {displayName}
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
        <Prompt.Title>{t`prompts.welcome.slides.1.title`}</Prompt.Title>
        <Prompt.Description>
          {f`prompts.welcome.slides.1.description`[0]}
          <Anchor
            href="https://crowdin.com/project/stellareditor/"
            target="_blank"
          >
            {f`prompts.welcome.slides.1.description`[1]}
          </Anchor>
          {f`prompts.welcome.slides.1.description`[2]}
        </Prompt.Description>
      </Prompt.Info>

      <Select.Root key="1" onValueChange={handleValueChange}>
        <Select.Trigger placeholder={t`prompts.welcome.slides.1.select`} />
        <Select.Content>{languages}</Select.Content>
      </Select.Root>
    </>
  );
}

export const NULL_THEME_KEY = 'theme-none';
function Slide2() {
  const { t, translate } = useTranslator();
  const handleNoneClick = () => {
    mutateSettings((draft) => {
      draft.interface.theme = null;
    });
  };
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
      <Prompt.Info>
        <Prompt.Title>{t`prompts.welcome.slides.2.title`}</Prompt.Title>
        <Prompt.Description>
          {t`prompts.welcome.slides.2.description`}
        </Prompt.Description>
      </Prompt.Info>

      <Select.Root key="2" onValueChange={handleValueChange}>
        <Select.Trigger placeholder={t`prompts.welcome.slides.2.select`} />
        <Select.Content>{themes}</Select.Content>
      </Select.Root>
    </>
  );
}

export default function WelcomePrompt({ dismiss }: PromptProps) {
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

    if (useSettings.getState().interface.showInstabilityWarning) {
      prompt(InstabilityWarningPrompt, false, undefined, true);
    }
  };

  usePopupConcurrency();

  return (
    <Prompt.Root>
      {slides[index]()}

      <Prompt.Actions>
        {index > 0 && (
          <Prompt.Action onClick={handleBackClick}>
            {t`prompts.welcome.actions.back`}
          </Prompt.Action>
        )}
        <Prompt.Action
          color="accent"
          onClick={lastSlide ? handleFinishClick : handleNextClick}
        >
          {lastSlide
            ? t`prompts.welcome.actions.finish`
            : t`prompts.welcome.actions.next`}
        </Prompt.Action>
      </Prompt.Actions>
    </Prompt.Root>
  );
}
