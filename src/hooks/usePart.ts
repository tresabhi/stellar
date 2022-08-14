import useBlueprint from 'stores/useBlueprint';

const usePart = (id: string) => {
  return useBlueprint((state) => state.parts.get(id));
};
export default usePart;
