import { Blueprint } from 'core/types/Blueprint';
import { AnyPart } from 'core/types/Parts';
import { BlueprintData } from 'interfaces/blueprint';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const blueprintStore = create<Blueprint>(
  devtools(() => BlueprintData, { name: 'blueprint' }),
);
export default blueprintStore;

// TODO: SEPARATE ROOT PART AND ITS TYPES
export type ReferencesType = [string, AnyPart][];
