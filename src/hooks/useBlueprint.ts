import { Blueprint, BlueprintData } from 'game/Blueprint';
import { cloneDeep } from 'lodash';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useBlueprint = create<
  Blueprint,
  SetState<Blueprint>,
  GetState<Blueprint>,
  Mutate<StoreApi<Blueprint>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => cloneDeep(BlueprintData)));
export default useBlueprint;
