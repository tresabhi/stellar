import ImmerableBox2 from 'classes/ImmerableBox2';
import { cloneDeep } from 'lodash';
import { UUID } from 'types/Parts';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type UseBoundingBoxesCache = { [key: UUID]: ImmerableBox2 };

export const UseBoundingBoxStoreData: UseBoundingBoxesCache = {};

const useBoundingBoxes = create<
  UseBoundingBoxesCache,
  SetState<UseBoundingBoxesCache>,
  GetState<UseBoundingBoxesCache>,
  Mutate<
    StoreApi<UseBoundingBoxesCache>,
    [['zustand/subscribeWithSelector', never]]
  >
>(subscribeWithSelector(() => cloneDeep(UseBoundingBoxStoreData)));
export default useBoundingBoxes;
