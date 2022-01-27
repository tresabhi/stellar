import * as RootBlueprint from 'interfaces/blueprint/root';
import * as RootPart from 'parts/Root';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const blueprintStore = create<RootBlueprint.Type>(
  devtools(() => RootBlueprint.data, { name: 'blueprint' }),
);
export default blueprintStore;

// TODO: SEPARATE ROOT PART AND ITS TYPES
export type ReferencesType = [string, RootPart.AnyPartType][];
