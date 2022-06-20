import create, { GetState, Mutate, SetState, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface PrimitiveBounds {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

export interface BoundListing {
  bounds: PrimitiveBounds;
  needsUpdate: boolean;
}

export type UseBounds = {
  deferBoundUpdates: boolean;

  parts: Map<string, BoundListing>;
  selection: PrimitiveBounds | null;
};

export const UseBoundsDefaultData: UseBounds = {
  deferBoundUpdates: false,

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
