import { UUID } from 'types/Parts';
import { disposeBoundingBoxes } from './disposeBoundingBoxes';

export const disposeBoundingBox = (ID: UUID) => disposeBoundingBoxes([ID]);
