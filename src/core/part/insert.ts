import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import { Group } from 'game/parts/Group';
import { Part } from 'game/parts/Part';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import useApp from 'stores/app';
import { ParentId } from 'types/Parts';
import create from './create';
import getPart from './getPart';
import selectConcurrent from './selectConcurrent';

export interface InsertPartOptions {
  index: number;
  nearCamera: boolean;
  select: boolean;
}
export const insertPartDefaultOptions: InsertPartOptions = {
  index: 0,
  nearCamera: true,
  select: false,
};

export default function insert(
  name: string,
  parentId?: ParentId,
  options: Partial<InsertPartOptions> = insertPartDefaultOptions,
) {
  const mergedOptions: InsertPartOptions = {
    ...insertPartDefaultOptions,
    ...options,
  };

  mutateBlueprint((draft) => {
    const newPart = create(name);
    const { camera } = useApp.getState().editor;

    if (newPart) {
      if (camera && (newPart as Part & PartWithPosition).p) {
        (newPart as Part & PartWithPosition).p.x = Math.round(
          camera.position.x,
        );
        (newPart as Part & PartWithPosition).p.y = Math.round(
          camera.position.y,
        );
      }

      if (parentId) {
        const parentPart = getPart<Group>(parentId);

        if (parentPart) {
          parentPart.part_order.splice(mergedOptions.index, 0, newPart.id);
          draft.parts[newPart.id] = newPart;
        }
      } else {
        draft.part_order.splice(mergedOptions.index, 0, newPart.id);
        draft.parts[newPart.id] = newPart;
      }

      selectConcurrent(newPart.id, draft);
    }
  });
}
