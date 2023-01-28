import { Part } from 'game/parts/Part';
import useBlueprint from 'stores/blueprint';

export default function usePart<Type extends Part>(id: string) {
  return useBlueprint((state) => state.parts[id]) as Type;
}
