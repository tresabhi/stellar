import { useRef } from 'react';
import { theme } from 'stitches.config';
import useSettings, { THEMES } from 'stores/settings';
import { Color, GridHelper, Mesh } from 'three';
import toThreeSafeHSL from 'utilities/toThreeSafeHSL';
import InfiniteGridHelper from './components/InfiniteGridHelper';

const MINOR_MARK = 1 / 5;
const MAJOR_MARK = 1;

export default function Grid() {
  const grid = useRef<GridHelper>(null);
  const infiniteGrid = useRef<Mesh>(null);
  const currentTheme = useSettings((state) => state.interface.theme);
  const themeTokens = currentTheme ? THEMES[currentTheme] ?? theme : theme;
  const gridColor = new Color(
    toThreeSafeHSL(themeTokens.colors.textLowContrast_accent.value),
  );
  const subGridColor = new Color(
    toThreeSafeHSL(themeTokens.colors.textLowContrast.value),
  );

  return (
    <>
      <gridHelper
        ref={grid}
        position={[0, 0, 1]}
        args={[1e6, 2, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <InfiniteGridHelper
        ref={infiniteGrid}
        position={[0, 0, 0]}
        axes="xyz"
        size1={MINOR_MARK}
        size2={MAJOR_MARK}
        distance={1e3}
        color={subGridColor}
      />
    </>
  );
}
