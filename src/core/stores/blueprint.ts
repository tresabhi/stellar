import * as RootBlueprint from 'core/API/blueprint/types/root';
import create, { UseBoundStore } from 'zustand';

export type type = UseBoundStore<RootBlueprint.type>;

export default create<RootBlueprint.type>(() => RootBlueprint.data);
