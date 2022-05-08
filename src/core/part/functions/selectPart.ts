import { UUID } from 'types/Parts';
import { selectParts } from './selectParts';

export const selectPart = (ID: UUID) => selectParts([ID]);
