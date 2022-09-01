import { useEffect, useRef } from 'react';
import { theme } from 'stitches.config';
import useBlueprint from 'stores/useBlueprint';
import useSettings, { themes } from 'stores/useSettings';
import { Color, GridHelper, Mesh } from 'three';
import { InfiniteGridHelper } from './components/InfiniteGridHelper';

const MINOR_MARK = 1 / 5;
const MAJOR_MARK = 1;
const numberPattern = /([0-9]|\.)+/g;

const toThreeSafeHSL = (color: string) =>
  new Color(
    `hsl(${color
      .match(numberPattern)!
      .map((numberString) => Number(numberString))
      .map((number, index) =>
        index === 0 ? Math.round(number) : `${Math.round(number)}%`,
      )
      .join(', ')})`,
  );

export const Grid = () => {
  const initialState = useBlueprint.getState();
  const infiniteGridRef = useRef<Mesh>(null);
  const gridRef = useRef<GridHelper>(null);
  const currentTheme = useSettings((state) => state.interface.theme);
  const themeTokens = currentTheme ? themes.get(currentTheme) ?? theme : theme;
  const gridColor = toThreeSafeHSL(
    themeTokens.colors.textLowContrast_accent.value,
  );
  const subGridColor = toThreeSafeHSL(themeTokens.colors.textLowContrast.value);

  useEffect(() => {
    const unsubscribe = useBlueprint.subscribe(
      (state) => state.center,
      (value) => {
        gridRef.current?.position.setX(value);
        infiniteGridRef.current?.position.setX(value % MAJOR_MARK);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <>
      <gridHelper
        ref={gridRef}
        position={[initialState.center, 0, 1]}
        args={[1e6, 2, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <InfiniteGridHelper
        ref={infiniteGridRef}
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

export * from './components/InfiniteGridHelper';
