import { Part } from 'game/parts/Part';

export type ParentId = string | null;

export interface PartPropertyComponentProps {
  ids: string[];
}
export interface PartComponentProps {
  id: string;
}

export type PartMap = Map<string, Part>;
