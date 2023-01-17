import * as Prompt from 'components/Prompt';
import dismissPrompt from 'core/interface/dismissPrompt';
import useTranslator from 'hooks/useTranslator';
import usePrompts from 'stores/prompts';

export type ConfirmationPromptCallback = (success: boolean) => void;

export interface ConfirmationPromptProps {
  callback: ConfirmationPromptCallback;
}

export default function ConfirmationPrompt({
  callback,
}: ConfirmationPromptProps) {
  const { t } = useTranslator();
  const { prompts } = usePrompts.getState();
  const dismiss = () => {
    dismissPrompt(prompts[prompts.length - 1].id);
  };

  return (
    <Prompt.Root>
      <Prompt.Info>
        <Prompt.Title>{t`prompts.confirmation.title`}</Prompt.Title>
        <Prompt.Description>{t`prompts.confirmation.description`}</Prompt.Description>
      </Prompt.Info>

      <Prompt.Actions>
        <Prompt.Action
          onClick={() => {
            callback(false);
            dismiss();
          }}
        >{t`prompts.confirmation.actions.cancel`}</Prompt.Action>
        <Prompt.Action
          color="danger"
          onClick={() => {
            callback(true);
            dismiss();
          }}
        >{t`prompts.confirmation.actions.yes`}</Prompt.Action>
      </Prompt.Actions>
    </Prompt.Root>
  );
}

export function confirmationPromptCurry(callback: ConfirmationPromptCallback) {
  return function CurrierConfirmationPrompt() {
    return <ConfirmationPrompt callback={callback} />;
  };
}
