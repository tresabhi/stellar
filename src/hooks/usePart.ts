import useBlueprint from 'stores/blueprint';

const usePart = (id: string) => useBlueprint((state) => state.parts[id]);
export default usePart;
