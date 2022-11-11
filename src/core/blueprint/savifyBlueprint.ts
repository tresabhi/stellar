import { Blueprint } from 'game/Blueprint';
import { cloneDeep } from 'lodash';

export const savifyBlueprint = (blueprint: Blueprint) => cloneDeep(blueprint);
