import { useHelper } from '@react-three/drei';
import { getPartByAddress } from 'interfaces/blueprint';
import { PartWithMeta } from 'parts/Default';
import { useEffect } from 'react';
import blueprintStore from 'stores/blueprint';
import { BoxHelper, Group, Mesh } from 'three';
import { PartAddress } from 'types/Blueprint';
import { UseUndefinedRefObject } from './useUndefinedRef';

const usePartDecorations = (
  address: PartAddress,
  meshRef: UseUndefinedRefObject<Mesh | Group>,
) => {
  const outlineHelper = useHelper(
    meshRef,
    BoxHelper,
    // stellarContext.accentRegular,
    'red',
  );

  useEffect(() => {
    outlineHelper.current!.visible = false;

    blueprintStore.subscribe(
      (state) =>
        (getPartByAddress(address, state) as PartWithMeta).meta.selected,
      (current) => {
        outlineHelper.current!.visible = current;
      },
    );
  });
};

export default usePartDecorations;
