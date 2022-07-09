import { mauve, mauveDark, purple } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

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
      // Backgrounds
      mainAppBackground1: mauveDark.mauve1,
      mainAppBackground2: mauveDark.mauve2,
      stripedTableBackground1: mauveDark.mauve1,
      stripedTableBackground2: mauveDark.mauve2,
      codeBlockBackground1: mauveDark.mauve1,
      codeBlockBackground2: mauveDark.mauve2,
      cardBackground1: mauveDark.mauve1,
      cardBackground2: mauveDark.mauve2,
      sidebarBackground1: mauveDark.mauve1,
      sidebarBackground2: mauveDark.mauve2,
      canvasAreaBackground1: mauveDark.mauve1,
      canvasAreaBackground2: mauveDark.mauve2,
      mainAppBackgroundAccent1: purple.purple1,
      mainAppBackgroundAccent2: purple.purple2,
      stripedTableBackgroundAccent1: purple.purple1,
      stripedTableBackgroundAccent2: purple.purple2,
      codeBlockBackgroundAccent1: purple.purple1,
      codeBlockBackgroundAccent2: purple.purple2,
      cardBackgroundAccent1: purple.purple1,
      cardBackgroundAccent2: purple.purple2,
      sidebarBackgroundAccent1: purple.purple1,
      sidebarBackgroundAccent2: purple.purple2,
      canvasAreaBackgroundAccent1: purple.purple1,
      canvasAreaBackgroundAccent2: purple.purple2,

      // Component backgrounds
      componentBackground: mauveDark.mauve3,
      componentHoverBackground: mauveDark.mauve4,
      componentActiveBackground: mauveDark.mauve5,
      callToActionComponentBackground: mauveDark.mauve4,
      callToActionComponentHoverBackground: mauveDark.mauve5,
      callToActionComponentActiveBackground: mauveDark.mauve6,
      componentBackgroundAccent: purple.purple3,
      componentHoverBackgroundAccent: purple.purple4,
      componentActiveBackgroundAccent: purple.purple5,
      callToActionComponentBackgroundAccent: purple.purple4,
      callToActionComponentHoverBackgroundAccent: purple.purple5,
      callToActionComponentActiveBackgroundAccent: purple.purple6,

      // Borders
      noninteractiveComponentBorder: mauveDark.mauve6,
      interactiveComponentBorder: mauveDark.mauve5,
      interactiveComponentHoverBorder: mauveDark.mauve5,
      noninteractiveComponentBorderAccent: purple.purple6,
      interactiveComponentBorderAccent: purple.purple5,
      interactiveComponentHoverBorderAccent: purple.purple5,

      // Text
      lowContrastText: mauveDark.mauve11,
      highContrastText: mauveDark.mauve12,
      lowContrastTextAccent: purple.purple11,
      highContrastTextAccent: purple.purple12,
    },

    /**
     * All infinitely scalable scales use the
     * [Metric prefix system](https://en.wikipedia.org/wiki/Metric_prefix)
     */

    fontSizes: {
      nano: '0rem',
      micro: '0.125rem',
      milli: '0.5rem',
      centi: '0.75rem',
      deci: '0.875rem',
      base: '1rem',
      deca: '1.125rem',
      hecto: '1.25rem',
      kilo: '1.5rem',
      mega: '1.875rem',
      giga: '2rem',
    },

    sizes: {
      centi: '0.0625em',
      deci: '0.125em',
      base: '0.25em',
      deca: '0.5em',
      hecto: '1em',
      kilo: '2rem',
    },
  },
});

export const lightTheme = createTheme('theme-light', {
  colors: {
    // Backgrounds
    mainAppBackground1: mauve.mauve1,
    mainAppBackground2: mauve.mauve2,
    stripedTableBackground1: mauve.mauve1,
    stripedTableBackground2: mauve.mauve2,
    codeBlockBackground1: mauve.mauve1,
    codeBlockBackground2: mauve.mauve2,
    cardBackground1: mauve.mauve1,
    cardBackground2: mauve.mauve2,
    sidebarBackground1: mauve.mauve1,
    sidebarBackground2: mauve.mauve2,
    canvasAreaBackground1: mauve.mauve1,
    canvasAreaBackground2: mauve.mauve2,

    // Component backgrounds
    componentBackground: mauve.mauve3,
    componentHoverBackground: mauve.mauve4,
    componentActiveBackground: mauve.mauve5,
    callToActionComponentBackground: mauve.mauve4,
    callToActionComponentHoverBackground: mauve.mauve5,
    callToActionComponentActiveBackground: mauve.mauve6,

    // Borders
    noninteractiveComponentBorder: mauve.mauve6,
    interactiveComponentBorder: mauve.mauve5,
    interactiveComponentHoverBorder: mauve.mauve5,

    // Text
    lowContrastText: mauve.mauve11,
    highContrastText: mauve.mauve12,
  },
});
