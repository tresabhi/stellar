import { Pallet, PalletItem } from 'components/Pallet';
import { getParent, getPart, insertNewPart } from 'core/part';
import { popupClose } from 'core/ui';
import useBlueprint from 'stores/useBlueprint';
import usePartRegistry from 'stores/usePartRegistry';

export const AddPart = () => {
  const partRegistry = usePartRegistry();
  const palletItems: PalletItem[] = [];
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

    palletItems.push({
      name,
      callback: () => {
        insertNewPart(name, parentId, {
          index,
          nearCamera: true,
          select: true,
        });
        popupClose();
      },
      note: registry.vanillaData === null ? 'Abstract' : undefined,
      icon: <Icon />,
    });
  });

  return <Pallet items={palletItems} />;
};
