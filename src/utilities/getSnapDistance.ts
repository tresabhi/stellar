export const DEFAULT_SNAP = 0.2;
export const FINE_SNAP = 0.05;
export const MAJOR_SNAP = 2;

export interface EventWithModifiers {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export default function getSnapDistance(event: EventWithModifiers) {
  if (event.ctrlKey) return event.shiftKey ? 0 : FINE_SNAP;
  return event.shiftKey ? MAJOR_SNAP : DEFAULT_SNAP;
}
