import { Part, VanillaPart } from 'game/parts/Part';

export type ParentId = string | null;

export interface PartPropertyComponentProps {
  ids: string[];
}
export interface PartComponentProps {
  id: string;
}

export interface AnyVanillaPart extends VanillaPart {
  [key: string]: any;
}

export interface AnyPart extends AnyVanillaPart, Part {}

export type AnyPartMap = Map<string, AnyPart>;
