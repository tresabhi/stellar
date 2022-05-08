import saturnV from 'assets/blueprints/saturn-v.json';
import shapeAndTextures1 from 'assets/blueprints/shape-and-textures-1.json';
import testFuelTank from 'assets/blueprints/test-fuel-tank.json';
import { VanillaBlueprint } from 'game/Blueprint';

export const templateBlueprints: { [key: string]: VanillaBlueprint } = {
  testFuelTank,
  saturnV,
  shapeAndTextures1,
};
