import { translateBoundingBox } from 'core/boundingBox';
import { getPart } from 'core/part';
import useApp from 'hooks/useApp';
import usePartProperty from 'hooks/usePartProperty';
import { MutableRefObject } from 'react';
import { Group } from 'three';
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
  id: string,
  group: MutableRefObject<Group>,
) => {
  const initialState = getPart<PartWithTranslations>(id);
  let lastX = initialState?.p.x!;
  let lastY = initialState?.p.y!;

  usePartProperty(
    id,
    (part: PartWithTranslations) => part.p,
    (p) => {
      group.current.position.set(p.x, p.y, 0);

      if (useApp.getState().canBoundingBoxesBeUpdated) {
        const deltaX = p.x - lastX;
        const deltaY = p.y - lastY;

        lastX = p.x;
        lastY = p.y;

        translateBoundingBox(id, deltaX, deltaY);
      }
    },
  );
};
