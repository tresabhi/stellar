import {
  DownloadIcon,
  ExitIcon,
  MixerHorizontalIcon,
  RocketIcon,
  SewingPinFilledIcon,
  TextAlignRightIcon,
} from '@radix-ui/react-icons';
import Checkbox from 'components/Checkbox';
import mutateSettings from 'core/app/mutateSettings';
import exportFile from 'core/blueprint/exportFile';
import saveFileAs from 'core/blueprint/saveFileAs';
import useTranslator from 'hooks/useTranslator';
import {
  Description,
  OptionHorizontal,
  OptionVertical,
  SectionTitle,
  Title,
} from 'routes/components/SettingsPrompt';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/settings';
import {
  Actions,
  Button,
  Container,
  SectionContainer,
  Separator,
} from '../CreateTab';
import TabContainer from '../TabContainer';

const OptionsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelatedMajor,
});

const Options = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space.gapUnrelatedRegular,
});

export default function ExportTab() {
  const { t } = useTranslator();

  return (
    <TabContainer>
      <Container>
        <SectionContainer full>
          <OptionsWrapper>
            <SectionTitle>
              <MixerHorizontalIcon /> {t`tabs.export.options`}
            </SectionTitle>

            <Options>
              <OptionHorizontal>
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
            </Options>

            <SectionContainer>
              <Separator horizontal />
            </SectionContainer>

            <SectionTitle>
              <RocketIcon /> {t`tabs.export.export`}
            </SectionTitle>

            <Actions horizontal>
              <Button priority="solid" onClick={() => exportFile()}>
                <ExitIcon />
                {t`tabs.export.export.game`}
              </Button>
              <Button onClick={() => saveFileAs()}>
                <DownloadIcon />
                {t`tabs.export.export.stellar`}
              </Button>
            </Actions>
          </OptionsWrapper>
        </SectionContainer>
      </Container>
    </TabContainer>
  );
}
