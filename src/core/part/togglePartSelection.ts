import { Blueprint } from 'game/Blueprint';
import togglePartsSelection from './togglePartsSelection';

export default function togglePartSelection(id: string, blueprint?: Blueprint) {
  togglePartsSelection([id], blueprint);
}
