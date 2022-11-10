import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { InputWithIcon } from 'components/InputWithIcon';
import * as Popup from 'components/Popup';
import { SearchItem } from 'components/Search';
import { popupClose } from 'core/interface';
import { getParent, getPart, insertNewPart } from 'core/part';
import { useTranslator } from 'hooks/useTranslator';
import { useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import usePartRegistry from 'stores/partRegistry';

export const InsertPart = () => {
  const { t } = useTranslator();
  const input = useRef<HTMLInputElement>(null);
  const list: SearchItem[] = [];
  const partRegistry = usePartRegistry();
  const { selections } = useBlueprint.getState();
  const lastSelectionId = selections[selections.length - 1];
  const lastSelection = getPart(lastSelectionId);
  let parentId: string | null = null;
  let index: number | undefined = undefined;

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

  const handleEscape = popupClose;
  const handleCancelClick = popupClose;

  partRegistry.forEach(({ vanillaData, Icon, data: { label } }, name) => {
    const note =
      vanillaData === null
        ? t`tab.layout.popup.insert_part.abstract`
        : undefined;

    const handleClick = () => {
      insertNewPart(name, parentId, {
        index,
        nearCamera: true,
        select: true,
      });
      popupClose();
    };

    list.push({
      string:
        vanillaData === null
          ? `${label} ${t`tab.layout.popup.insert_part.abstract`}`
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

  return (
    <Popup.Container width="regular">
      <InputWithIcon
        ref={input}
        icon={<MagnifyingGlassIcon />}
        placeholder={t`tab.layout.popup.insert_part.input_placeholder`}
        autoFocus
      />

      <Popup.Search
        list={list}
        input={input}
        fallback={
          <Popup.SearchFallback>{t`tab.layout.popup.insert_part.fallback`}</Popup.SearchFallback>
        }
        escape={handleEscape}
      />

      <Popup.ActionRow>
        <Popup.Button
          onClick={handleCancelClick}
        >{t`tab.layout.popup.insert_part.cancel`}</Popup.Button>
      </Popup.ActionRow>
    </Popup.Container>
  );
};
