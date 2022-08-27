import { Pencil1Icon } from '@radix-ui/react-icons';
import { IconInput } from 'components/IconInput';
import { LabeledCheckbox } from 'components/LabeledCheckbox';
import * as Popup from 'components/Popup';
import { mutateSettings } from 'core/app';
import { popupClose } from 'core/interface';
import { RenamePartsOptions } from 'core/part/renameParts';
import { renamePartsBySelection } from 'core/part/renamePartsBySelection';
import { KeyboardEvent, useRef } from 'react';
import useSettings from 'stores/useSettings';

export const RenameParts = () => {
  const { rename } = useSettings.getState().editor;
  const input = useRef<HTMLInputElement>(null!);
  const apply = () => {
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
      <IconInput
        ref={input}
        onKeyDown={handleKeyDown}
        autoFocus
        icon={<Pencil1Icon />}
        placeholder="Label"
      />

      <Popup.Content>
        <LabeledCheckbox
          defaultValue={rename.trim}
          onChange={handleClick('trim')}
        >
          Trim whitespace on ends
        </LabeledCheckbox>
        <LabeledCheckbox
          defaultValue={rename.skipLocked}
          onChange={handleClick('skipLocked')}
        >
          Skip locked parts
        </LabeledCheckbox>
        <LabeledCheckbox
          defaultValue={rename.suffix}
          onChange={handleClick('suffix')}
        >
          Add unique numerical suffixes
        </LabeledCheckbox>
      </Popup.Content>

      <Popup.ActionRow>
        <Popup.Button onClick={handleCancelClick}>Cancel</Popup.Button>
        <Popup.Button
          onClick={handleApplyClick}
          priority="callToAction"
          color="accent"
        >
          Apply
        </Popup.Button>
      </Popup.ActionRow>
    </Popup.Container>
  );
};
