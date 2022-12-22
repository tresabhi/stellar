export const DEFAULT_SNAP = 0.2;
export const FINE_SNAP = 0.05;
export const MAJOR_SNAP = 2;

export interface EventWithModifiers {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export const getSnapDistance = (event: EventWithModifiers) => (event.ctrlKey
  ? event.shiftKey
    ? 0
    : FINE_SNAP
  : event.shiftKey
    ? MAJOR_SNAP
    : DEFAULT_SNAP);
