import { Pencil1Icon } from '@radix-ui/react-icons';
import CheckboxWithLabel from 'components/CheckboxWithLabel';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Prompt from 'components/Prompt';
import mutateSettings from 'core/app/mutateSettings';
import { RenamePartsOptions } from 'core/part/renameParts';
import renamePartsBySelection from 'core/part/renamePartsBySelection';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator from 'hooks/useTranslator';
import { KeyboardEvent, useRef } from 'react';
import { PromptProps } from 'stores/prompts';
import useSettings from 'stores/settings';

export default function RenamePartsPopup({ dismiss }: PromptProps) {
  const { t } = useTranslator();
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null);
  const apply = () => {
    if (input.current) {
      renamePartsBySelection(
        input.current.value,
        useSettings.getState().editor.rename,
      );
    }
    dismiss();
  };
  const handleClick = (type: keyof RenamePartsOptions) => () => {
    mutateSettings((draft) => {
      draft.editor.rename[type] = !draft.editor.rename[type];
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      apply();
    } else if (event.key === 'Escape') {
      dismiss();
    }
  };
  const handleCancelClick = () => dismiss();
  const handleApplyClick = apply;

  usePopupConcurrency();

  return (
    <Prompt.Root>
      <InputWithIcon
        ref={input}
        onKeyDown={handleKeyDown}
        autoFocus
        icon={<Pencil1Icon />}
        placeholder={t`tabs.layout.popup.rename.input_placeholder`}
      />

      <Prompt.Content>
        <CheckboxWithLabel
          defaultValue={rename.trim}
          onChange={handleClick('trim')}
        >
          {t`tabs.layout.popup.rename.trim`}
        </CheckboxWithLabel>
        <CheckboxWithLabel
          defaultValue={rename.skipLocked}
          onChange={handleClick('skipLocked')}
        >
          {t`tabs.layout.popup.rename.skip_locked`}
        </CheckboxWithLabel>
        <CheckboxWithLabel
          defaultValue={rename.suffix}
          onChange={handleClick('suffix')}
        >
          {t`tabs.layout.popup.rename.suffix`}
        </CheckboxWithLabel>
      </Prompt.Content>

      <Prompt.Actions>
        <Prompt.Action onClick={handleCancelClick}>
          {t`tabs.layout.popup.rename.cancel`}
        </Prompt.Action>
        <Prompt.Action
          onClick={handleApplyClick}
          priority="callToAction"
          color="accent"
        >
          {t`tabs.layout.popup.rename.apply`}
        </Prompt.Action>
      </Prompt.Actions>
    </Prompt.Root>
  );
}
