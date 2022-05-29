import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PrimitiveBound {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export type UseBounds = {
  // has to be an object child because immer likes to BLOW UP MY MAP METHODS
  // NO IMMER NO WHY!?
  parts: Map<string, PrimitiveBound>;
  selection: PrimitiveBound | null;
};

export const UseBoundsDefaultData: UseBounds = {
  parts: new Map(),
  selection: null,
};

const useBounds = create<
  UseBounds,
  SetState<UseBounds>,
  GetState<UseBounds>,
  Mutate<StoreApi<UseBounds>, [['zustand/subscribeWithSelector', never]]>
>(subscribeWithSelector(() => UseBoundsDefaultData));
export default useBounds;
