import { Blueprint } from 'types/Blueprint';
import { BlueprintData } from 'interfaces/blueprint';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const blueprintStore = create<Blueprint>(
  devtools(() => BlueprintData, { name: 'blueprint' }),
);
export default blueprintStore;
