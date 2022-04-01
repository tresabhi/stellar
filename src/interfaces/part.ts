import FuelTank, { FuelTankPropertyComponent } from 'classes/Parts/FuelTank';
import Group from 'classes/Parts/Group';
import Part, { SavedPart, VanillaPart } from 'classes/Parts/Part';
import { FC } from 'react';
import { PropertyComponentProps } from 'types/Parts';

export const PartClasses = new Map<string, AnyPartClass>([
  ['Fuel Tank', FuelTank],
  ['Group', Group],
]);

export const PartPropertyComponents = new Map<
  string,
  FC<PropertyComponentProps>
>([['Fuel Tank', FuelTankPropertyComponent]]);

export interface AnyVanillaPart extends VanillaPart {
  [key: string]: any;
}

export interface AnySavedPart extends SavedPart {
  [key: string]: any;
}

export type AnyPart = Part<any>;
export type AnyPartClass = new () => AnyPart;

export const getPartClass = <
  Type extends Part<VanillaPart> = Part<VanillaPart>,
>(
  name: string,
) => PartClasses.get(name) as (new (ID?: string) => Type) | undefined;

export const getPropertyComponent = (name: string) =>
  PartPropertyComponents.get(name);
