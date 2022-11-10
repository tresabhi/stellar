import useBlueprint from 'stores/blueprint';

const usePart = (id: string) => {
  return useBlueprint((state) => state.parts.get(id));
};
export default usePart;
