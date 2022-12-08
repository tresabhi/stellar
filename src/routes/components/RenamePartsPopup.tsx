import { Pencil1Icon } from '@radix-ui/react-icons';
import { CheckboxWithLabel } from 'components/CheckboxWithLabel';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Popup from 'components/Popup';
import { mutateSettings } from 'core/app';
import { dismissPopup } from 'core/interface/dismissPopup';
import { RenamePartsOptions } from 'core/part/renameParts';
import { renamePartsBySelection } from 'core/part/renamePartsBySelection';
import { usePopupConcurrency } from 'hooks/usePopupConcurrency';
import { useTranslator } from 'hooks/useTranslator';
import { FC, KeyboardEvent, useRef } from 'react';
import { PopupProps } from 'stores/popups';
import useSettings from 'stores/settings';

export const RenamePartsPopup: FC<PopupProps> = ({ id }) => {
  const { t } = useTranslator();
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null);
  const apply = () => {
    input.current &&
      renamePartsBySelection(
        input.current.value,
        useSettings.getState().editor.rename,
      );
    dismissPopup(id);
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
      dismissPopup(id);
    }
  };
  const handleCancelClick = () => dismissPopup(id);
  const handleApplyClick = apply;

  usePopupConcurrency();

  return (
    <Popup.Container>
      <InputWithIcon
        ref={input}
        onKeyDown={handleKeyDown}
        autoFocus
        icon={<Pencil1Icon />}
        placeholder={t`tabs.layout.popup.rename.input_placeholder`}
      />

      <Popup.Content>
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
      </Popup.Content>

      <Popup.Actions>
        <Popup.Action
          onClick={handleCancelClick}
        >{t`tabs.layout.popup.rename.cancel`}</Popup.Action>
        <Popup.Action
          onClick={handleApplyClick}
          priority="callToAction"
          color="accent"
        >
          {t`tabs.layout.popup.rename.apply`}
        </Popup.Action>
      </Popup.Actions>
    </Popup.Container>
  );
};
