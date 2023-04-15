import useBlueprint from 'stores/blueprint';

// TODO: assess if this is useless after completion of stages
export default function getStageLabel(stage: number) {
  const { stages } = useBlueprint.getState();

  return stages[stage].label ?? 'Stage';
}
