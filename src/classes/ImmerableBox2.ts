import { immerable } from 'immer';
import { Box2 } from 'three';

export default class ImmerableBox2 extends Box2 {
  [immerable] = true;
}
