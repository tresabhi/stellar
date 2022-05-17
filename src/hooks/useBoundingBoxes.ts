import { cloneDeep } from 'lodash';
import { UUID } from 'types/Parts';
import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PrimitiveBox2 {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export type UseBoundingBoxes = { [key: UUID]: PrimitiveBox2 };

export const UseBoundingBoxData: UseBoundingBoxes = {};

const useBoundingBoxes = create<
  UseBoundingBoxes,
  SetState<UseBoundingBoxes>,
  GetState<UseBoundingBoxes>,
  Mutate<StoreApi<UseBoundingBoxes>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => cloneDeep(UseBoundingBoxData)));
export default useBoundingBoxes;
