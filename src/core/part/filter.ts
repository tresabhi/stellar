import { Part } from 'game/parts/Part';
import getPart from './getPart';

export default function filter(
  ids: string[],
  test: (part: Part) => boolean,
) {
  return ids.filter((id) => test(getPart(id)));
}
