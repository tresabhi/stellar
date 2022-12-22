import { Anchor } from 'components/Anchor';
import * as Popup from 'components/Popup';
import * as Select from 'components/Select';
import { mutateSettings } from 'core/app';
import { dismissPopup } from 'core/interface';
import { usePopupConcurrency } from 'hooks/usePopupConcurrency';
import { TRANSLATIONS, useTranslator } from 'hooks/useTranslator';
import { FC, ReactNode, useState } from 'react';
import { styled, theme } from 'stitches.config';
import { PopupProps } from 'stores/popups';
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

  for (const translation in TRANSLATIONS) {
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
  }

  const handleValueChange = (value: string) => {
    mutateSettings((draft) => {
      draft.interface.language = value;
    });
  };

  return (
    <>
      <Popup.Info>
        <Popup.Title>{t`popups.welcome.slides.1.title`}</Popup.Title>
        <Popup.Description>
          {f`popups.welcome.slides.1.description`[0]}
          <Anchor
            href="https://crowdin.com/project/stellareditor/"
            target="_blank"
          >
            {f`popups.welcome.slides.1.description`[1]}
          </Anchor>
          {f`popups.welcome.slides.1.description`[2]}
        </Popup.Description>
      </Popup.Info>

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
      <Popup.Info>
        <Popup.Title>{t`popups.welcome.slides.2.title`}</Popup.Title>
        <Popup.Description>
          {t`popups.welcome.slides.2.description`}
        </Popup.Description>
      </Popup.Info>

      <Select.Root key="2" onValueChange={handleValueChange}>
        <Select.Trigger placeholder={t`popups.welcome.slides.2.select`} />
        <Select.Content>{themes}</Select.Content>
      </Select.Root>
    </>
  );
}

export const WelcomePopup: FC<PopupProps> = ({ id }) => {
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
    dismissPopup(id);
  };

  usePopupConcurrency();

  return (
    <Popup.Container>
      <Popup.Content>
        {slides[index]()}

        <Popup.Actions>
          {index > 0 && (
            <Popup.Action onClick={handleBackClick}>
              {t`popups.welcome.actions.back`}
            </Popup.Action>
          )}
          <Popup.Action
            color="accent"
            onClick={lastSlide ? handleFinishClick : handleNextClick}
          >
            {lastSlide
              ? t`popups.welcome.actions.finish`
              : t`popups.welcome.actions.next`}
          </Popup.Action>
        </Popup.Actions>
      </Popup.Content>
    </Popup.Container>
  );
};
