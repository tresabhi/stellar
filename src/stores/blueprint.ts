import { Blueprint } from 'types/Blueprint';
import create, { GetState, SetState } from 'zustand';
import {
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware';

const blueprintStore = create<
  Blueprint,
  SetState<Blueprint>,
  GetState<Blueprint>,
  StoreApiWithSubscribeWithSelector<Blueprint>
>(
  subscribeWithSelector(
    () =>
      ({
        // can't use `import` here because it's run before intialization
        meta: {
          format_version: 1,
        },

        center: 0,
        offset: { x: 0, y: 0 },
        parts: [],
        stages: [],
      } as Blueprint),
  ),
);
export default blueprintStore;
