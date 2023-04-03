import Anchor from 'components/Anchor';
import * as Prompt from 'components/Prompt';
import mutateSettings from 'core/app/mutateSettings';
import useTranslator from 'hooks/useTranslator';
import { PromptProps } from 'stores/prompts';
import getContext from 'utilities/getContext';

export default function InstabilityWarningPrompt({ dismiss }: PromptProps) {
  const { t, f } = useTranslator();
  const { title } = getContext();

  const handleNeverClick = () => {
    mutateSettings((draft) => {
      draft.interface.showInstabilityWarning = false;
    });
    dismiss();
  };

  return (
    <Prompt.Root>
      <Prompt.Info>
        <Prompt.Title>{t`prompts.unstable.title`}</Prompt.Title>
        <Prompt.Description>
          {f`prompts.unstable.description`[0]}
          {title}
          {f`prompts.unstable.description`[1]}
          <Anchor href="https://stellarbeta.web.app/" target="_blank">
            {f`prompts.unstable.description`[2]}
          </Anchor>
          {f`prompts.unstable.description`[3]}
        </Prompt.Description>
      </Prompt.Info>

      <Prompt.Actions>
        <Prompt.Action onClick={handleNeverClick}>
          {t`prompts.unstable.actions.never`}
        </Prompt.Action>
        <Prompt.Action onClick={dismiss}>
          {t`prompts.unstable.actions.dismiss`}
        </Prompt.Action>
        <Prompt.Action
          color="accent"
          onClick={() => window.open('https://stellarbeta.web.app/')}
        >
          {t`prompts.unstable.actions.beta`}
        </Prompt.Action>
      </Prompt.Actions>
    </Prompt.Root>
  );
}
