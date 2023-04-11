import { Pencil1Icon } from '@radix-ui/react-icons';
// import CheckboxWithLabel from 'components/CheckboxWithLabel';
import Checkbox, { CheckboxProps } from 'components/Checkbox';
import InputWithIcon from 'components/InputWithIcon';
import * as Prompt from 'components/Prompt';
import { Label } from 'components/Properties';
import mutateSettings from 'core/app/mutateSettings';
import getLabel from 'core/part/getLabel';
import { RenamePartsOptions } from 'core/part/rename';
import renameSelected from 'core/part/renameSelected';
import usePopupConcurrency from 'hooks/usePopupConcurrency';
import useTranslator from 'hooks/useTranslator';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { styled, theme } from 'stitches.config';
import useBlueprint from 'stores/blueprint';
import { PromptProps } from 'stores/prompts';
import useSettings from 'stores/settings';

const CheckboxWithLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space.gapRelatedRegular,
});

function CheckboxWithLabel({ children, ...props }: CheckboxProps) {
  return (
    <CheckboxWithLabelContainer>
      <Checkbox {...props} />
      <Label>{children}</Label>
    </CheckboxWithLabelContainer>
  );
}

export default function RenamePartsPrompt({ dismiss }: PromptProps) {
  const { t } = useTranslator();
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null);
  const { selections } = useBlueprint.getState();
  let defaultLabel = getLabel(selections[0]);

  if (selections.some((selection) => getLabel(selection) !== defaultLabel)) {
    defaultLabel = '';
  }

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
        defaultChecked={rename.trim}
        onCheckedChange={handleClick('trim')}
      >
        {t`tabs.layout.popup.rename.trim`}
      </CheckboxWithLabel>
      <CheckboxWithLabel
        defaultChecked={rename.skipLocked}
        onCheckedChange={handleClick('skipLocked')}
      >
        {t`tabs.layout.popup.rename.skip_locked`}
      </CheckboxWithLabel>
      <CheckboxWithLabel
        defaultChecked={rename.suffix}
        onCheckedChange={handleClick('suffix')}
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
