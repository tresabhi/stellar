import * as RootBlueprint from 'core/API/blueprint/types/root';
import create from 'zustand';

export default create<RootBlueprint.Type>(() => RootBlueprint.data);
