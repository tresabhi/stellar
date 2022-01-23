import * as RootBlueprint from 'core/modules/blueprint/types/root';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export default create<RootBlueprint.Type>(
  devtools(() => RootBlueprint.data, { name: 'blueprint' }),
);
