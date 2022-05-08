import { mutateBlueprint } from 'functions/blueprint';
import { Blueprint } from 'game/Blueprint';
import { Part } from 'game/parts/Part';
import { UUID } from 'types/Parts';
import { getPart } from '../../part/functions/getPart';

export const mutateParts = <Type extends Part>(
  IDs: UUID[],
  mutator: (draft: Type) => void,
  state?: Blueprint,
) => {
  if (state) {
    IDs.forEach((ID) => {
      let part = getPart(ID, state) as Type | undefined;
      if (part) mutator(part);
    });
  } else {
    mutateBlueprint((draft) => {
      mutateParts(IDs, mutator, draft);
    });
  }
};
