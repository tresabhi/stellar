import { Blueprint } from 'types/Blueprint';
import { undoMiddleware, UndoState } from 'zundo';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface BlueprintStoreState extends UndoState, Blueprint {}

const blueprintStore = create<
  BlueprintStoreState,
  SetState<BlueprintStoreState>,
  GetState<BlueprintStoreState>,
  Mutate<
    StoreApi<BlueprintStoreState>,
    [['zustand/subscribeWithSelector', never]]
  >
>(
  subscribeWithSelector<BlueprintStoreState>(
    undoMiddleware<BlueprintStoreState>(() => ({
      meta: {
        format_version: 1,
      },

      center: 0,
      offset: { x: 0, y: 0 },

      parts: new Map(),
      stages: [],
    })),
  ),
);
export default blueprintStore;
