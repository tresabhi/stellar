import { AnyPart } from 'types/Parts';
import create from 'zustand';

export type PartsEnumStore = Map<string, AnyPart>;

export const PartsEnumStoreData: PartsEnumStore = new Map();

const partsEnumStore = create<PartsEnumStore>(() => PartsEnumStoreData);
export default partsEnumStore;
