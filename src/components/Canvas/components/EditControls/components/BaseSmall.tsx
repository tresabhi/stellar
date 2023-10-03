import { Vector2 } from 'three';
import { EditControlsProps } from '..';

export interface BaseSmallEditDetail {
  width: number;
  height: number;
}

export const ORIGIN = new Vector2();

export default function BaseSmallControls({ id }: EditControlsProps) {
  return null;
}
