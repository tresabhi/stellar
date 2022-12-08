import { Anchor } from 'components/Anchor';
import * as Popup from 'components/Popup';
import * as Select from 'components/Select';
import { mutateApp, mutateSettings } from 'core/app';
import { dismissPopup } from 'core/interface';
import { usePopupConcurrency } from 'hooks/usePopupConcurrency';
import { TRANSLATIONS, useTranslator } from 'hooks/useTranslator';
import { FC, ReactNode, useState } from 'react';
import { styled, theme } from 'stitches.config';
import { PopupProps } from 'stores/popups';

const fixedLangNames: Record<string, string> = {
  'en-PT': 'English (Pirate)',
};

const Mono = styled('span', {
  fontFamily: theme.fonts.mono,
});

const Slide1 = () => {
  const { t, f } = useTranslator();
  const languages: ReactNode[] = [];

  for (const translation in TRANSLATIONS) {
    const code = translation;
    const displayNames = new Intl.DisplayNames([code], { type: 'language' });
    const displayName = fixedLangNames[code] ?? displayNames.of(code);

    languages.push(
      <Select.Item value={code} key={`language-${code}`}>
        <Mono>[{code}]</Mono> {displayName}
      </Select.Item>,
    );
  }

  const handleValueChange = (value: string) => {
    mutateSettings((draft) => {
      draft.interface.language = value;
    });
  };

  return (
    <>
      <Popup.Info>
        <Popup.Title>{t`popups.welcome_slide_1.title`}</Popup.Title>
        <Popup.Description>
          {f`popups.welcome_slide_1.description`[0]}
          <Anchor
            href="https://crowdin.com/project/stellareditor/"
            target="_blank"
          >
            {f`popups.welcome_slide_1.description`[1]}
          </Anchor>
          {f`popups.welcome_slide_1.description`[2]}
        </Popup.Description>
      </Popup.Info>

      <Select.Root onValueChange={handleValueChange}>
        <Select.Trigger placeholder={t`popups.welcome_slide_1.select`} />

        <Select.Portal>
          <Select.Content>
            <Select.Viewport>{languages}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </>
  );
};

export const WelcomePopup: FC<PopupProps> = ({ id }) => {
  const [index, setIndex] = useState(0);
  const slides = [Slide1];
  const lastSlide = index === slides.length - 1;

  const handleDismissClick = () => {
    mutateApp((draft) => {
      draft.interface.welcomePopupDismissed = true;
    });
    dismissPopup(id);
  };
  const handleNextClick = () => setIndex((state) => state + 1);
  const handleFinishClick = () => {
    mutateSettings((draft) => {
      draft.interface.welcomePromptCompleted = true;
    });
    dismissPopup(id);
  };

  usePopupConcurrency();

  return (
    <Popup.Container>
      <Popup.Content>
        {slides[index]()}

        <Popup.Actions>
          <Popup.Action onClick={handleDismissClick}>Dismiss</Popup.Action>
          <Popup.Action
            color="accent"
            onClick={lastSlide ? handleFinishClick : handleNextClick}
          >
            {lastSlide ? 'Finish' : 'Next'}
          </Popup.Action>
        </Popup.Actions>
      </Popup.Content>
    </Popup.Container>
  );
};
