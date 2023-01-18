import { MobileIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';
import Button from 'components/Button';
import mutateApp from 'core/app/mutateApp';
import mutateSettings from 'core/app/mutateSettings';
import { Orientation, useOrientation } from 'hooks/useOrientation';
import useTranslator from 'hooks/useTranslator';
import { HTMLAttributes, ReactNode } from 'react';
import { styled, theme } from 'stitches.config';
import useApp from 'stores/app';
import useSettings from 'stores/settings';

export interface LandscapePromptProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  position: 'absolute',
  top: 0,
  left: 0,
  backgroundColor: theme.colors.appBackground2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space.gapUnrelatedMajor,
});

const IconsContainer = styled('div', {
  display: 'flex',
  gap: theme.space.gapUnrelatedMajor,

  '& > svg': {
    color: theme.colors.textLowContrast,
    width: theme.sizes[32],
    height: theme.sizes[32],
  },
});

const Message = styled('span', {
  color: theme.colors.textHighContrast,
  fontSize: theme.fontSizes[16],
  textAlign: 'center',
});

const Actions = styled('div', {
  display: 'flex',
  gap: theme.space.gapRelatedMajor,
});

const Action = styled(Button, {
  padding: theme.space.padding,
  borderRadius: theme.radii[4],
  fontSize: theme.fontSizes[14],

  defaultVariants: {
    border: true,
  },
});

export default function LandscapePrompt({
  children,
  ...props
}: LandscapePromptProps) {
  const { f, t } = useTranslator();
  const orientation = useOrientation();
  const orientationPromptDismissed = useApp(
    (state) => state.interface.orientationPromptDismissed,
  );
  const showOrientationPrompt = useSettings(
    (state) => state.interface.showOrientationPrompt,
  );
  const showChildren =
    !showOrientationPrompt ||
    orientationPromptDismissed ||
    orientation === Orientation.Landscape;

  const handleNeverClick = () => {
    mutateSettings((draft) => {
      draft.interface.showOrientationPrompt = false;
    });
  };
  const handleDismissClick = () => {
    mutateApp((draft) => {
      draft.interface.orientationPromptDismissed = true;
    });
  };

  return showChildren ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
    <Container {...props}>
      <IconsContainer>
        <MobileIcon />
        <ThickArrowRightIcon />
        <MobileIcon style={{ transform: 'rotate(-90deg)' }} />
      </IconsContainer>
      <Message>
        {f`landscape_prompt.message`[0]}
        <br />
        {f`landscape_prompt.message`[1]}
      </Message>
      <Actions>
        <Action onClick={handleNeverClick}>{t`landscape_prompt.never`}</Action>
        <Action onClick={handleDismissClick}>
          {t`landscape_prompt.dismiss`}
        </Action>
      </Actions>
    </Container>
  );
}
