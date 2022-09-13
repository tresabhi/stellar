import { Palette, PaletteItem } from 'components/Palette';
import { mutateApp } from 'core/app/mutateApp';
import { popupClose } from 'core/interface';
import { getParent, getPart, insertNewPart } from 'core/part';
import { useTranslator } from 'hooks/useTranslator';
import { useEffect } from 'react';
import useBlueprint from 'stores/useBlueprint';
import usePartRegistry from 'stores/usePartRegistry';

export const InsertPart = () => {
  const { t } = useTranslator();
  const partRegistry = usePartRegistry();
  const paletteItems: PaletteItem[] = [];
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

  partRegistry.forEach((registry, name) => {
    const Icon = registry.Icon;

    paletteItems.push({
      name,
      callback: () => {
        insertNewPart(name, parentId, {
          index,
          nearCamera: true,
          select: true,
        });
        popupClose();
      },
      note:
        registry.vanillaData === null
          ? t`tab.layout.popup.insert_part.abstract`
          : undefined,
      icon: <Icon />,
    });
  });

  useEffect(() => {
    mutateApp((draft) => {
      draft.interface.isInteracting = true;
    });

    return () =>
      mutateApp((draft) => {
        draft.interface.isInteracting = false;
      });
  }, []);

  return (
    <Palette
      gainFocus
      placeholder={t`tab.layout.popup.insert_part.search_placeholder`}
      items={paletteItems}
    />
  );
};