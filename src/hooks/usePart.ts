import useBlueprint from 'hooks/useBlueprint';
import { getPart } from '../core/part/functions/getPart';

const usePart = (id: string) => {
  return useBlueprint((state) => getPart(id, state));
};
export default usePart;
