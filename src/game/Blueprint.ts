import { Part, VanillaPart } from './parts/Part';

export interface VanillaStage {
  partIndexes: number[];
}
export interface Stage extends VanillaStage {
  label?: string;
}

export const vanillaStageData: VanillaStage = { partIndexes: [] };
export const stageData: Stage = { ...vanillaStageData, label: undefined };

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: VanillaPart[];
  stages: VanillaStage[];
}

export interface Blueprint extends Omit<VanillaBlueprint, 'parts'> {
  readonly format_version: number;

  selections: string[];
  parts: Record<string, Part>;
  part_order: string[];
  stages: Stage[];
}

export const vanillaBlueprintData: VanillaBlueprint = {
  center: 0,
  offset: { x: 0, y: 0 },
  parts: [],
  stages: [],
};

export const blueprintData: Blueprint = {
  ...vanillaBlueprintData,

  format_version: 7,

  selections: [],
  parts: {},
  part_order: [],
};
