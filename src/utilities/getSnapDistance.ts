import {
  MOVE_STEP_MAJOR,
  MOVE_STEP_REGULAR,
} from 'components/LayoutCanvas/components/Outlines/components/TransformControls/components/TransformNode';

export interface EventWithModifiers {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export default function getSnapDistance(event: EventWithModifiers) {
  return event.shiftKey ? MOVE_STEP_MAJOR : MOVE_STEP_REGULAR;
}
