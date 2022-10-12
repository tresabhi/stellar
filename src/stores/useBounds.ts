import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * A box with rotation from the center
 */
export interface PartBounds {
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
}

export interface BoundListing {
  bounds: PartBounds;
  needsUpdate: boolean;
}

export type UseBounds = {
  deferUpdates: boolean;

  parts: Map<string, BoundListing>;
};

export const UseBoundsDefaultData: UseBounds = {
  deferUpdates: false,

  parts: new Map(),
};

const useBounds = create<UseBounds, [['zustand/subscribeWithSelector', never]]>(
  subscribeWithSelector(() => UseBoundsDefaultData),
);
export default useBounds;
