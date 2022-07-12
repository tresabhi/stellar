import { mauve, mauveDark, purple, purpleDark } from '@radix-ui/colors';
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
      mainAppBackgroundAccent1: purpleDark.purple1,
      mainAppBackgroundAccent2: purpleDark.purple2,
      stripedTableBackgroundAccent1: purpleDark.purple1,
      stripedTableBackgroundAccent2: purpleDark.purple2,
      codeBlockBackgroundAccent1: purpleDark.purple1,
      codeBlockBackgroundAccent2: purpleDark.purple2,
      cardBackgroundAccent1: purpleDark.purple1,
      cardBackgroundAccent2: purpleDark.purple2,
      sidebarBackgroundAccent1: purpleDark.purple1,
      sidebarBackgroundAccent2: purpleDark.purple2,
      canvasAreaBackgroundAccent1: purpleDark.purple1,
      canvasAreaBackgroundAccent2: purpleDark.purple2,

      // Component backgrounds
      componentBackground: mauveDark.mauve3,
      componentHoverBackground: mauveDark.mauve4,
      componentActiveBackground: mauveDark.mauve5,
      callToActionComponentBackground: mauveDark.mauve4,
      callToActionComponentHoverBackground: mauveDark.mauve5,
      callToActionComponentActiveBackground: mauveDark.mauve6,
      componentBackgroundAccent: purpleDark.purple3,
      componentHoverBackgroundAccent: purpleDark.purple4,
      componentActiveBackgroundAccent: purpleDark.purple5,
      callToActionComponentBackgroundAccent: purpleDark.purple4,
      callToActionComponentHoverBackgroundAccent: purpleDark.purple5,
      callToActionComponentActiveBackgroundAccent: purpleDark.purple6,

      // Borders
      noninteractiveComponentBorder: mauveDark.mauve6,
      interactiveComponentBorder: mauveDark.mauve7,
      interactiveComponentHoverBorder: mauveDark.mauve8,
      interactiveComponentActiveBorder: mauveDark.mauve8,
      noninteractiveComponentBorderAccent: purpleDark.purple6,
      interactiveComponentBorderAccent: purpleDark.purple7,
      interactiveComponentHoverBorderAccent: purpleDark.purple8,
      interactiveComponentHoverActiveAccent: purpleDark.purple8,

      // Text
      lowContrastText: mauveDark.mauve11,
      highContrastText: mauveDark.mauve12,
      lowContrastTextAccent: purpleDark.purple11,
      highContrastTextAccent: purpleDark.purple12,
    },

    fontSizes: {
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
    },

    sizes: {
      1: '0.0625rem',
      2: '0.125rem',
      4: '0.25rem',
      8: '0.5rem',
      16: '1rem',
      18: '1.125rem',
      24: '1.5rem',
      32: '2rem',
      40: '2.5rem',

      dropdownWidth: '15rem',
    },

    radii: {
      1: '0.0625rem',
      2: '0.125rem',
      4: '0.25rem',
      8: '0.5rem',
    },

    fonts: {
      // TODO: add fallback fonts
      base: 'Roboto Flex',
      mono: 'Roboto Mono',
    },

    borderStyles: {
      noninteractiveComponentBorder: `${mauveDark.mauve6} solid 0.0625rem`,
      interactiveComponentBorder: `${mauveDark.mauve7} solid 0.0625rem`,
      interactiveComponentHoverBorder: `${mauveDark.mauve8} solid 0.0625rem`,
      interactiveComponentActiveBorder: `${mauveDark.mauve8} solid 0.0625rem`,
      noninteractiveComponentBorderAccent: `${purpleDark.purple6} solid 0.0625rem`,
      interactiveComponentBorderAccent: `${purpleDark.purple7} solid 0.0625rem`,
      interactiveComponentHoverBorderAccent: `${purpleDark.purple8} solid 0.0625rem`,
      interactiveComponentActiveBorderAccent: `${purpleDark.purple8} solid 0.0625rem`,
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
    componentBackground: mauve.mauve3,
    componentHoverBackground: mauve.mauve4,
    componentActiveBackground: mauve.mauve5,
    callToActionComponentBackground: mauve.mauve4,
    callToActionComponentHoverBackground: mauve.mauve5,
    callToActionComponentActiveBackground: mauve.mauve6,
    componentBackgroundAccent: purple.purple3,
    componentHoverBackgroundAccent: purple.purple4,
    componentActiveBackgroundAccent: purple.purple5,
    callToActionComponentBackgroundAccent: purple.purple4,
    callToActionComponentHoverBackgroundAccent: purple.purple5,
    callToActionComponentActiveBackgroundAccent: purple.purple6,

    // Borders
    noninteractiveComponentBorder: mauve.mauve6,
    interactiveComponentBorder: mauve.mauve7,
    interactiveComponentHoverBorder: mauve.mauve8,
    interactiveComponentActiveBorder: mauve.mauve8,
    noninteractiveComponentBorderAccent: purple.purple6,
    interactiveComponentBorderAccent: purple.purple7,
    interactiveComponentHoverBorderAccent: purple.purple8,
    interactiveComponentHoverActiveAccent: purple.purple8,

    // Text
    lowContrastText: mauve.mauve11,
    highContrastText: mauve.mauve12,
    lowContrastTextAccent: purple.purple11,
    highContrastTextAccent: purple.purple12,
  },

  borderStyles: {
    noninteractiveComponentBorder: `${mauve.mauve6} solid 0.0625rem`,
    interactiveComponentBorder: `${mauve.mauve7} solid 0.0625rem`,
    interactiveComponentHoverBorder: `${mauve.mauve8} solid 0.0625rem`,
    interactiveComponentActiveBorder: `${mauve.mauve8} solid 0.0625rem`,
    noninteractiveComponentBorderAccent: `${purple.purple6} solid 0.0625rem`,
    interactiveComponentBorderAccent: `${purple.purple7} solid 0.0625rem`,
    interactiveComponentHoverBorderAccent: `${purple.purple8} solid 0.0625rem`,
    interactiveComponentActiveBorderAccent: `${purple.purple8} solid 0.0625rem`,
  },
});

export const globalStyles = globalCss({
  '@import': [
    'https://fonts.googleapis.com/css?family=Roboto+Flex&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap',
  ],
});
