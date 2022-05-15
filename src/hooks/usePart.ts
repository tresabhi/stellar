import useBlueprint from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';
import { getPart } from '../core/part/functions/getPart';

const usePart = (ID: UUID) => {
  return useBlueprint((state) => getPart(ID, state));
};
export default usePart;
