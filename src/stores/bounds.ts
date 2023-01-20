/**
 * A box with rotation from the center
 */
export interface Bounds {
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
}

export interface BoundListing {
  bounds: Bounds;
  needsRecomputation: boolean;
}

export type BoundsStore = Record<string, BoundListing>;

const boundsStore: BoundsStore = {};
export default boundsStore;
