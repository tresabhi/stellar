import { Blueprint } from 'game/Blueprint';
import ungroupGroups from './ungroupGroups';

export default function ungroupGroup(id: string, blueprint?: Blueprint) {
  ungroupGroups([id], blueprint);
}
