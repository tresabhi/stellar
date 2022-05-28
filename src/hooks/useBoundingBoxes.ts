import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PrimitiveBox2 {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export type UseBoundingBoxes = {
  // has to be an object child because immer likes to BLOW UP MY MAP METHODS
  // NO IMMER NO WHY!?
  partBounds: Map<string, PrimitiveBox2>;
  selectionBound: PrimitiveBox2 | null;
};

export const UseBoundingBoxesDefaultData: UseBoundingBoxes = {
  partBounds: new Map(),
  selectionBound: null,
};

const useBoundingBoxes = create<
  UseBoundingBoxes,
  SetState<UseBoundingBoxes>,
  GetState<UseBoundingBoxes>,
  Mutate<StoreApi<UseBoundingBoxes>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseBoundingBoxesDefaultData));
export default useBoundingBoxes;
