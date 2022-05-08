import { cloneDeep } from 'lodash';
import { UUID } from 'types/Parts';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PrimitiveBoundingBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export type UseBoundingBoxesCache = Map<UUID, PrimitiveBoundingBox>;

export const UseBoundingBoxStoreData: UseBoundingBoxesCache = new Map();

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
