import { Pencil1Icon } from '@radix-ui/react-icons';
import CheckboxWithLabel from 'components/CheckboxWithLabel';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Prompt from 'components/Prompt';
import mutateSettings from 'core/app/mutateSettings';
import { RenamePartsOptions } from 'core/part/rename';
import renameSelected from 'core/part/renameSelected';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator from 'hooks/useTranslator';
import { KeyboardEvent, useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { PromptProps } from 'stores/prompts';
import useSettings from 'stores/settings';

export default function RenamePartsPrompt({ dismiss }: PromptProps) {
  const { t } = useTranslator();
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null);
  const { selections, parts } = useBlueprint.getState();
  let defaultLabel = parts[selections[0]].label;

  selections.some((selection) => {
    if (parts[selection].label !== defaultLabel) {
      defaultLabel = '';
      return true;
    }

    return false;
  });

  const apply = () => {
    if (input.current) {
      renameSelected(input.current.value, useSettings.getState().editor.rename);
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

  useEffect(() => input.current?.select());

  return (
    <Prompt.Root padding="thin">
      <InputWithIcon
        ref={input}
        onKeyDown={handleKeyDown}
        autoFocus
        icon={<Pencil1Icon />}
        placeholder={t`tabs.layout.popup.rename.input_placeholder`}
        defaultValue={defaultLabel}
      />

      <CheckboxWithLabel
        defaultValue={rename.trim}
        onValueChange={handleClick('trim')}
      >
        {t`tabs.layout.popup.rename.trim`}
      </CheckboxWithLabel>
      <CheckboxWithLabel
        defaultValue={rename.skipLocked}
        onValueChange={handleClick('skipLocked')}
      >
        {t`tabs.layout.popup.rename.skip_locked`}
      </CheckboxWithLabel>
      <CheckboxWithLabel
        defaultValue={rename.suffix}
        onValueChange={handleClick('suffix')}
      >
        {t`tabs.layout.popup.rename.suffix`}
      </CheckboxWithLabel>

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
