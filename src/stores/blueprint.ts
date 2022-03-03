import { Blueprint } from 'types/Blueprint';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface BlueprintStoreState extends Blueprint {}

const blueprintStore = create<
  BlueprintStoreState,
  SetState<BlueprintStoreState>,
  GetState<BlueprintStoreState>,
  Mutate<
    StoreApi<BlueprintStoreState>,
    [['zustand/subscribeWithSelector', never]]
  >
>(
  subscribeWithSelector<Blueprint>(() => ({
    meta: {
      format_version: 1,
    },
    selections: {
      current: [],
    },
    center: 0,
    offset: { x: 0, y: 0 },
    parts: new Map(),
    partOrder: [],
    stages: [],
  })),
);
export default blueprintStore;
