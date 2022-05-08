import { cloneDeep } from 'lodash';
import { UUID } from 'types/Parts';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface BoundingBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export type BoundingBoxesCacheStore = Map<UUID, BoundingBox>;

export const boundingBoxStoreData: BoundingBoxesCacheStore = new Map();

const boundingBoxesCacheStore = create<
  BoundingBoxesCacheStore,
  SetState<BoundingBoxesCacheStore>,
  GetState<BoundingBoxesCacheStore>,
  Mutate<
    StoreApi<BoundingBoxesCacheStore>,
    [['zustand/subscribeWithSelector', never]]
  >
>(subscribeWithSelector(() => cloneDeep(boundingBoxStoreData)));
export default boundingBoxesCacheStore;
