import Blueprint from 'classes/Blueprint';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const blueprintStore = create<
  Blueprint,
  SetState<Blueprint>,
  GetState<Blueprint>,
  Mutate<StoreApi<Blueprint>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => new Blueprint()));
export default blueprintStore;
