import {
  Stage,
  VanillaStage,
  stageData,
  vanillaStageData,
} from 'game/Blueprint';

const vanillaStageKeys = Object.keys(vanillaStageData);
export const stageMetadataKeys = (
  Object.keys(stageData) as (keyof Stage)[]
).filter((key) => !vanillaStageKeys.includes(key));

export default function exportifyStage(stage: Stage) {
  const clonedStage = { ...stage };

  stageMetadataKeys.forEach((key) => {
    delete clonedStage[key];
  });

  return clonedStage as VanillaStage;
}
