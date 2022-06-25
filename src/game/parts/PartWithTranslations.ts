import { declareBoundNeedsUpdate, deferBoundUpdates } from 'core/bounds';
import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group } from 'three';
import { Part, PartData, VanillaPart, VanillaPartData } from './Part';

export interface VanillaPartWithTranslations extends VanillaPart {
  /**
   * Position of the part in `x` and `y` axis
   */
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
  id: string,
  group: MutableRefObject<Group>,
) => {
  usePartProperty(
    id,
    (part: PartWithTranslations) => part.p,
    (p) => {
      group.current.position.set(p.x, p.y, 0);
      declareBoundNeedsUpdate(id);
      deferBoundUpdates();
    },
  );
};
