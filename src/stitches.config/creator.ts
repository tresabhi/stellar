import { blackA, mauve, purple } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';
import { createColors, createSpaces } from 'bepaint';

const colorsLight = {
  ...createColors({ scale: mauve }),
  ...createColors({ scale: purple, suffix: 'accent' }),

  // TODO: rename componentBackground to componentInteractiveBackground for consistency

  componentSolidBackground: mauve.mauve9,
  componentSolidBackgroundHover: mauve.mauve10,
  componentSolidBackgroundActive: mauve.mauve11,
  componentSolidBackground_accent: purple.purple9,
  componentSolidBackgroundHover_accent: purple.purple10,
  componentSolidBackgroundActive_accent: purple.purple11,
};

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      ...colorsLight,

      popupBackground: blackA.blackA9,
    },

    fontSizes: {
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      32: '2rem',
    },

    sizes: {
      0.5: '0.03125rem',
      1: '0.0625rem',
      2: '0.125rem',
      4: '0.25rem',
      8: '0.5rem',
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.125rem',
      24: '1.5rem',
      32: '2rem',
      40: '2.5rem',

      dropdownWidth: '15rem',
      inputSizeMinor: '1rem',
      inputSizeMajor: '2rem',
      tabMaxWidth: '15rem',
      paletteMaxHeight: '15rem',
      popupWidth: '20rem',
      separatorWidth: '0.0625rem',
      createTabContentMaxWidth: '35rem',
      createTabContentMaxHeight: '25rem',
      sidebarWidth: '16rem',
      scrollbarWidth: '1rem',
      scrollbarThumbWidth: '0.125rem',
      scrollbarThumbWidthHover: '0.5rem',
      sliderThumb: '1rem',
      sliderTrackWidth: '0.125rem',
    },

    radii: {
      1: '0.0625rem',
      2: '0.125rem',
      4: '0.25rem',
      8: '0.5rem',
      16: '1rem',
    },

    fonts: {
      // TODO: add fallback fonts
      default: 'Roboto Flex',
      mono: 'Roboto Mono',
    },

    borderStyles: {
      componentNonInteractive: `${colorsLight.componentNonInteractiveBorder} solid 0.0625rem`,
      componentNonInteractiveHover: `${colorsLight.componentNonInteractiveBorderHover} solid 0.0625rem`,
      componentNonInteractiveActive: `${colorsLight.componentNonInteractiveBorderActive} solid 0.0625rem`,
      componentInteractive: `${colorsLight.componentInteractiveBorder} solid 0.0625rem`,
      componentInteractiveHover: `${colorsLight.componentInteractiveBorderHover} solid 0.0625rem`,
      componentInteractiveActive: `${colorsLight.componentInteractiveBorderActive} solid 0.0625rem`,

      componentNonInteractive_accent: `${colorsLight.componentNonInteractiveBorder_accent} solid 0.0625rem`,
      componentNonInteractiveHover_accent: `${colorsLight.componentNonInteractiveBorderHover_accent} solid 0.0625rem`,
      componentNonInteractiveActive_accent: `${colorsLight.componentNonInteractiveBorderActive_accent} solid 0.0625rem`,
      componentInteractive_accent: `${colorsLight.componentInteractiveBorder_accent} solid 0.0625rem`,
      componentInteractiveHover_accent: `${colorsLight.componentInteractiveBorderHover_accent} solid 0.0625rem`,
      componentInteractiveActive_accent: `${colorsLight.componentInteractiveBorderActive_accent} solid 0.0625rem`,
    },

    space: {
      ...createSpaces(),

      32: '2rem',
    },
  },
});
