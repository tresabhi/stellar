import FuelTank, { VanillaFuelTank } from 'classes/Parts/FuelTank';
import Group, { SavedGroup } from 'classes/Parts/Group';

export type UUID = string;

export type AnyPart = FuelTank | Group;
export type AnyPartClass = typeof FuelTank | typeof Group;
export type AnySavedPart = VanillaFuelTank | SavedGroup;
export type AnyVanillaPart = VanillaFuelTank;
export type AnyPartName = 'Fuel Tank' | 'Group';

export interface PropertyComponentProps {
  IDs: UUID[];
}
export interface ReactivePartComponentProps {
  ID: UUID;
}
