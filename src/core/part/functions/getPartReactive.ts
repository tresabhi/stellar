import blueprintStore from 'hooks/useBlueprint';
import { UUID } from 'types/Parts';
import { getPart } from './getPart';

export const getPartReactive = (ID: UUID) => {
  return blueprintStore((state) => getPart(ID, state));
};
