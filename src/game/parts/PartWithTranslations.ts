import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group } from 'three';
import { UUID } from 'types/Parts';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithTranslations extends VanillaPart {
  p: { x: number; y: number };
}

export interface PartWithTranslations
  extends Part,
    VanillaPartWithTranslations {}

export const VanillaPartWithTranslationsData: VanillaPartWithTranslations = {
  ...VanillaPartData,

  p: { x: 0, y: 0 },
};

export const PartWithTranslationsData: PartWithTranslations = {
  ...PartData,
  ...VanillaPartWithTranslationsData,

  label: 'Unlabeled Part With Translations',
};

export const usePartWithTranslations = (
  ID: UUID,
  groupRef: MutableRefObject<Group>,
) => {
  usePartProperty(
    ID,
    (part: PartWithTranslations) => part.p,
    (p) => groupRef.current.position.set(p.x, p.y, 0),
  );
};
