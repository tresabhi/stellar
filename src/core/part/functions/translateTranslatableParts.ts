import { mutateBlueprint } from 'core/blueprint';
import { Group } from 'game/parts/Group';
import { PartWithTranslations } from 'game/parts/PartWithTranslations';
import { AnyPart, UUID } from 'types/Parts';
import { getPart } from './getPart';

export const translateTranslatableParts = (
  x: number,
  y: number,
  IDs: UUID[],
) => {
  mutateBlueprint((draft) => {
    const translate = (selections: UUID[]) => {
      selections.forEach((selection) => {
        const part = getPart(selection, draft);

        if (part) {
          if (part.n === 'Group') {
            translate((part as Group).partOrder);
          } else if ((part as AnyPart).p) {
            (part as PartWithTranslations).p.x += x;
            (part as PartWithTranslations).p.y += y;
          }
        }
      });
    };

    translate(IDs);
  });
};
