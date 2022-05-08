import { UUID } from 'types/Parts';
import { unselectParts } from './unselectParts';

export const unselectPart = (ID: UUID) => unselectParts([ID]);
