import shapeAndTextures1 from 'assets/blueprints/shape-and-textures-1.json';
import { VanillaBlueprint } from 'game/Blueprint';
import loadBlueprint from './loadBlueprint';

// What the hell does this do???!
// TODO: review this file

export const templateBlueprints: { [key: string]: VanillaBlueprint } = {
  shapeAndTextures1: shapeAndTextures1 as VanillaBlueprint,
};

export default function loadBlueprintTemplate(name?: string) {
  const blueprint = name ? templateBlueprints[name] : undefined;

  if (blueprint) loadBlueprint(blueprint);
}
