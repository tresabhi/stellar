import { Part, VanillaPart } from 'game/parts/Part';

export type UUID = string;

export interface PartPropertyComponentProps {
  IDs: UUID[];
}
export interface PartComponentProps {
  ID: UUID;
}

export interface AnyVanillaPart extends VanillaPart {
  [key: string]: any;
}

export interface AnyPart extends AnyVanillaPart, Part {}

export type AnyPartMap = Map<string, AnyPart>;
