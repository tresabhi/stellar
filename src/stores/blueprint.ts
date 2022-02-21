import { Blueprint } from 'types/Blueprint';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const blueprintStore = create<
  Blueprint,
  SetState<Blueprint>,
  GetState<Blueprint>,
  Mutate<StoreApi<Blueprint>, [['zustand/subscribeWithSelector', never]]>
>(
  subscribeWithSelector(
    () =>
      ({
        // can't use `import` here because it's run before initialization
        meta: {
          format_version: 1,
        },

        center: 0,
        offset: { x: 0, y: 0 },
        parts: new Map(),
        stages: [],
      } as Blueprint),
  ),
);
export default blueprintStore;
