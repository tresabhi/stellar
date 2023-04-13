import { Stage, VanillaStage, stageData } from 'game/Blueprint';

export default function importifyStage(vanillaStage: VanillaStage) {
  return { ...stageData, ...vanillaStage } as Stage;
}
