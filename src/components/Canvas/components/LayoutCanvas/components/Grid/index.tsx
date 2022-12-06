import { RefObject, useEffect, useRef } from 'react';
import { theme } from 'stitches.config';
import useBlueprint from 'stores/blueprint';
import useSettings, { themes } from 'stores/settings';
import { Color, GridHelper, Mesh } from 'three';
import { toThreeSafeHSL } from 'utilities/toThreeSafeHSL';
import { InfiniteGridHelper } from './components/InfiniteGridHelper';

const MINOR_MARK = 1 / 5;
const MAJOR_MARK = 1;

export const Grid = () => {
  const initialState = useBlueprint.getState();
  const grid = useRef<GridHelper>(null);
  const infiniteGrid = useRef<Mesh>(null);
  const currentTheme = useSettings((state) => state.interface.theme);
  const themeTokens = currentTheme ? themes.get(currentTheme) ?? theme : theme;
  const gridColor = new Color(
    toThreeSafeHSL(themeTokens.colors.textLowContrast_accent.value),
  );
  const subGridColor = new Color(
    toThreeSafeHSL(themeTokens.colors.textLowContrast.value),
  );

  useCenter(grid, infiniteGrid);

  return (
    <>
      <gridHelper
        ref={grid}
        position={[initialState.center, 0, 1]}
        args={[1e6, 2, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <InfiniteGridHelper
        ref={infiniteGrid}
        position={[initialState.center % MAJOR_MARK, 0, 0]}
        axes="xyz"
        size1={MINOR_MARK}
        size2={MAJOR_MARK}
        distance={1e3}
        color={subGridColor}
      />
    </>
  );
};

const useCenter = (
  grid: RefObject<GridHelper>,
  infiniteGrid: RefObject<Mesh>,
) => {
  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.center,
      (value) => {
        grid.current?.position.setX(value);
        infiniteGrid.current?.position.setX(value % MAJOR_MARK);
      },
    );

    return unsubscribe;
  }, []);
};

export * from './components/InfiniteGridHelper';
