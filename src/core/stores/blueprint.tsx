import * as RootBlueprint from 'core/API/blueprint/types/root';
import create, { UseBoundStore } from 'zustand';

export type type = UseBoundStore<{ num: number }>;

export default create<{ num: number }>(() => ({ num: 1 }));
