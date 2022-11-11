import useBlueprint from 'stores/blueprint';

const usePart = (id: string) => {
  return useBlueprint((state) => state.parts[id]);
};
export default usePart;
