import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Popup from 'components/Popup';
import { SearchItem } from 'components/Search';
import { dismissPopup } from 'core/interface/dismissPopup';
import { getParent, getPart, insertNewPart } from 'core/part';
import { usePopupConcurrency } from 'hooks/usePopupConcurrency';
import { useTranslator } from 'hooks/useTranslator';
import { FC, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import usePartRegistry from 'stores/partRegistry';
import { PopupProps } from 'stores/popups';

export const InsertPartPopup: FC<PopupProps> = ({ id }) => {
  const { t } = useTranslator();
  const input = useRef<HTMLInputElement>(null);
  const list: SearchItem[] = [];
  const partRegistry = usePartRegistry();
  const { selections } = useBlueprint.getState();
  const lastSelectionId = selections[selections.length - 1];
  const lastSelection = getPart(lastSelectionId);
  let parentId: string | null = null;
  let index: number | undefined;

  if (lastSelection) {
    if (lastSelection.n === 'Group') {
      parentId = lastSelectionId;
    } else {
      const parent = getParent(lastSelectionId);

      if (parent) {
        parentId = parent.id;
        index = parent.part_order.indexOf(lastSelectionId);
      }
    }
  }

  const handleEscape = () => dismissPopup(id);
  const handleCancelClick = () => dismissPopup(id);

  partRegistry.forEach(({ vanillaData, Icon, data: { label } }, name) => {
    const note = vanillaData === null
      ? t`tabs.layout.popup.insert_part.abstract`
      : undefined;

    const handleClick = () => {
      insertNewPart(name, parentId, {
        index,
        nearCamera: true,
        select: true,
      });
      dismissPopup(id);
    };

    list.push({
      string:
        vanillaData === null
          ? `${label} ${t`tabs.layout.popup.insert_part.abstract`}`
          : label,
      node: (
        <Popup.SearchItem
          key={`part-${name}`}
          icon={<Icon />}
          note={note}
          onClick={handleClick}
        >
          {label}
        </Popup.SearchItem>
      ),
      callback: handleClick,
    });
  });

  usePopupConcurrency();

  return (
    <Popup.Container>
      <InputWithIcon
        ref={input}
        icon={<MagnifyingGlassIcon />}
        placeholder={t`tabs.layout.popup.insert_part.input_placeholder`}
        autoFocus
      />

      <Popup.Search
        list={list}
        input={input}
        fallback={
          <Popup.SearchFallback>{t`tabs.layout.popup.insert_part.fallback`}</Popup.SearchFallback>
        }
        escape={handleEscape}
      />

      <Popup.Actions>
        <Popup.Action onClick={handleCancelClick}>
          {t`tabs.layout.popup.insert_part.cancel`}
        </Popup.Action>
      </Popup.Actions>
    </Popup.Container>
  );
};
