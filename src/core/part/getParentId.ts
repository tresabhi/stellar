import useBlueprint from 'stores/useBlueprint';

export const getParentId = (
  childId: string,
  state = useBlueprint.getState(),
) => {
  return state.parts.get(childId)?.parentId;
};
