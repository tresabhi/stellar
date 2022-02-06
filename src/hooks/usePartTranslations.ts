import { getPartByAddress } from 'interfaces/blueprint';
import { PartWithTranslations } from 'parts/Default';
import { RefObject, useLayoutEffect } from 'react';
import blueprintStore from 'stores/blueprint';
import { Euler, Group, Mesh } from 'three';
import { PartAddress } from 'types/Blueprint';

const usePartTranslations = (
  address: PartAddress,
  meshRef: RefObject<Mesh | Group | undefined>,
) => {
  useLayoutEffect(() => {
    blueprintStore.subscribe(
      (draft) => (getPartByAddress(address, draft) as PartWithTranslations).p.x,
      (current, previous) => {
        meshRef.current!.position.x += current - previous;
      },
    );
    blueprintStore.subscribe(
      (draft) => (getPartByAddress(address, draft) as PartWithTranslations).p.y,
      (current, previous) => {
        meshRef.current!.position.y += current - previous;
      },
    );
    blueprintStore.subscribe(
      (draft) => (getPartByAddress(address, draft) as PartWithTranslations).o.x,
      (current, previous) => {
        meshRef.current!.scale.x += current - previous;
      },
    );
    blueprintStore.subscribe(
      (draft) => (getPartByAddress(address, draft) as PartWithTranslations).o.y,
      (current, previous) => {
        meshRef.current!.scale.y += current - previous;
      },
    );
    blueprintStore.subscribe(
      (draft) => (getPartByAddress(address, draft) as PartWithTranslations).o.z,
      (current) => {
        meshRef.current!.setRotationFromEuler(new Euler(0, 0, current));
      },
    );
  });
};

export default usePartTranslations;
