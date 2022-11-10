import { Pencil1Icon } from '@radix-ui/react-icons';
import { CheckboxWithLabel } from 'components/CheckboxWithLabel';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Popup from 'components/Popup';
import { mutateSettings } from 'core/app';
import { popupClose } from 'core/interface';
import { RenamePartsOptions } from 'core/part/renameParts';
import { renamePartsBySelection } from 'core/part/renamePartsBySelection';
import { useTranslator } from 'hooks/useTranslator';
import { KeyboardEvent, useRef } from 'react';
import useSettings from 'stores/settings';

export const RenameParts = () => {
  const { t } = useTranslator();
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null);
  const apply = () => {
    input.current &&
      renamePartsBySelection(
        input.current.value,
        useSettings.getState().editor.rename,
      );
    popupClose();
  };
  const handleClick = (type: keyof RenamePartsOptions) => {
    return () => {
      mutateSettings((draft) => {
        draft.editor.rename[type] = !draft.editor.rename[type];
      });
    };
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      apply();
    } else if (event.key === 'Escape') {
      popupClose();
    }
  };
  const handleCancelClick = () => popupClose();
  const handleApplyClick = apply;

  return (
    <Popup.Container width="regular">
      <InputWithIcon
        ref={input}
        onKeyDown={handleKeyDown}
        autoFocus
        icon={<Pencil1Icon />}
        placeholder={t`tab.layout.popup.rename.input_placeholder`}
      />

      <Popup.Content>
        <CheckboxWithLabel
          defaultValue={rename.trim}
          onChange={handleClick('trim')}
        >
          {t`tab.layout.popup.rename.trim`}
        </CheckboxWithLabel>
        <CheckboxWithLabel
          defaultValue={rename.skipLocked}
          onChange={handleClick('skipLocked')}
        >
          {t`tab.layout.popup.rename.skip_locked`}
        </CheckboxWithLabel>
        <CheckboxWithLabel
          defaultValue={rename.suffix}
          onChange={handleClick('suffix')}
        >
          {t`tab.layout.popup.rename.suffix`}
        </CheckboxWithLabel>
      </Popup.Content>

      <Popup.ActionRow>
        <Popup.Button
          onClick={handleCancelClick}
        >{t`tab.layout.popup.rename.cancel`}</Popup.Button>
        <Popup.Button
          onClick={handleApplyClick}
          priority="callToAction"
          color="accent"
        >
          {t`tab.layout.popup.rename.apply`}
        </Popup.Button>
      </Popup.ActionRow>
    </Popup.Container>
  );
};
