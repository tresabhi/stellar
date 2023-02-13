import { blackA, mauve, purple, red } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';
import { createBorderStyles, createColors, createSpaces } from 'bepaint';

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
      ...createColors(mauve),
      ...createColors(purple, 'accent'),
      ...createColors(red, 'danger'),

      popupBackground: blackA.blackA9,
    },

    fontSizes: {
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      24: '1.5rem',
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
      64: '4rem',

      dropdownWidth: '15rem',
      inputSizeMinor: '1rem',
      inputSizeMajor: '2rem',
      tabMaxWidth: '15rem',
      paletteMaxHeight: '15rem',
      promptWidth: '18rem',
      promptPadding: '2rem',
      separatorWidth: '0.0625rem',
      createTabContentMaxWidth: '35rem',
      createTabContentMaxHeight: '25rem',
      sidebarWidth: '16rem',
      scrollbarWidth: '1rem',
      scrollbarThumbWidth: '0.125rem',
      scrollbarThumbWidthHover: '0.5rem',
      sliderThumb: '1rem',
      sliderTrackWidth: '0.125rem',
      errorScreenInfoMaxWidth: '30rem',
      errorScreenDebugInfoMaxWidth: '24rem',
      errorScreenDebugInfoMaxHeight: '16rem',
      sidebarCollapseButtonWidth: '1.5rem',
      sidebarCollapseButtonHeight: '2rem',
      propertiesTextAreaHeight: '10rem',
      toastWidth: '18rem',
      hintMaxWidth: '12rem',
      settingsMaxWidth: '40rem',
      settingsMaxHeight: '30rem',
      settingsNavigationWidth: '12rem',
      partListingInputMinWidth: '2rem',
    },

    radii: {
      1: '0.0625rem',
      2: '0.125rem',
      4: '0.25rem',
      8: '0.5rem',
      16: '1rem',
    },

    fonts: {
      default: 'Roboto Flex, Arial, Verdana',
      mono: 'Roboto Mono, Courier New',
    },

    borderStyles: {
      ...createBorderStyles(mauve),
      ...createBorderStyles(purple, undefined, 'accent'),
      ...createBorderStyles(red, undefined, 'danger'),
    },

    space: {
      ...createSpaces(),

      32: '2rem',
    },

    shadows: {
      regular: `0 0.125rem 0.25rem ${blackA.blackA10}`,
    },
  },
});
