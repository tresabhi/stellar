import { Part, VanillaPart } from './parts/Part';

export interface VanillaStage {
  partIndexes: number[];
  stageId: number;
}
export interface Stage {
  label?: string;
  part_order: string[];
}

export const vanillaStageData: VanillaStage = { stageId: -1, partIndexes: [] };
export const stageData: Stage = { label: undefined, part_order: [] };

export interface VanillaBlueprint {
  center: number;
  offset: { x: number; y: number };
  parts: VanillaPart[];
  stages: VanillaStage[];
}

export interface Blueprint extends Omit<VanillaBlueprint, 'parts' | 'stages'> {
  readonly format_version: number;

  parts: Record<string, Part>;
  part_order: string[];
  part_selections: string[];

  stages: Stage[];
  stage_selection: number | null;
}

export const vanillaBlueprintData: VanillaBlueprint = {
  center: 0,
  offset: { x: 0, y: 0 },
  parts: [],
  stages: [],
};

export const blueprintData: Blueprint = {
  ...vanillaBlueprintData,

  format_version: 8,

  parts: {},
  part_order: [],
  part_selections: [],

  stages: [],
  stage_selection: null,
};
